from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.api.v1.viewsets import (
    ChangePasswordViewSet,
    LogoutViewset
    # CustomLogoutView,
)

router = DefaultRouter()


urlpatterns = [
    path("", include(router.urls)),
    path("change-password/", ChangePasswordViewSet.as_view(), name="change-password"),
    path("logout/", LogoutViewset.as_view(), name="logout"),
    # path("user-logout/", CustomLogoutView.as_view(), name="user_logout"),
]