from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from home.api.v1.serializers import (
    SignupSerializer,
    CustomAuthTokenSerializer,
    VerifyEmailOTPSerializer,
    ReSendEmailOTPSerializer,
    ForgotPasswordEmailSerializer,
    ForgotPasswordVerifyOTPSerializer
)
from generics.utils import Email, email_otp_generator, OrganizationUtil
from django.core.cache import cache
from django.conf import settings
from rest_framework import generics, status, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
import threading
from generics.custom_threads import send_email_otp, forgot_password_email
from users.models import User
from users.api.v1.serializers import UserSerializer, UserProfileSerialzer

class VerifyEmailOTPView(generics.GenericAPIView):
    """
    This api endpoint is responsible to confirm user email.

    It validates four digit code sent over user's email.
    """
    authentication_classes = [TokenAuthentication]

    serializer_class = VerifyEmailOTPSerializer
    input_token = "Email OTP"

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            cache.delete(email)
            user = User.objects.get(email=email)
            token, created = Token.objects.get_or_create(user=user)
            user_serializer = UserSerializer(user)
            organization_owner_data = OrganizationUtil.get_owned_organization_data(user)
            try:
                user_profile = UserProfileSerialzer(user.profile).data
            except:
                user_profile = {}
            #allowed_role = OrganizationUtil.get_allowed_organization_data(user)
            return Response(
                {
                    "token": token.key,
                    "user": user_serializer.data,
                    "owner_organization": organization_owner_data,
                    "user_profile": user_profile
                    #"allowed_roles": allowed_role,
                },
                status=status.HTTP_200_OK
            )
        return Response({"message": serializer.errors, "data": {}}, status=status.HTTP_400_BAD_REQUEST)


class ReSendEmailOTPView(generics.GenericAPIView):
    """
        This api endpoint is responsible to send 
        email otp.
    """
    serializer_class = ReSendEmailOTPSerializer
    input_token = "OTP has been sent to your email."

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            email_otp = email_otp_generator()
            
            cache.set(email, email_otp, int(settings.EMAIL_OTP_EXPIRY))
            thread = threading.Thread(target=send_email_otp, args=(email, email_otp), name="Send Email OTP")
            
            # Start the thread
            thread.start()
            
            return Response({"message": f"{self.input_token}", "data": {email}}, status=status.HTTP_200_OK)
        return Response({"message": serializer.errors, "data": {}}, status=status.HTTP_400_BAD_REQUEST)



class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = CustomAuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        email_otp = email_otp_generator()
        cache.set(user.email, email_otp, int(settings.EMAIL_OTP_EXPIRY))
        Email.send_login_otp(user.email, email_otp)
        return Response({"status": 1, "message": "Otp sent successfully"})
        # token, created = Token.objects.get_or_create(user=user)
        # user_serializer = UserSerializer(user)
        # return Response({"token": token.key, "user": user_serializer.data})


class ForgotPasswordView(generics.GenericAPIView):
    """
        This api endpoint is responsible to send forgot 
        password email.

    """
    authentication_classes = [TokenAuthentication]

    serializer_class = ForgotPasswordEmailSerializer
    input_token = "Forgot Password OTP"

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.user
            email_otp = email_otp_generator()
            
            cache.set(user.email, email_otp, int(settings.EMAIL_OTP_EXPIRY))
            thread = threading.Thread(target=forgot_password_email, args=(user, email_otp), name="Forgot Password Email.")
            
            # Start the thread
            thread.start()
            return Response({"message": f"{self.input_token} sent to your email.", 
                "data": {}}, status=status.HTTP_200_OK)
        return Response({"message": serializer.errors, "data": {}}, status=status.HTTP_400_BAD_REQUEST)
    
class ForgotPasswordResendView(ForgotPasswordView):
    pass

class ForgotPasswordVerifyOTPView(generics.GenericAPIView):
    serializer_class = ForgotPasswordVerifyOTPSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request':request})

        if serializer.is_valid():
            user = serializer.user
            new_password = serializer.validated_data['new_password']
            
            user.set_password(new_password)
            user.save()
            
            cache.delete(user.email)
            return Response({'message': 'Password reset successfully', "data":{}})
        else:
            return Response({"message": serializer.errors, "data": {}}, status=status.HTTP_400_BAD_REQUEST)