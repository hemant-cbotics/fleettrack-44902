from django.conf import settings
from django.core.mail import send_mail
import random, string
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 20  # Optional: set maximum page size

def email_otp_generator(length=settings.EMAIL_OTP_LENGTH):
    return ''.join(random.choice(string.digits) for i in range(int(length)))

class OrganizationUtil:

    @classmethod
    def get_owned_organization(self, user):
        try:
            from organization.models import Organization
            return Organization.objects.get(owner=user)
        except:
            return None    

    @classmethod
    def get_owned_organization_data(self, user):
        try:
            from organization.api.v1.serializers import OrganizationSerializer
            from organization.models import Organization
            org = Organization.objects.get(owner=user)
            return OrganizationSerializer(org, context={"user": user}).data
        except:
            return None
        
    @classmethod
    def get_allowed_organization_data(self, user):
        try:
            from users.api.v1.serializers import UserRoleAndPermissionSerializer
            data = UserRoleAndPermissionSerializer(user.role_and_permission).data
            return data
        except:
            return None

class Email:

    def shoot_mail(*args, **kwargs):
        if kwargs.get("email"):
            mail = send_mail(
                    kwargs.get("subject"),
                    kwargs.get("html_content"),
                    settings.DEFAULT_FROM_EMAIL,
                    [kwargs.get("email")],
                    fail_silently=False,
                    html_message=kwargs.get("html_content"),
                )
            print('email sent from here')
            return mail
        return None

    @classmethod
    def send_login_otp(self, email, code):
        html_content = 'Hello, </br> We are glad that you choose to be a part of our team. Please use this otp ' + str(code) +'  to continue login.'
        self.shoot_mail(email=email, subject='FleetTrack OTP', html_content=html_content)

    @classmethod
    def send_mail(*args, **kwargs):
        return Email.shoot_mail(*args, **kwargs)
