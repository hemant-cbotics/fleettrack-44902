from rest_framework import viewsets
from group.models import Group
from group.api.v1.serializers import GroupSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from generics.utils import CustomPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from generics.custom_permissions import IsPassedOrganizationPermission
from vehicle.models import Vehicle  

class GroupViewset(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = CustomPagination
    filter_backends = [ SearchFilter, OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['name', 'id', 'is_active']
    search_fields = ['name', 'description', 'created_by__name', 'created_by__email', 'id']
    ordering_fields = ['name']
    ordering = ['-created_at']

    def get_queryset(self):
        organization_id = self.request.GET.get('organization_id')
        return self.queryset.filter(organization=organization_id)
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        if 'vehicle_ids' in self.request.data:
            vehicle_ids = self.request.data.get('vehicle_ids')
            instance = self.get_object()
            instance.vehicles.clear()
            try:
                v_id_arr = vehicle_ids.split(',')
                for id in v_id_arr:
                    id = id.replace(' ', '')
                    try:
                        vehicle = Vehicle.objects.get(id=id)
                        instance.vehicles.add(vehicle)
                    except Vehicle.DoesNotExist:
                        print('Vehicle not found')
                        pass
            except Exception as e:
                print(str(e))
        serializer.save(created_by=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
