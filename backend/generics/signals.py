from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.conf import settings
from users.models import UserProfile, User
from organization.models import Organization, OrganizationRole, UserPermission, InvitedUser
import logging
from generics.utils import Email

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

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=InvitedUser)
def send_mail_invited_user(sender, instance, created, **kwargs):
    if created:
        subject = "Invitation to join Fleet Track organization"
        invitation_link = f"{settings.BASE_URL}/organization/invitation/{instance.id}"
        html_content = f'Hi {instance.username}, <br/><br/> You have been invited to join the organization {instance.organization.name}. Please click here to continue {invitation_link}.'
        Email.send_mail(email=instance.email, subject=subject, html_content=html_content)
        instance.email_sent = True
        instance.save()
        # send email to the invited user
        pass