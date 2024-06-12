from django.contrib import admin
from organization.models import Organization, UserPermission, OrganizationRole, InvitedUser
from django.utils.html import format_html
# Register your models here.

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('owner', 'name', 'is_active', 'email_sent', )
    search_fields = ('owner__email', 'name', 'owner__name', 'owner__first_name', 'owner__last_name')
    list_filter = ('is_active', 'email_sent')
    # readonly_fields = ('send mail', ) # this will be used to show the send mail button on the admin panel
    # list_display_links = ('owner')

    def send_mail(self, obj):
        print('send mail')
        return format_html('send mail')


admin.site.register(UserPermission)
admin.site.register(OrganizationRole)
admin.site.register(InvitedUser)