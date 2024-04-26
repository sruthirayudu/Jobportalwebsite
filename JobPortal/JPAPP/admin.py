from django.contrib import admin
from JPAPP.models import states,city,Qualification,Userstbl,mail_status,Job_Category,Addjobs,jobapplications,testimonialtbl
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin

class statesadmin(admin.ModelAdmin):
    list_display = ['id','statecode','statename']
admin.site.register(states,statesadmin)


class cityadmin(admin.ModelAdmin):
     list_display = ['id','citynames','state']
admin.site.register(city,cityadmin)
     

class Qualificationadmin(admin.ModelAdmin):
     list_display = ['id','Qualification','Passedouts']
admin.site.register(Qualification,Qualificationadmin)

class mailstatus_admin(admin.ModelAdmin):
     list_display = ['id','usertable_id','user_email','status','token']
admin.site.register(mail_status,mailstatus_admin)

class Job_Category_admin(admin.ModelAdmin):
     list_display = ['id','title']
admin.site.register(Job_Category,Job_Category_admin)



class Userstbladmin(admin.ModelAdmin):
     list_display = ['username','email','qualification','gender','state','city','profile_image','mobile','mail_status'] 
     search_fields = ('username', 'email')
     ordering = ('username',)
     exclude = ('password',) 
admin.site.register(Userstbl,Userstbladmin)



class Addjobsadmin(admin.ModelAdmin):
     list_display = ['title','job_type','job_category','skills','salary','vacancies','job_closingdate','preference','qualification','state','city','comp_logo','job_status','postedby'] 
admin.site.register(Addjobs,Addjobsadmin)



class Applicationadmin(admin.ModelAdmin):
     list_display = ['name','email','mobile','resume','about','job_postedby','qualification','city','company','company_status','skills','languages','job_id','application_status'] 
     search_fields = ('job_postedby',)
admin.site.register(jobapplications,Applicationadmin)



class testimonialadmin(admin.ModelAdmin):
     list_display = ['name','profession','about','img']
admin.site.register(testimonialtbl,testimonialadmin)