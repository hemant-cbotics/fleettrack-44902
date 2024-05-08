from rest_framework import serializers
from organization.api.v1.serializers import OrganizationRoleSerializer
from users.models import UserRoleAndPermission, UserProfile, User


class UserSerializer(serializers.ModelSerializer):
    role_and_permission = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["id", "email", "name", "role_and_permission"]

    def get_role_and_permission(self, obj):
        try:
            return UserRoleAndPermissionSerializer(obj.role_and_permission).data
        except:
            return None

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class UserRoleAndPermissionSerializer(serializers.Serializer):
    assigned_role = OrganizationRoleSerializer(source='role', required=False)
    assigned_permissions = serializers.JSONField(source='custom_permissions', required=False)
    class Meta:
        model = UserRoleAndPermission
        fields = ('id', 'assigned_role', 'assigned_permissions')


class UserProfileSerialzer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"

class OrganizationUsersSerializer(serializers.ModelSerializer):
    #user = UserSerializer()
    profile = serializers.SerializerMethodField()
    user = UserSerializer()
    #role_and_permission = serializers.SerializerMethodField()

    class Meta:
        model = UserRoleAndPermission
        fields = ('id', 'user', 'role', 'profile')
    
    def get_profile(self, obj):
        try:
            return UserProfileSerialzer(obj.user.profile).data
        except:
            return None