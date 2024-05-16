from django.urls import path, include
from rest_framework import routers
from group.api.v1.viewsets import (
    GroupViewset
)
app_name = 'group'

router = routers.DefaultRouter()
router.register("", GroupViewset, basename="grop")

urlpatterns = [
    path("", include(router.urls)),
]