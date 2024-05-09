from rest_framework import serializers
from organization.api.v1.serializers import OrganizationRoleSerializer
from users.models import UserRoleAndPermission, UserProfile, User


class UserSerializer(serializers.ModelSerializer):
    role_and_permission = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["id", "email", "name", "role_and_permission", "is_active"]

    def get_role_and_permission(self, obj):
        try:
            return UserRoleAndPermissionSerializer(obj.role_and_permission).data
        except:
            return None

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class UserRoleAndPermissionSerializer(serializers.Serializer):
    role = OrganizationRoleSerializer(required=False)
    custom_permissions = serializers.JSONField(required=False)
    id = serializers.IntegerField(required=False)
    class Meta:
        model = UserRoleAndPermission
        fields = ('id', 'role', 'custom_permissions')


class UserRoleAndPermissionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRoleAndPermission
        fields = "__all__"

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
        fields = ('id', 'user', 'profile')
        # depth = 2
    
    def get_profile(self, obj):
        try:
            return UserProfileSerialzer(obj.user.profile).data
        except:
            return None