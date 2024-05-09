
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from organization.models import UserPermission, OrganizationRole, InvitedUser
from rest_framework.response import Response
from organization.api.v1.serializers import UserPermissionSerializer, OnboardInvitedUserSerializer, OrganizationInvitedUserGetSerializer, OrganizationRoleSerializer, OrganizationInvitedUserSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters, permissions
from users.models import User, UserRoleAndPermission
from generics.utils import OrganizationUtil, CustomPagination
from users.api.v1.serializers import OrganizationUsersSerializer


class UserPermissionsView(APIView):
    authentication_classes = [TokenAuthentication]
    serializer_class = UserPermissionSerializer

    def get(self, request, *args, **kwargs):
        user_permissions = UserPermission.objects.all()
        serializer = self.serializer_class(user_permissions, many=True)
        return Response(serializer.data)
    
class OrganizationInviteUserView(APIView):
    authentication_classes = [TokenAuthentication]
    serializer_class = OrganizationInvitedUserSerializer

    def post(self, request, *args, **kwargs):
        user = self.request.user
        owned_organization = OrganizationUtil.get_owned_organization(user)
        if owned_organization:
            m_data = request.data.copy()
            m_data['organization'] = owned_organization.id
            m_data['invited_by'] = user.id
            serializer = self.serializer_class(data=m_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        else:
            return Response({'error': 'You do not have any organization'}, status=400)
        
class GetInvitedUserView(APIView):
    serializer_class = OrganizationInvitedUserGetSerializer

    def get(self, request, *args, **kwargs):
        try:
            invited_user = InvitedUser.objects.get(id=kwargs['id'])
            data = self.serializer_class(invited_user).data
            return Response(data)
        except:
            return Response({'error': 'Invited user not found'}, status=400)
        
class OnboardInvitedUserView(APIView):
    serializer_class = OnboardInvitedUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            invited_user = serializer.validated_data['invited_user']
            invited_user.is_accepted = True
            invited_user.save()
            try:
                user = invited_user.user
                user.is_active = True
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response({'message': 'User onboarded successfully'})
            except Exception as e:
                return Response({'error': str(e)}, status=400)
        return Response(serializer.errors, status=400)
    
class OrganizationRolesView(APIView):
    authentication_classes = [TokenAuthentication]
    serializer_class = OrganizationRoleSerializer

    def get(self, request, *args, **kwargs):
        user = self.request.user
        owned_organization = OrganizationUtil.get_owned_organization(user)
        organization_roles = OrganizationRole.objects.filter(organization=owned_organization)
        serializer = self.serializer_class(organization_roles, many=True)
        return Response(serializer.data)
    
class OrganizationRoleViewset(ModelViewSet):
    """
    API endpoint that allows organization roles to be viewed or edited.
    """
    #http_method_names = ['get']
    authentication_classes = [TokenAuthentication]
    serializer_class = OrganizationRoleSerializer
    queryset = OrganizationRole.objects.all()
    filter_backends = [filters.SearchFilter] # search filter
    search_fields = ['name', 'organization__name'] # search by name and organization name

    def get_queryset(self):
        return super().get_queryset().filter(organization__owner=self.request.user)
    
class OrganizationUsersView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrganizationUsersSerializer
    pagination_class = CustomPagination

    def get(self, request, *args, **kwargs):
        organization_id = kwargs.get('organization_id')
        #user = self.request.user
        user_role_permission = UserRoleAndPermission.objects.filter(role__organization__id=organization_id)
        print(user_role_permission)
        paginator = self.pagination_class()
        paginated_users = paginator.paginate_queryset(user_role_permission, request)
        serializer = OrganizationUsersSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)
        
class OrganizationUserEditView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrganizationUsersSerializer
    
    def patch(self, request, *args, **kwargs):
        request_data = request.data.copy()
        if 'user' in request_data:
            user_data = request_data.pop('user')
            from users.api.v1.serializers import UserSerializer
            serializer = UserSerializer(data=user_data, partial=True)
            user = User.objects.get(id=user_data['id'])
            if serializer.is_valid(raise_exception=True):
                serializer.update(user, serializer.validated_data)
                if 'password' in user_data:
                    user.set_password(user_data['password'])
                    user.save()
        if 'profile' in request_data:
            profile_data = request_data.pop('profile')
            from users.api.v1.serializers import UserProfileSerialzer
            from users.models import UserProfile
            serializer = UserProfileSerialzer(data=profile_data, partial=True)
            profile = UserProfile.objects.get(id=profile_data['id'])
            if serializer.is_valid(raise_exception=True):
                serializer.update(profile, serializer.validated_data)
        if 'role_and_permission' in request_data:
            roles_and_permission = request_data.pop('role_and_permission')
            from users.api.v1.serializers import UserRoleAndPermissionUpdateSerializer
            from users.models import UserRoleAndPermission
            serializer = UserRoleAndPermissionUpdateSerializer(data=roles_and_permission, partial=True)
            role_permission = UserRoleAndPermission.objects.get(id=roles_and_permission['id'])
            if serializer.is_valid(raise_exception=True):
                serializer.update(role_permission, serializer.validated_data)
        return Response({'message': 'User updated successfully'}, status=200)