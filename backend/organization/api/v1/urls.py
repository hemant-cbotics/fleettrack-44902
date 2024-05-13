from django.urls import path, include
from rest_framework import routers
from organization.api.v1.viewsets import (
    UserPermissionsView,
    OrganizationRoleViewset,
    OrganizationInviteUserView,
    GetInvitedUserView,
    OnboardInvitedUserView,
    OrganizationUsersView,
    OrganizationUserEditView,
    OrganizatioUserViewset,
    OrganizationUserView
)
app_name = 'organization'

router = routers.DefaultRouter()
router.register("roles-permission", OrganizationRoleViewset, basename="roles-permission")
router.register("organization-user", OrganizatioUserViewset, basename="organization-user")

urlpatterns = [
    path("", include(router.urls)),
    path('user-permissions/', UserPermissionsView.as_view(), name='user-permissions'),
    path('invite-user/', OrganizationInviteUserView.as_view(), name='invite-user'),
    path('show-invite-user/<uuid:id>/', GetInvitedUserView.as_view(), name='invite-user'),
    path('onboard-invited-user/', OnboardInvitedUserView.as_view(), name='onboard-invited-user'),
    path('organization-users/<int:organization_id>/', OrganizationUsersView.as_view(), name='organization-users'),
    # path('organization-user/<int:organization_id>/<int:user_id>/', OrganizationUserView.as_view(), name='organization-user'),
    path('edit-user/', OrganizationUserEditView.as_view(), name='edit-user'),
    #path('get-organization-roles/', OrganizationRolesView.as_view(), name='get-organization-roles'),
]