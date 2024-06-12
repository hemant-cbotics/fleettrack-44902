from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    VerifyEmailOTPView,
    ReSendEmailOTPView,
    ForgotPasswordView,
    ForgotPasswordResendView,
    ForgotPasswordVerifyOTPView
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")

urlpatterns = [
    path("resend-email-otp/", ReSendEmailOTPView.as_view(), name="resend-email-otp"),
    path("verify-email-otp/", VerifyEmailOTPView.as_view(), name="verify-email-otp"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("resend-forgot-password/", ForgotPasswordResendView.as_view(), name="resend-forgot-password"),
    path("forgot-password-verify-otp/", ForgotPasswordVerifyOTPView.as_view(), name="forgot-password-verify-otp"),
    path("", include(router.urls)),
]
