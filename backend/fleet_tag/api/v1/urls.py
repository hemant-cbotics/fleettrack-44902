from django.urls import path, include
from rest_framework import routers
from fleet_tag.api.v1.viewsets import (
    FleetTagViewset
)
app_name = 'fleet_tag'

router = routers.DefaultRouter()
router.register("", FleetTagViewset, basename="fleet_tag")

urlpatterns = [
    path("", include(router.urls)),
]