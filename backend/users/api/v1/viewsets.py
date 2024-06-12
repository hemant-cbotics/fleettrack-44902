from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions, generics, status
from rest_framework.response import Response
# from rest_auth.views import LogoutView
from users.api.v1.serializers import ChangePasswordSerializer, AccountSerializer
from rest_framework.views import APIView
from django.conf import settings
from django.contrib.auth import logout as django_logout
from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import ugettext_lazy as _
from rest_framework import viewsets
from users.models import UserAccount
from rest_framework.permissions import IsAuthenticated


class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = UserAccount.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    http_method_names = ['put', 'patch', 'delete', 'get']
    # pagination_class = CustomPagination
    # filter_backends = [ SearchFilter, OrderingFilter]
    # filterset_fields = ['name', 'email', 'nick_name']
    # search_fields = ['name', 'email', 'added_by__name', 'added_by__email', 'nick_name', 'card_id', 'id']
    # ordering_fields = ['name', 'email', 'nick_name']
    # ordering = ['name', 'email', 'nick_name']

    # def get_queryset(self):
    #     organization_id = self.request.GET.get('organization_id')
    #     return self.queryset.filter(organization=organization_id)
    
    # def perform_create(self, serializer):
    #     serializer.save(added_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(added_by=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()

class ChangePasswordViewSet(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def post(self, request, pk=None):
        user = request.user
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            if not user.check_password(old_password):
                return Response({'error': 'Incorrect old password'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class CustomLogoutView(LogoutView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = (permissions.IsAuthenticated,)
    

class LogoutViewset(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass
        if getattr(settings, 'REST_SESSION_LOGIN', True):
            django_logout(request)

        response = Response({"detail": _("Successfully logged out.")},
                            status=status.HTTP_200_OK)
        return response