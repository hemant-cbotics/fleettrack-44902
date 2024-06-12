from django.urls import path, include
from rest_framework import routers
from vehicle.api.v1.viewsets import (
    VehicleViewSet
)
app_name = 'vehicle'

router = routers.DefaultRouter()
router.register("", VehicleViewSet, basename="vehicle")

urlpatterns = [
    path("", include(router.urls)),
]