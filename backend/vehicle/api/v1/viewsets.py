from rest_framework import viewsets
from vehicle.models import Vehicle
from vehicle.api.v1.serializers import VehicleSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from generics.utils import CustomPagination
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter



class VehicleViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = CustomPagination
    filter_backends = [ SearchFilter, OrderingFilter]
    filterset_fields = ['short_name', 'email']
    search_fields = ['short_name', 'email', 'owner__name', 'owner__email']
    ordering_fields = ['short_name', 'email']
    ordering = ['short_name']

    # def get_queryset(self):
    #     return self.queryset.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(added_by=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
