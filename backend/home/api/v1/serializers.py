from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from dj_rest_auth.serializers import PasswordResetSerializer
from django.contrib.auth import authenticate
from django.core.cache import cache
User = get_user_model()

class VerifyEmailOTPSerializer(serializers.Serializer):
    email = serializers.CharField()
    email_otp = serializers.CharField()

    def validate(self, data):
        user_otp = cache.get(data['email'])
        
        if user_otp is None:
            raise serializers.ValidationError("OTP has expired.")
        
        if user_otp != data['email_otp']:
            raise serializers.ValidationError("Invalid OTP.")
        
        return data


class ReSendEmailOTPSerializer(serializers.Serializer):
    email = serializers.CharField()


class CustomAuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email"), write_only=True)
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    token = serializers.CharField(label=_("Token"), read_only=True)
    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _('Must include "email" and "password".')
            raise serializers.ValidationError(msg, code="authorization")
        attrs["user"] = user
        return attrs
        # id, code = UserUtil.create_auth_otp(user) # generate the unique code
        # send_email = Email.send_email_otp(user.email, code) # send code on email of user
        # phone_otp = PhoneOTP.send_message(str(user.profile.country_code)+str(user.profile.mobile), code) # send code on phone of user
        # if not send_email and not phone_otp:
        #     raise serializers.ValidationError({'otp': 'Otp could not be sent, Please check.'})
        # return 1

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": True,
                "allow_blank": False,
            },
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
        )
        user.set_password(validated_data.get("password"))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()




class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm



class ForgotPasswordEmailSerializer(serializers.Serializer):
    email = serializers.CharField()

    def validate(self, data):
        try:
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            raise serializers.ValidationError("User has not registered with this email.")
        
        self.user = user

        return data
    
class ForgotPasswordVerifyOTPSerializer(serializers.Serializer):
    email = serializers.CharField()
    otp = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_new_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        new_password = data.get('new_password')
        confirm_new_password = data.get('confirm_new_password')

        try:
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            raise serializers.ValidationError("User has not registered with this email.")

        user_otp = cache.get(user.email)
        
        if user_otp is None:
            raise serializers.ValidationError("OTP has expired.")
        
        if user_otp != data['otp']:
            raise serializers.ValidationError("Invalid OTP.")

        if new_password != confirm_new_password:
            raise serializers.ValidationError({'new_password': 'Passwords do not match'})
        
        self.user = user
        return data