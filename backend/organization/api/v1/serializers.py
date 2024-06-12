from rest_framework import serializers
from organization.models import UserPermission, Organization, OrganizationRole, InvitedUser
#from users.api.v1.serializers import UserSerializer, UserProfileSerialzer
from users.models import User, UserRoleAndPermission


class UserPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPermission
        fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Organization
        fields = ('id', 'owner', 'name', 'is_active', 'email_sent', 'is_owner')
        read_only_fields = ('is_owner', )

    def get_is_owner(self, obj):
        try:
            return obj.owner == self.context['user']
        except KeyError:
            return False
    
class OrganizationRoleSerializer(serializers.ModelSerializer):
    organization_data = OrganizationSerializer(source='organization', read_only=True)

    class Meta:
        model = OrganizationRole
        fields = '__all__'

class OrganizationInvitedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitedUser
        fields = '__all__'

class OrganizationInvitedUserGetSerializer(serializers.ModelSerializer):
    role = OrganizationRoleSerializer()

    class Meta:
        model = InvitedUser
        fields = '__all__'

class OnboardInvitedUserSerializer(serializers.Serializer):
    id = serializers.UUIDField(required=True)
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate_id(self, value):
        if not InvitedUser.objects.filter(id=value, is_accepted=False).exists():
            raise serializers.ValidationError('Invalid invited user id')
        return value

    def validate(self, attrs):
        print(attrs)
        invited_user = InvitedUser.objects.filter(id=attrs['id'], is_accepted=False).first()
        attrs['invited_user'] = invited_user
        if attrs['password'] != attrs['confirm_password'] or attrs['password'] == '' or attrs['confirm_password'] == '':
            raise serializers.ValidationError({'password': 'Password and confirm password does not match'})
        return attrs    