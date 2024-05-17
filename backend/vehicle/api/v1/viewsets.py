from rest_framework import viewsets
from vehicle.models import Vehicle
from vehicle.api.v1.serializers import VehicleSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from generics.utils import CustomPagination
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from generics.custom_permissions import IsPassedOrganizationPermission
# from vehicle.models import VehicleAndDriverMapping
from rest_framework.response import Response


class VehicleViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = CustomPagination
    filter_backends = [ SearchFilter, OrderingFilter]
    filterset_fields = ['short_name', 'email']
    search_fields = ['short_name', 'email', 'added_by__name', 'added_by__email']
    ordering_fields = ['short_name', 'email']
    ordering = ['short_name']

    def get_queryset(self):
        organization_id = self.request.GET.get('organization_id')
        return self.queryset.filter(organization=organization_id)
    
    def perform_create(self, serializer):
        try:
            instance = serializer.save(added_by=self.request.user)
            driver_id = self.request.data.get('driver')
            if driver_id:
                from driver.models import Driver
                driver = Driver.objects.get(id=driver_id)
                driver.vehicle_assigned = instance
                driver.save()
        except Exception as e:
            return Response({"message": str(e)}, status=400)

    def perform_update(self, serializer):
        try:
            instance = serializer.save(added_by=self.request.user)
            driver_id = self.request.data.get('driver')
            if driver_id:
                from driver.models import Driver
                driver = Driver.objects.get(id=driver_id)
                driver.vehicle_assigned = instance
                driver.save()
            if 'group_ids' in self.request.data:
                from group.models import Group
                # remove vehicle from all groups
                groups = Group.objects.filter(vehicles=instance)
                for s_group in groups:
                    s_group.vehicles.remove(instance)
                group_ids = self.request.data.pop('group_ids')
                for group_id in group_ids:
                    group = Group.objects.get(id=group_id)
                    group.vehicles.add(instance.id)
        except Exception as e:
            return Response({"message": str(e)}, status=400)

    def perform_destroy(self, instance):
        instance.delete()
