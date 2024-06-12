from django.urls import path, include
from rest_framework import routers
from driver.api.v1.viewsets import (
    DriverViewSet
)
app_name = 'vehicle'

router = routers.DefaultRouter()
router.register("", DriverViewSet, basename="driver")

urlpatterns = [
    path("", include(router.urls)),
]