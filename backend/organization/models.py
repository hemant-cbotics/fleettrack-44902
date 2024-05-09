from django.db import models
from generics.common_models import CommonModel, UUIDModel
from users.models import User
import uuid

# Create your models here.

class Organization(CommonModel):
    """
        This model is responsible to store organization details. and the organizations will only be creaed by super admin through the 
        django admin panel.
    """
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True, related_name='organizations')
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    email_sent = models.BooleanField(default=False, help_text="This field is used to check whether the email has been sent to the owner or not.", editable=False)

    def __str__(self):
        return self.name
    
class UserPermission(CommonModel):
    """
        This model is responsible to store user permissions. Which will be used by FE to show/hide the features.
    """
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='permissions', default=None, null=True, blank=True)
    slug = models.CharField(max_length=255)
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Organization Defined Custom User Permission"
        verbose_name_plural = "Organization Defined Custom User Permissions"
    
class OrganizationRole(CommonModel):
    """
        This model is responsible to store organization roles. Which will be used by FE to show/hide the features according to the role of the user.
    """
    name = models.CharField(max_length=255)
    default_permissions = models.JSONField(default=[], null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='roles')
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Organization Role and Permission"
        verbose_name_plural = "Organization Roles and Permissions"

    def __str__(self):
        return self.name + " - " + self.organization.name

class InvitedUser(CommonModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField()
    organization = models.ForeignKey('organization.Organization', on_delete=models.CASCADE, related_name='invited_users')
    role = models.ForeignKey('organization.OrganizationRole', on_delete=models.CASCADE, related_name='invited_users')
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invited_users')
    is_accepted = models.BooleanField(default=False)
    email_sent = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.email
    
    class Meta:
        unique_together = ['email', 'organization']