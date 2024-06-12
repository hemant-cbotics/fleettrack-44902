from rest_framework import permissions

class OrganizationUsersManagePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user_organization = obj.role_and_permission.role.organization
        is_user_owner = user_organization.owner == request.user
        if is_user_owner:
            return True
        # needs to add user admin also in this permission object
        return 0
    
class IsOwnerPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user_organization = obj.role_and_permission.role.organization
        is_user_owner = user_organization.owner == request.user
        if is_user_owner:
            return True
        # needs to add user admin also in this permission object
        return 0
    
class IsPassedOrganizationPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user_organization = self.user.role_and_permission.role.organization
        organization_id = self.request.GET.get('organization_id')
        if organization_id == user_organization.id:
            return True
        # needs to add user admin also in this permission object
        return 0