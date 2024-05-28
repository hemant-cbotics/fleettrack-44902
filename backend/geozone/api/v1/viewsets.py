from rest_framework import viewsets
from geozone.models import Geozone
from geozone.api.v1.serializers import GeozoneSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from generics.utils import CustomPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter


class GeozoneViewSet(viewsets.ModelViewSet):
    serializer_class = GeozoneSerializer
    queryset = Geozone.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = CustomPagination
    filter_backends = [ SearchFilter, OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['zone_id', 'is_active']
    search_fields = ['id', 'zone_id', 'created_by__name', 'created_by__email']
    ordering_fields = ['zone_id', 'is_active', 'geocode', 'zone_color']
    ordering = ['zone_id', 'is_active', 'geocode', 'zone_color']

    def get_queryset(self):
        organization_id = self.request.GET.get('organization_id')
        return self.queryset.filter(organization=organization_id)
    
    def perform_create(self, serializer):
        instance = serializer.save(created_by=self.request.user)
        if 'group_ids' in self.request.data:
            from group.models import Group
            # remove vehicle from all groups
            try:
                group_ids = self.request.data.get('group_ids', "").replace(' ', '')
                group_id_arr = group_ids.split(',')
                for group_id in group_id_arr:
                    group = Group.objects.get(id=group_id)
                    instance.groups.add(group.id)
            except Exception as e:
                pass

    def perform_update(self, serializer):
        instance = serializer.save(created_by=self.request.user)
        if 'group_ids' in self.request.data:
            instance.groups.clear()
            from group.models import Group
            # remove vehicle from all groups
            try:
                group_ids = self.request.data.get('group_ids', "").replace(' ', '')
                group_id_arr = group_ids.split(',')
                for group_id in group_id_arr:
                    group = Group.objects.get(id=group_id)
                    instance.groups.add(group.id)
            except Exception as e:
                pass

    def perform_destroy(self, instance):
        instance.delete()
