import logging
from django.contrib.auth.models import User
#from rest_framework import viewsets
#from JPAPP.models import User
#from JPAPP.serializers import UserSerializer
from django.shortcuts import render
from django.http import JsonResponse
from JPAPP.models import states,city,Qualification,Job_Category,Addjobs,jobapplications,testimonialtbl,contacttbl,Profile_table
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from JPAPP.models import Userstbl,mail_status
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate, login as auth_login,logout 
from django.shortcuts import render, redirect

# Create your views here.

def test(request):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    context = {
       'user_id': user_id,
       'username':username,
           
  }
   
    return render(request,'index.html', context)

def job_aboutus(request):
    
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    context = {
       'user_id': user_id,
        'username':username,
           
  }
   
    return render(request,'about.html', context)

def job_register(request):
    
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    context = {
       'user_id': user_id,
        'username':username,
           
  }
   
    return render(request,'job-register.html', context)

def job_login(request):
    
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    context = {
       'user_id': user_id,
       'username':username,
           
  }
   
    return render(request,'job-login.html', context)



# drop down state names
def state_dropdown_view(request):
    info = states.objects.all()
    data = list(info.values())
    return JsonResponse(data, safe=False)

def get_citydata(request):
    info = city.objects.all()
    data = list(info.values())
    return JsonResponse(data, safe=False)

def city_dropdown_view(request):
    state_id = request.GET.get('state_id')
    # Query cities associated with the selected state
    cities = city.objects.filter(state_id=state_id)
    # Serialize the queryset to JSON
    data = list(cities.values())
    # Return JSON response
    return JsonResponse(data, safe=False)




def  Qualification_dropdown_view(request):
    info = Qualification.objects.all()
    data = list(info.values())
    return JsonResponse(data, safe=False)


# views.py
# def register_user(request):
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import secrets

    
def register_user(request):
    if request.method == 'POST' :
        # Parse the data sent via AJAX
        username1 = request.POST.get('name')
        email = request.POST.get('email')
        passs1 = request.POST.get('pass')
        qualification1 = request.POST.get('Qualification')
        gender1 = request.POST.get('gender')
        state1 = request.POST.get('state')
        city1 = request.POST.get('city')
        profile_image1 = request.FILES.get('img')
        mobile1 = request.POST.get('mobile')

        # Save data to the database
        registration_data = Userstbl(username=username1, email=email, password=passs1, qualification=qualification1,gender=gender1,state=state1,city=city1,profile_image=profile_image1,mobile=mobile1)
        registration_data.save()
        new_user_id = registration_data.id
        activation_token = secrets.token_urlsafe(32)
        status= mail_status(usertable_id=new_user_id, user_email=email,token=activation_token)
        status.save()
        
        
        subject = 'Welcome to Job Portal '
        message = f'Hi {username1}, thank you for registering'

    # Render HTML template with context
        html_message = render_to_string('email_confirmation.html', {'username': username1, 'token':activation_token})

    # Send the email
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email], html_message=html_message)
        
        # Return a success response
        #return JsonResponse({'message': 'Registration successful'})
        return JsonResponse({'success': True, 'message': 'Registration successful'})
 

    # Return an error response if the request method is not POST or if it's not an AJAX request
    return JsonResponse({'error': 'Invalid request'}, status=400)    
    

def check_username(request):
   # if request.method == 'GET':
        username1 = request.POST.get('name')
        if Userstbl.objects.filter(username=username1).exists():
            return HttpResponse(Userstbl.username)   
            return JsonResponse({'valid': False})
      #      return JsonResponse({'exists': user_exists})
        else:
            return JsonResponse({'valid': True})   
    
    
   
def validate_email(request):
    email = request.POST.get('email')
    if Userstbl.objects.filter(email=email).exists():
        return JsonResponse({'valid': False})
    else:
        return JsonResponse({'valid': True})
    
    
from django.http import HttpResponse
           
logger = logging.getLogger(__name__)
   
