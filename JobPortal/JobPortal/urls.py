"""
URL configuration for JobPortal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from JPAPP import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.views import serve


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('JPAPP.urls')),
    path('',views.test),
    path('job_aboutus/',views.job_aboutus),
     path('job_register/',views.job_register),
    path('job_login/',views.job_login),
    path('get_states/', views.state_dropdown_view, name='get_states'), 
    path('get_cities/', views.city_dropdown_view, name='get_cities'), 
    path('check_username/', views.check_username, name='check_username'), 
    path('get_qualify/', views.Qualification_dropdown_view, name='get_qualify'), 
    path('register/', views.register_user, name='register'),
    path('check_username/', views.check_username, name='check_username'),
    path('validate_email/', views.validate_email, name='validate_email'), 
    path('login_view/', views.login_view, name='login_view'),
     path('profile_page/', views.profile_page, name='profile_page'),
     path('activatemail/', views.activatemail, name='activatemail'), 
     path('logout_view/', views.logout_view, name='logout_view'),
     path('job_post/', views.job_post, name='job_post'),
     path('get_jobcat/', views.jobcategory_dropdown_view, name='get_jobcat'), 
     path('add_job/', views.add_job, name='add_job'), 
    path('joblist/', views.joblist, name='joblist'), 
    path('apply_job/<int:id>', views.apply_job, name='apply_job'), 
    path('applied_job/', views.applied_job, name='applied_job'), 
    path('view_jobs/', views.view_jobs, name='view_jobs'), 
    path('status_job/<int:id>', views.status_job, name='status_job'), 
      path('edit_view/<int:id>', views.edit_view, name='edit_view'), 
      path('edit_job/', views.edit_job, name='edit_job'), 
     path('applications/<int:id>', views.applications, name='applications'),  
     path('application_del/<int:id>', views.application_del, name='application_del'),  
     path('del_job/<int:id>', views.del_job, name='del_job'), 
      path('testimonial/', views.testimonial, name='testimonial'), 
      path('add_testi/', views.add_testi, name='add_testi'),
       path('view_testi/', views.view_testi, name='view_testi'),  
      path('get_citydata/', views.get_citydata, name='get_citydata'), 
      # path('search_data/', views.search_data, name='search_data'),
    #   path('search/', views.search_data, name='search_data'),
      path('search_data/', views.search_data, name='search_data'),
       path('search_view/', views.search_view, name='search_view'),
       path('cat_job/<int:id>', views.cat_job, name='cat_job'), 
        path('contact/', views.contact, name='contact'),
        path('add_contact/', views.add_contact, name='add_contact'),
        path('profile_data/', views.profile_data, name='profile_data'),
        path('add_profiledata/', views.add_profiledata, name='add_profiledata'),


      #path('edit_jobcat/<int:id>', views.edit_jobcat, name='edit_jobcat'), 
    #  path('api/', include('JPAPP.urls')),
  #    
   # path('', include(router.urls)),
    #path('users/', views.user_create, namZe='users'),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)