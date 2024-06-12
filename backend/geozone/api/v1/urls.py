from django.urls import path, include
from rest_framework import routers
from geozone.api.v1.viewsets import (
    GeozoneViewSet
)
app_name = 'vehicle'

router = routers.DefaultRouter()
router.register("", GeozoneViewSet, basename="geozone")

urlpatterns = [
    path("", include(router.urls)),
]