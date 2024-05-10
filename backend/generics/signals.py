from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.conf import settings
from users.models import UserProfile, User, UserRoleAndPermission
from organization.models import Organization, OrganizationRole, UserPermission, InvitedUser
import logging
from generics.utils import Email, generate_random_password

# logging.basicConfig(level=logging.debug)
# logger = logging.getLogger(__name__)

@receiver(post_save, sender=Organization)
def send_organization_owner_mail(sender, instance, created, **kwargs):
    # logger.debug("send_organization_owner_mail")
    if created and not instance.email_sent:
        # logger.debug("send_organization_owner_mail")
        subject = "Organization Created"
        html_content = f'Hi {instance.owner.first_name} {instance.owner.last_name}, <br/><br/> A new organization has been created with the name {instance.name} and you have been assign the owner. Please login to the system to manage the organization.'
        Email.send_mail(email=instance.owner.email, subject=subject, html_content=html_content)  
        instance.email_sent = True
        instance.save()
        # logger.debug("send_organization_owner_mail")
        # send email to the owner
        pass

@receiver(post_save, sender=InvitedUser)
def create_user(sender, instance, created, **kwargs):
    if created:
        try:
            user = User.objects.create(
                email=instance.email,
                username=instance.username,
                name=instance.username,
                is_active=False,)
            password = generate_random_password()
            user.set_password(password)
            user.save()
            instance.user = user
            instance.save()
            UserRoleAndPermission.objects.create(
                    user=user,
                    role=instance.role,
                    custom_permissions={}
                )
            # send invitation email
            subject = "Invitation to join Fleet Track organization"
            invitation_link = f"{settings.BASE_URL}/organization/invitation/{instance.id}"
            html_content = f'Hi {instance.username}, <br/><br/> You have been invited to join the organization {instance.organization.name}. Please click here to continue <a href="{invitation_link}" _blank>{invitation_link}</a>.'
            Email.send_mail(email=instance.email, subject=subject, html_content=html_content)
            instance.email_sent = True
            instance.save()
            # send email to the invited user
            pass
        except Exception as e:
            pass


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        try:
            UserProfile.objects.create(user=instance)
        except Exception as e:
            pass
