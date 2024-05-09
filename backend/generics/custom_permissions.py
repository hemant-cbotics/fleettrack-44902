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