def login_view(request):
    
    if request.method == 'POST':
        email1 = request.POST.get('email','').strip()
        password1 = request.POST.get('password','').strip()
        #return HttpResponse(password1)

        try:
            user = Userstbl.objects.get(email=email1)
            statuss = mail_status.objects.get(usertable_id=user.id)
            #return HttpResponse(email1)
            #return HttpResponse(statuss.status)
            # If the user's mail_status is '1', activate the user
          #  if user.mail_status == '1':
           #     user.is_active = True
            #    user.save()
                     
            if check_password(password1, user.password):
                # Authentication successful
                request.session['username'] = user.username
                request.session['user_id'] = user.id
                logger.info(f"Login successful for {user.email}")
                
                # Check if the user account is active
                if not statuss.status:
                    return JsonResponse({'error': 'User account is not active'})
                if statuss.status:
                    return JsonResponse({'message': 'Login successful'})
            else:
                # Invalid password
                logger.warning(f"Invalid password for {user.email}")
                logger.debug(f"Password provided: {password1}")
                logger.debug(f"Password stored: {user.password}")
                return JsonResponse({'error': 'Invalid email or password'})
        
        except Userstbl.DoesNotExist:
            # User not found
            logger.warning(f"User with email {email1} does not exist")
            return JsonResponse({'error': 'User does not exist'})
    
    else:
        # Method not allowed
        logger.error("Method not allowed")
        return render(request,'job-login.html')
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    
    
def profile_page(request):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    user = Userstbl.objects.get(id=user_id)
    statenames=states.objects.get(id=user.state)
    citynames=city.objects.get(id=user.city)
    quali=Qualification.objects.get(id=user.qualification)
    
    try:
        pro_data = Profile_table.objects.get(user_id=user_id)
    except Profile_table.DoesNotExist:
        pro_data = None
   # pro_data=Profile_table.objects.get(user_id=user_id)
  
    
    context = {
       'user_id': user_id,
        'username': username,  
        'user':user,
        'statenames':statenames,
        'citynames':citynames,
        'quali':quali,
        'pro_data':pro_data,
  }
   
   
    return render(request,'profile.html', context)

def activatemail(request):
     token1 = request.GET.get('token')
     if token1:
        try:
            user2 = mail_status.objects.get(token=token1)
            # Activate user account
            user2.status = True
            user2.save()
            # Redirect to success page or login page
            return render(request, 'activatemail.html' )
            return redirect('login_view')  # Assuming 'login' is the name of your login URL pattern
        except User.DoesNotExist:
            # Handle invalid activation token
            return redirect('invalid_activation_token')  # Redirect to an error page
     else:
        # Handle missing activation token
        return redirect('missing_activation_token')
    
    
def logout_view(request):
    logout(request)
    # Redirect to a page after logout
    return redirect('login_view')  

def job_post(request):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    
    context = {
       'user_id': user_id,
       'username':username,
           
  }
    return render(request, 'jobpost.html', context)





def  jobcategory_dropdown_view(request):
    info = Job_Category.objects.all()
    data = list(info.values())
    return JsonResponse(data, safe=False)






def add_job(request):
    if request.method == 'POST' :
        # Parse the data sent via AJAX
        title1 = request.POST.get('title')
        jobcat1 = request.POST.get('jobcat')
        desc = request.POST.get('description')
        role = request.POST.get('role')
        jobsumm = request.POST.get('jobsumm')
        skills = request.POST.get('skills')
        salary = request.POST.get('salary')
        job_type = request.POST.get('job_type')
        vacancy = request.POST.get('vacancy')
        joindate = request.POST.get('joindate')
        comp = request.POST.get('comp')
        preference = request.POST.get('preference')
        qualification1 = request.POST.get('Qualification')
        state1 = request.POST.get('state')
        city1 = request.POST.get('city')
        logo = request.FILES.get('logo')
        compname = request.POST.get('compname')
        username = request.session.get('username')     
        user_id = request.session.get('user_id')
      

        # Save data to the database
        job_add = Addjobs(title=title1,description=desc,job_category=jobcat1,role=role,job_summary=jobsumm,skills=skills,salary=salary,job_type=job_type,compname=compname,vacancies=vacancy,job_closingdate=joindate,postedby=username, comp_dtls=comp,  preference=preference, qualification=qualification1,state=state1,city=city1,comp_logo=logo)
        job_add.save()
        #new_user_id = job_add.id
        
        context = {
        'user_id': user_id,
        'username': username,
    
    }
    
     #   return render(request, 'job-list.html', context)
        # Return a success response
        #return JsonResponse({'message': 'Registration successful'})
        return JsonResponse({'success': True, 'message': 'Job Posted successful'})
 

    # Return an error response if the request method is not POST or if it's not an AJAX request
    return JsonResponse({'error': 'Invalid request'}, status=400)    


