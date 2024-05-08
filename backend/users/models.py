from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from generics.common_models import CommonModel


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    email = models.EmailField(_('email address'), unique = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class UserRoleAndPermission(CommonModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='role_and_permission')
    role = models.ForeignKey('organization.OrganizationRole', on_delete=models.CASCADE, related_name='organization_roles')
    custom_permissions = models.JSONField(default=[], null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.user.email} - {self.role.name}'
    
class UserProfile(CommonModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    description = models.TextField(null=True, blank=True)
    country_code = models.CharField(max_length=10, null=True, blank=True)
    mobile = models.CharField(max_length=15, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    two_factor_auth = models.BooleanField(default=False)
    user_geozone_labels = models.BooleanField(default=False)
    enable_sso_vistrack = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)
    timezone = models.CharField(max_length=50, null=True, blank=True)
    default_overlay = models.CharField(max_length=255, null=True, blank=True)
    user_state = models.CharField(max_length=255, null=True, blank=True)
    session_timeout = models.IntegerField(null=True, blank=True)
    first_login_page = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self) -> str:
        return self.user.email