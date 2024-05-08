from generics.utils import Email


# Function that will run in the thread
def forgot_password_email(user, email_otp):
    subject = "Fleet Track Forgot Password."
    message = f"Your forgot password OTP is: {email_otp}"
    email = user.email
    Email.shoot_mail(email=email, subject=subject, html_content=message)

# Function that will run in the thread
def send_email_otp(email, email_otp):
    subject = "Fleet Track Email-Verification."
    message = f"Hello, </br> We are glad that you choose to be a part of our team. Please use this otp {email_otp}  to continue login."
    # message = f"Your email verificartion OTP is: {email_otp}"
    Email.shoot_mail(email=email, subject=subject, html_content=message)