from rest_framework import viewsets
from fleet_tag.models import FleetTag
from fleet_tag.api.v1.serializers import FleetTagSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from generics.utils import CustomPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class FleetTagViewset(viewsets.ModelViewSet):
    serializer_class = FleetTagSerializer
    queryset = FleetTag.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = CustomPagination
    filter_backends = [ SearchFilter, OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['fleet_tag_id', 'fleet_tag_name', 'is_active']
    search_fields = ['fleet_tag_id', 'fleet_tag_name','id']
    ordering_fields = ['fleet_tag_name']
    ordering = ['-created_at']

    # def get_queryset(self):
    #     organization_id = self.request.GET.get('organization_id')
    #     return self.queryset.filter(organization=organization_id)
    
    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()
