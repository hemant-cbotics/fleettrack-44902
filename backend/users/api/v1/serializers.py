from rest_framework import serializers
from organization.api.v1.serializers import OrganizationRoleSerializer
from users.models import UserRoleAndPermission, UserProfile, User, UserAccount
# from users.api.v1.serializers import UserSerializer


class AccountSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)

    class Meta:
        model = UserAccount
        fields = '__all__'
        read_only_fields = ('user', )
        extra_kwargs = {
            # 'organization': {'required': True},
            # 'email': {'required': True},
            'phone': {'required': True},
        }

class UserSerializer(serializers.ModelSerializer):
    role_and_permission = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()
    account = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["id", "email", "name", "role_and_permission", "profile", "account", "is_active"]

    def get_role_and_permission(self, obj):
        try:
            return UserRoleAndPermissionSerializer(obj.role_and_permission).data
        except:
            return None
    
    def get_profile(self, obj):
        try:
            return UserProfileSerialzer(obj.profile).data
        except:
            return None
        
    def get_account(self, obj):
        try:
            return AccountSerializer(obj.account).data
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
    groups = serializers.SerializerMethodField()
    class Meta:
        model = UserProfile
        fields = "__all__"

    def get_groups(self, obj):
        try:
            from group.api.v1.serializers import SimpleGroupSerializer
            return SimpleGroupSerializer(obj.groups, many=True).data
        except:
            return None

class OrganizationUsersSerializer(serializers.ModelSerializer):
    #user = UserSerializer()
    # profile = serializers.SerializerMethodField()
    user = UserSerializer()
    #role_and_permission = serializers.SerializerMethodField()

    class Meta:
        model = UserRoleAndPermission
        fields = ('id', 'user')
        # depth = 2
    
    # def get_profile(self, obj):
    #     try:
    #         return UserProfileSerialzer(obj.user.profile).data
    #     except:
    #         return None