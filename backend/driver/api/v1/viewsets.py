from rest_framework import viewsets
from driver.models import Driver
from driver.api.v1.serializers import DriverSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from generics.utils import CustomPagination
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from generics.custom_permissions import IsPassedOrganizationPermission


class DriverViewSet(viewsets.ModelViewSet):
    serializer_class = DriverSerializer
    queryset = Driver.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = CustomPagination
    filter_backends = [ SearchFilter, OrderingFilter]
    filterset_fields = ['name', 'email', 'nick_name']
    search_fields = ['name', 'email', 'added_by__name', 'added_by__email', 'nick_name', 'card_id', 'id']
    ordering_fields = ['name', 'email', 'nick_name']
    ordering = ['name', 'email', 'nick_name']

    def get_queryset(self):
        organization_id = self.request.GET.get('organization_id')
        return self.queryset.filter(organization=organization_id)
    
    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(added_by=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