from django.db import connection
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
def joblist(request):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    with connection.cursor() as cursor:
       
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename 
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            WHERE a.job_status='1'
             ORDER BY a.id DESC
        """)
        info = cursor.fetchall()
          
        items_per_page = 5
        paginator = Paginator(info, items_per_page)
        page_number = request.GET.get('all')
    
        try:
             paginated_data1 = paginator.page(page_number)
        except PageNotAnInteger:
        # If page is not an integer, deliver first page
             paginated_data1 = paginator.page(1)
        except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results
            paginated_data1 = paginator.page(paginator.num_pages)

        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename 
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            WHERE a.job_type = 'Full-time' AND a.job_status='1'
             ORDER BY a.id DESC
        """)
        Fulldata = cursor.fetchall()
        
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename 
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            WHERE a.job_type = 'Part-time' AND a.job_status='1'
             ORDER BY a.id DESC
        """)
        partdata = cursor.fetchall()
        
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename 
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            WHERE a.job_type = 'WFH' AND a.job_status='1'
             ORDER BY a.id DESC
        """)
        wfhs = cursor.fetchall()
  
    context = {
        'user_id': user_id,
        'username': username,
        'paginated_data1': paginated_data1,
        'Fulldata':Fulldata,
        'partdata':partdata,
        'wfhs':wfhs,
        
    
    }
    #return HttpResponse(info)
    #return JsonResponse({'success': True, 'info': info})
    
    
    return render(request, 'job-list.html', context)


def apply_job(request,id):
    
