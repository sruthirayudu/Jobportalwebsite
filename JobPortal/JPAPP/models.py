from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import Argon2PasswordHasher
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password


# Create your models here.
class states(models.Model):
   # user = models.OneToOneField(User, on_delete=models.CASCADE)
    statecode = models.CharField(max_length=100)
    statename = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.statename

class city(models.Model):
    citynames = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    state = models.ForeignKey(states, on_delete=models.CASCADE)

    def __str__(self):
        return self.citynames
    
class Qualification(models.Model):
    Qualification = models.CharField(max_length=100)
    Passedouts = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
class mail_status(models.Model):
    usertable_id = models.IntegerField()
    user_email= models.CharField(max_length=100)
    token=models.CharField(max_length=100)
    status = models.BooleanField(default=False)    
    
    
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _    

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        """
        Create and return a regular user with an email and password.
        """
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        if password:
         user.set_password(password)
         user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """
        Create and return a superuser with an email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(username, email, password, **extra_fields)

class Userstbl(AbstractBaseUser):
    username = models.CharField(_('username'), max_length=128, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    qualification = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    profile_image = models.ImageField(upload_to='profile_images/')
    mobile = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(_('last login'), default=timezone.now)
    is_staff = models.BooleanField(_('staff status'), default=False)
    mail_status= models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']  # Required fields when creating a user via createsuperuser
    
        
    def save(self, *args, **kwargs):
        # Hash the password before saving
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)    

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.username

        
    
class Job_Category(models.Model):
    title = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
    
class Addjobs(models.Model):
    title = models.CharField(max_length=128)
    description= models.CharField(max_length=2500)
    role = models.CharField(max_length=2500)
    qualification = models.CharField(max_length=100)
    job_type = models.CharField(max_length=20)
    job_category = models.IntegerField()
    state = models.IntegerField()
    city = models.IntegerField()
    skills= models.CharField(max_length=1000)
    job_summary= models.CharField(max_length=2500)
    salary=models.CharField(max_length=100)
    vacancies=models.CharField(max_length=100)
    job_closingdate=models.DateField()
    comp_dtls=models.CharField(max_length=2500)
    preference=models.CharField(max_length=500)
    comp_logo=models.ImageField(upload_to='company_logo/')
    compname=models.CharField(max_length=500)
    postedby=models.CharField(max_length=100)
    
    job_status=models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(_('last login'), default=timezone.now)
    is_staff = models.BooleanField(_('staff status'), default=False)
  




class jobapplications(models.Model):
    name = models.CharField(max_length=128)
    about= models.CharField(max_length=2500)
    email = models.CharField(max_length=100)
    mobile=models.CharField(max_length=100)
    qualification=models.CharField(max_length=100)
    city=models.CharField(max_length=100)
    company=models.CharField(max_length=100)
    company_status=models.CharField(max_length=100)
    resume=models.ImageField(upload_to='Resume/')
    skills=models.CharField(max_length=100)
    languages=models.CharField(max_length=100)
    job_id=models.IntegerField()
    job_postedby=models.CharField(max_length=100)
    last_login = models.DateTimeField(_('last login'), default=timezone.now)
    application_status=models.BooleanField(default=True)
    
  
class testimonialtbl(models.Model):
    name= models.CharField(max_length=100)
    profession=models.CharField(max_length=100)
    about=models.CharField(max_length=500)
    img=models.ImageField(upload_to='testimonial/')
    last_login = models.DateTimeField(_('last login'), default=timezone.now)


class contacttbl(models.Model):
    name= models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    msg=models.CharField(max_length=500)
    subject=models.CharField(max_length=1500)
    last_login = models.DateTimeField(_('last login'), default=timezone.now)




    
class Profile_table(models.Model):
    
    user_id = models.IntegerField()
    about= models.CharField(max_length=2500)
    education = models.CharField(max_length=2500)
    company = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    job_responsibilities = models.CharField(max_length=2000)
    job_experience= models.CharField(max_length=1000)
    
    postedby=models.CharField(max_length=100)

    last_login = models.DateTimeField(_('last login'), default=timezone.now)
  
  