#    job_dtls = Addjobs.objects.get(id=id)
    with connection.cursor() as cursor:
       
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, a.description,a.role,a.skills,a.job_summary,a.vacancies,a.comp_dtls,a.preference,a.compname,a.last_login,c.citynames, s.statename,q.Qualification,j.title 
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            INNER JOIN jpapp_Qualification AS q ON a.qualification = q.id
             INNER JOIN jpapp_Job_Category AS j ON a.job_category = j.id
            WHERE  a.id =  %s
        """,[id])
        info = cursor.fetchall()
    username = request.session.get('username')
    context = {
       'username': username,
        'info':info
  }
   # return JsonResponse({'success': True, 'info': info})
    return render(request,'job-detail.html', context)


    
def applied_job(request):
    if request.method == 'POST' :
        
        # Parse the data sent via AJAX
        username1 = request.POST.get('name')
        email = request.POST.get('email')
        desc = request.POST.get('desc')
        file = request.FILES.get('file')
        mobile1 = request.POST.get('mobile')
        quali=request.POST.get('qualification')
        skil=request.POST.get('skills')
        comp=request.POST.get('comp')
        cstatus=request.POST.get('cstatus')
        cit=request.POST.get('city')
        lang=request.POST.get('lang')
        job_id=request.POST.get('jobid')
        posted=request.POST.get('username')
       # return HttpResponse(lang)

        # Save data to the database
        apply = jobapplications(name=username1,email=email,resume=file,mobile=mobile1,about=desc,qualification=quali,skills=skil,company=comp,company_status=cstatus,city=cit,languages=lang,job_id=job_id,job_postedby=posted)
       # A=print(apply)
        #return HttpResponse(A)
        apply.save()
    
        # Return a success response.
        return JsonResponse({'message': 'Applied job successful'})
        #return JsonResponse({'success': True, 'message': 'Applied job successful'})
 

    # Return an error response if the request method is not POST or if it's not an AJAX request
    return JsonResponse({'error': 'Invalid request'}, status=400) 







def view_jobs(request):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename,a.job_status
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            where a.postedby= %s
        """,[username])
        
        info = cursor.fetchall()
       
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename,a.job_status
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            WHERE a.job_type = 'Full-time' AND a.postedby= %s
        """,[username])
        Fulldata = cursor.fetchall()
        
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename,a.job_status
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            WHERE a.job_type = 'Part-time' AND a.postedby= %s
        """, [username])
        partdata = cursor.fetchall()
        
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename,a.job_status
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            WHERE a.job_type = 'WFH' AND a.postedby= %s
        """,[username])
        wfhs = cursor.fetchall()
    
  
    context = {
        'user_id': user_id,
        'username': username,
        'info': info,
        'Fulldata':Fulldata,
        'partdata':partdata,
        'wfhs':wfhs,
        
    
    }
   # return HttpResponse(Fulldata)
    #return JsonResponse({'success': True, 'info': info})
    
    
    return render(request, 'posted-jobs.html', context)

from django.contrib import messages
def status_job(request,id):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    
    infodata = Addjobs.objects.get(id=id)
    if infodata.job_status == False:
            infodata.job_status=True
            infodata.save()
    else:  
            infodata.job_status=False
            infodata.save()
    
    messages.success(request, 'Job status updated successfully.')
    return redirect('view_jobs')
    
  

from django.core import serializers
from datetime import datetime
def edit_view(request,id):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    infodata = Addjobs.objects.get(id=id)
    quali = Qualification.objects.all()
    data_quali = list(quali.values())
    job_cat= Job_Category.objects.all()
    data = list(job_cat.values())
    ciyy =city.objects.all()
    citynames = list(ciyy.values())
    sta =states.objects.all()
    staname = list(sta.values())
    
    #date_string = infodata.job_closingdate

#date_object = infodata.job_closingdate
    date_object = infodata.job_closingdate

    # Convert date object to string in the format "April 27, 2024"
    date_string = date_object.strftime("%B %d, %Y")

    # Convert string to datetime object
    date_object = datetime.strptime(date_string, "%B %d, %Y")

    # Extract year, month, and day
    year = str(date_object.year)
    month = str(date_object.month).zfill(2)  # Zero-pad month
    day = str(date_object.day).zfill(2)  # Zero-pad day

    # Append components into "yyyy-mm-dd" format
    formatted_date = f"{year}-{month}-{day}"



    #print(year, month, day)  
    #return HttpResponse(formatted_date)
  
    context = {
        'user_id': user_id,
        'username': username,
       'info': infodata,
       'data':data,
       'qualis':data_quali,
       'citynames':citynames,
       'staname':staname,
       'formatted_date':formatted_date,
      
    
    }

    
    return render(request, 'edit-job.html', context)



def edit_job(request):
    if request.method == 'POST' :
        # Parse the data sent via AJAX
        title1 = request.POST.get('title')
        jobcat1 = request.POST.get('jobcat')
        desc = request.POST.get('description')
        role = request.POST.get('role')
        jobsumm = request.POST.get('jobsumm')
        skills = request.POST.get('skills')
        salary = request.POST.get('salary')
        job_type = request.POST.get('job_type')
        vacancy = request.POST.get('vacancy')
        joindate = request.POST.get('joindate')
        comp = request.POST.get('comp')
        preference = request.POST.get('preference')
        qualification1 = request.POST.get('Qualification')
        state1 = request.POST.get('state')
        city1 = request.POST.get('city')
        logo = request.FILES.get('logo')
        compname = request.POST.get('compname')
        username = request.session.get('username')        
        id = request.POST.get('id')     
    
        
    edit_job = Addjobs.objects.filter(id=id).first()  # Retrieve the Addjobs instance

    if edit_job:  # Check if the instance exists
        edit_job.title = title1
        edit_job.description = desc
        edit_job.job_category = jobcat1
        edit_job.role = role
        edit_job.job_summary = jobsumm
        edit_job.skills = skills
        edit_job.salary = salary
        edit_job.job_type = job_type
        edit_job.compname = compname
        edit_job.vacancies = vacancy
        edit_job.job_closingdate = joindate
        edit_job.postedby = username
        edit_job.comp_dtls = comp
        edit_job.preference = preference
        edit_job.qualification = qualification1
        edit_job.state = state1
        edit_job.city = city1

        if logo:
            edit_job.comp_logo = logo  # Update the logo field

        edit_job.save()  
        # Return a success response
    return JsonResponse({'message': 'Job Edited successful'})
    
def applications(request,id):
    #return HttpResponse(id)
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    app= jobapplications.objects.filter(job_id=id)
    appdata=list(app.values())
    #countt=jobapplications.objects.filter(id=app.id)
    #c=countt.count()

       
    #return render(request, 'posted-jobs.html', context)
    
  #  return HttpResponse(appdata)
    items_per_page = 5
    paginator = Paginator(appdata, items_per_page)
    page_number = request.GET.get('all')
        
    try:
                paginated_data1 = paginator.page(page_number)
    except PageNotAnInteger:
            # If page is not an integer, deliver first page
                paginated_data1 = paginator.page(1)
    except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results
                paginated_data1 = paginator.page(paginator.num_pages)
      
    context = {
                'user_id': user_id,
                'username': username,

            'paginated_data1': paginated_data1
            }
    return render(request, 'view-application.html', context)


def  application_del(request,id):
    #return HttpResponse(id)
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    app= jobapplications.objects.filter(id=id)
   # return HttpResponse(app)
    #appcount= jobapplications.objects.filter(id=id).count()
    app.delete()
    context = {
        'user_id': user_id,
        'username': username,
    }  
    
    return render(request, 'view-application.html', context)

def del_job(request,id):
    #return HttpResponse(id)
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    app= Addjobs.objects.filter(id=id)
   # return HttpResponse(app)
    #appcount= jobapplications.objects.filter(id=id).count()
    app.delete()
    context = {
        'user_id': user_id,
        'username': username,
    }  
    
    return redirect('view_jobs')
    #return render(request, 'posted-jobs.html', context)


def testimonial(request):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    context = {
       'user_id': user_id,
        'username': username,    
  }
   
    return render(request,'testimonial.html', context)



def add_testi(request):
   if request.method == 'POST' :     
        # Parse the data sent via AJAX
        title = request.POST.get('name')
        #return HttpResponse(name1)
        pro = request.POST.get('pro')
        desc = request.POST.get('desc')
        file = request.FILES.get('img')
        # return HttpResponse(file)

        test = testimonialtbl(name=title, profession=pro, img=file, about=desc)
        test.save()

        # Return a success response.
        return JsonResponse({'message': 'Testimonial Added successful'})
        #return JsonResponse({'success': True, 'message': 'Applied job successful'})
    

    # Return an error response if the request method is not POST or if it's not an AJAX request
        return JsonResponse({'error': 'Invalid request'}, status=400) 
    
    
    

    
def view_testi(request):
    testimonials = testimonialtbl.objects.all()
    data = list(testimonials.values())
    context = {
        
        'data':data
     
          
  }
    
    #return JsonResponse(list(testimonials), safe=False)
    return JsonResponse(context, safe=False)
 
    


from django.db.models import Q
    
def search_data(request):
    # Get search criteria from GET parameters
    search_title = request.GET.get('searchTitle')
    job_category = request.GET.get('jobCategory')
    location = request.GET.get('location')
   # return HttpResponse(search_title)

    print("Search Title:", search_title)
    print("Job Category:", job_category)
    print("Location:", location)

    # Filter queryset based on search criteria
    queryset = Addjobs.objects.all()
    
    if search_title:
       # queryset = queryset.filter(title__icontains=search_title,description__icontains=search_title,role__icontains=search_title )
        queryset = queryset.filter(Q(title__icontains=search_title) | Q(description__icontains=search_title) | Q(role__icontains=search_title))
    if job_category:
        queryset = queryset.filter(job_category__icontains=job_category)
    if location:
        queryset = queryset.filter(city__icontains=location)

    # Convert queryset to JSON response
    data = list(queryset.values())
    #return HttpResponse(data)
    statedata= states.objects.all()
    statelist=list(statedata.values())
    citydata=city.objects.all()
    citylist=list(citydata.values())
   
    context = {
        
        'data':data,
        'statelist':statelist,
        'citylist':citylist,
     
          
  }
    

    #print("Filtered Data:", data)

    return JsonResponse(context, safe=False)
    
     
    
    
def search_view(request):
    
    data = request.GET.get('data')
    
    #return HttpResponse(data)
    
    #return render(request,'search.html')  
    return render(request, 'search.html', {'data': data})
       
       
def cat_job(request,id):
    
    #queryset = Addjobs.objects.filter(job_category=id)
    
    with connection.cursor() as cursor:
       
        cursor.execute("""
            SELECT a.id, a.title, a.job_type, a.salary, a.job_closingdate, a.comp_logo, c.citynames, s.statename 
            FROM jpapp_addjobs AS a
            INNER JOIN jpapp_city AS c ON a.city = c.id
            INNER JOIN jpapp_states AS s ON a.state = s.id
            WHERE AND a.job_status='1' AND a.job_category = %s
        """,[id])
        queryset = cursor.fetchall()
    
  #  return HttpResponse(queryset)
    
      
    context = {
        
        'queryset':queryset,
          
  }
    
    #return HttpResponse(queryset) 
    return render(request, 'job-catlist.html',context)    


def contact(request):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    context = {
       'user_id': user_id,
       'username':username,
           
  }
   
    return render(request,'contact.html', context)



def add_contact(request):
   if request.method == 'POST' :     
        # Parse the data sent via AJAX
        name = request.POST.get('name')
        #return HttpResponse(name1)
        email = request.POST.get('email')
        msg = request.POST.get('msg')
        sub = request.POST.get('sub')
       
        # return HttpResponse(file)

        test = contacttbl(name=name, email=email, msg=msg, subject=sub)
        test.save()

        # Return a success response.
        return JsonResponse({'message': 'We will Contact you Soon............'})
        #return JsonResponse({'success': True, 'message': 'Applied job successful'})
    

    # Return an error response if the request method is not POST or if it's not an AJAX request
        return JsonResponse({'error': 'Invalid request'}, status=400) 
    
    
    
    
    
def profile_data(request):
    user_id = request.session.get('user_id')
    username = request.session.get('username')
    query = Profile_table.objects.filter(user_id=user_id)
    querylist=list(query.values())
    context = {
       'user_id': user_id,
       'username':username,
       'query':querylist,
           
  }
 #   return HttpResponse(querylist)
    return render(request,'addprofile.html', context)


def add_profiledata(request):
   if request.method == 'POST' :     
        # Parse the data sent via AJAX
        about = request.POST.get('about')
        #return HttpResponse(name1)
        edu = request.POST.get('edu')
        pro = request.POST.get('pro')
        cname = request.POST.get('cname')
        exp = request.POST.get('exp')
        job = request.POST.get('job')
        id = request.POST.get('id')
        user_id=request.session.get('user_id')
        username = request.session.get('username')
        # return HttpResponse(file)
        query = Profile_table.objects.filter(user_id=id)
        querylist=list(query.values())
        if not query.exists():
            test = Profile_table(user_id=id, about=about, education=edu, company=cname, designation=pro, job_responsibilities=job, job_experience=exp, postedby=username)
            test.save()
        else:
            edit = Profile_table.objects.get(user_id=id) 
            edit.about = about
            edit.education = edu
            edit.company = cname
            edit.designation = pro
            edit.job_responsibilities = job
            edit.job_experience = exp
            edit.save()
            
        context = {
       'user_id': user_id,
       'username':username,
           
         }    
        
        #return JsonResponse(context, safe=False)
        # Return a success response.
        return JsonResponse({'message': 'Profile Updated............'})
        #return JsonResponse({'success': True, 'message': 'Applied job successful'})
    

    # Return an error response if the request method is not POST or if it's not an AJAX request
        return JsonResponse({'error': 'Invalid request'}, status=400) 
    
    
    


