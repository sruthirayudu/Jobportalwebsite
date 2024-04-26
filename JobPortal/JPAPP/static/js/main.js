(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);




$.validator.addMethod("mobileLength", function(value, element) {
    return this.optional(element) || /^\d{10}$/.test(value);
}, "Mobile number must be 10 digits.");

$.validator.addMethod("extension", function(value, element, param) {
    param = typeof param === "string" ? param.replace(/,/g, "|") : "png|jpe?g|gif"; // Default image extensions
    return this.optional(element) || new RegExp("\\.(" + param + ")$", "i").test(value);
}, $.validator.format("Please enter a value with a valid extension."));

$(document).ready(function() {
    $('#registrationForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            pass: {
                required: true,
                minlength: 6
            },
            conpass: {
                required: true,
                equalTo: "#pass"
            },
            gender: {
                required: true
            },
            Qualification: {
                required: true
            },
            state: {
                required: true
            },
            city: {
                required: true
            },
            mobile: {
                required: true,
                digits: true,
                mobileLength: true
            },
            img: {
                required: true,
                extension: "jpg|jpeg|png|gif"
            }
          
        },
        messages: {
            name: {
                required: "Please enter your username.",
                minlength: "Username must be at least 3 characters long."
            },
            email: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            },
            pass: {
                required: "Please enter your password.",
                minlength: "Password must be at least 6 characters long."
            },
            conpass: {
                required: "Please confirm your password.",
                equalTo: "Passwords do not match."
            },
            gender: "Please select your gender.",
            Qualification: "Please select your qualification.",
            state: "Please select your state.",
            city: "Please select your city.",
            mobile: {
                required: "Please enter your mobile number.",
                digits: "Please enter a valid mobile number.",
               // mobileLength: "Please enter 10 digits valid mobile number"
            },
            img: {
                required: "Please upload your profile picture.",
                extension: "Please upload an image file (jpg, jpeg, png, gif)."
            }
        },

        errorPlacement: function(error, element) {
            // Check the ID of the input element and place the error message accordingly
            if (element.attr("name") == "name") {
                error.appendTo($('#usernameError'));
            } else if (element.attr("name") == "pass") {
                error.appendTo($('#passwordError'));
            } else if (element.attr("name") == "conpass") {
                error.appendTo($('#conpassError'));
            }else if (element.attr("name") == "email") {
                error.appendTo($('#emailError'));
            } else if (element.attr("name") == "Qualification") {
                error.appendTo($('#qualifyError'));
            } else if (element.attr("name") == "state") {
                error.appendTo($('#stateError'));
            } else if (element.attr("name") == "city") {
                error.appendTo($('#cityError'));
            } else if (element.attr("name") == "mobile") {
                error.appendTo($('#mobileError'));
            }  else if (element.attr("name") == "img") {
                error.appendTo($('#imgError'));
            }   else if (element.attr("name") == "gender") {
                error.appendTo($('#genderError'));
            }  
         
            
            
            
            
            else {
                // For other fields, use default placement (next to the input element)
                error.insertAfter(element);
              



            }
        },

        submitHandler: function(form) {
            $('#registrationForm').submit(function(e) {
                e.preventDefault(); // Prevent the form from submitting normally
               // var username = $(this).find('[name="name"]').val();
               var formData = $(this).serialize(); // Serialize form data

               //     var formData = new FormData(this); // Get form data
                
                    var formData = new FormData(this);
               
            //   var name = $(this).find('[name="name"]').val();
                           
                                 // Retrieve job ID from the hidden input field
                                 var name = $(this).find('[name="name"]').val();
                                 var email = $(this).find('[name="email"]').val(); // Find name within the current form
                                 var password = $(this).find('[name="pass"]').val(); // Find email within the current form
                                 var gender = $(this).find('[name="gender"]').val(); // Find mobile within the current form
                                 var Qualification = $(this).find('[name="Qualification"]').val();
                                 var state = $(this).find('[name="state"]').val();
                                 var city = $(this).find('[name="city"]').val();
                                 var mobile = $(this).find('[name="mobile"]').val();
                          //       var img = $(this).find('[name="img"]')[0].files[0];
                                 
                                 formData.append('name', name);
                                 formData.append('email', email);
                                 formData.append('password', password);
                                 formData.append('gender', gender);
                                 formData.append('Qualification', Qualification);
                                 formData.append('state', state);
                                 formData.append('city', city);
                                 formData.append('mobile', mobile);
                                 formData.append('img', $('#img')[0].files[0]);
                           //      alert(formData);
                                 $.ajax({
                                        url: '/register/', // URL of your API endpoint
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                        
                                        success: function(response) {
                                            document.getElementById('registration-success-message').textContent = response.message;
                                            document.getElementById('registrationForm').reset();
                                            setTimeout(function() {
                                                location.reload();
                                            }, 500);
                                          
                                          
                                        // alert('User created successfully!');
                                            // Optionally, redirect the user to another page
                                        //  window.location.href = '/success_page/';
                                        },
                                        error: function(xhr, status, error) {
                                            //alert(data);


                                            console.error('Failed to create user:', error);
                                        //   alert('Failed to create user. Please try again.');
                                        }
                                    });
        
    

    
            });

            // Form submission
         //   form.submit();
        }
    });
});

// state dropdown

$(document).ready(function() {
    $.ajax({
        url: '/get_states/', // URL of your Django view
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, state) {
                $('#stateDropdown').append('<option value="' + state.id + '">' + state.statename + '</option>');
            });
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch states:', error);
        }
    });
});

//city dropdown

$(document).ready(function() {
    // Event listener for state dropdown change
    $('#stateDropdown').change(function() {
        var stateId = $(this).val();
        
        // AJAX request to fetch cities based on selected state
        $.ajax({
            url: '/get_cities/', // URL of your Django view
            type: 'GET',
            dataType: 'json',
            data: {
                state_id: stateId
            },
            success: function(data) {
                // Clear existing options
                $('#cityDropdown').empty();

                // Append new city options
                $.each(data, function(index, city) {
                    $('#cityDropdown').append('<option value="' + city.id + '">' + city.citynames + '</option>');
                });
            },
            error: function(xhr, status, error) {
                console.error('Failed to fetch cities:', error);
            }
        });
    });
});





$(document).ready(function() {
    $.ajax({
        url: '/get_citydata/', // URL of your Django view
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, city) {
                $('#city').append('<option value="' + city.id + '">' +city.citynames + '</option>');
            });
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch states:', error);
        }
    });
});



$(document).ready(function() {
    $.ajax({
        url: '/get_qualify/', // URL of your Django view
        type: 'GET',
        dataType: 'json',
        success: function(data) {

            $.each(data, function(index, Qualification) {

                $('#qualifyDropdown').append('<option value="' + Qualification.id + '">' + Qualification.Qualification + '</option>');
            });
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch states:', error);
        }
    });
});


$(document).ready(function() {
    $.ajax({
        url: '/get_jobcat/', // URL of your Django view
        type: 'GET',
        dataType: 'json',
        success: function(data) {

            $.each(data, function(index, Job_Category) {

                $('#jobcatdrop').append('<option value="' + Job_Category.id + '">' + Job_Category.title + '</option>');
            });
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch states:', error);
        }
    });
});




$(document).ready(function() {
    $('#email').on('blur', function() {
        var email = $(this).val(); // Get the email input value

        if (email) {
            // Obtain CSRF token from cookie
            var csrftoken = getCookie('csrftoken');

            // Send AJAX request with CSRF token
            $.ajax({
                url: '/validate_email/',
                type: 'POST',
                headers: {'X-CSRFToken': csrftoken}, // Include CSRF token in headers
                data: {'email': email},
                success: function(response) {
                    if (response.valid) {
                        $('#emailError').text(''); // Clear error message if email is valid
                    } else {
                        $('#emailError').text('Email is already taken.'); // Display error message if email is not valid
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
        $('#email').on('focus', function() {
            $('#emailError').hide();
        });
    });
});

// Function to retrieve CSRF token from cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



$(document).ready(function() {
    $('#name').on('blur', function() {
        var name = $(this).val(); // Get the email input value

        if (name) {
            // Obtain CSRF token from cookie
            var csrftoken = getCookie('csrftoken');

            // Send AJAX request with CSRF token
            $.ajax({
                url: '/check_username/',
                type: 'POST',
                headers: {'X-CSRFToken': csrftoken}, // Include CSRF token in headers
                data: {'name': name},
                success: function(response) {
                    if (response.valid) {
                        $('#usernameError').hide(); // Clear error message if email is valid
                    } else {
                        $('#usernameError').text('Username is already taken.'); // Display error message if email is not valid
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
        $('#name').on('focus', function() {
            $('#usernameError').hide();
        });
    });
});

// Function to retrieve CSRF token from cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}




$(document).ready(function() {
    $('#loginform').validate({
        rules: {
            lemail: {
                required: true,
                email: true
            },
            pass: {
                required: true,
            },
        },
        messages: {
            lemail: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            },
            pass: {
                required: "Please enter your password.",
            },
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "lemail") {
                error.appendTo($('#emailError'));
            } else if (element.attr("name") == "pass") {
                error.appendTo($('#passwordError'));
            }
        },
        submitHandler: function(form) {
            $('#loginform').submit(function(e) {
                e.preventDefault(); // Prevent the form from submitting normally
               // var username = $(this).find('[name="name"]').val();
              // var formData = $(this).serialize(); // Serialize form data
               var formData = new FormData(this);
               
               var email = $(this).find('[name="lemail"]').val(); // Find name within the current form
               var password = $(this).find('[name="pass"]').val(); // Find email within the current form
  
               formData.append('email', email);
               formData.append('password', password);
               
                           //      alert(formData);
                                 $.ajax({
                                        url: '/login_view/', // URL of your API endpoint
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                       
                                        success: function(response) {
                                            console.log(response.error);
                                            if (response.message) {
                                                // Append the success message to the login-success-message element
                                                $('#login-success-message').text(response.message).show();
                                                window.location.href = '/profile_page/';
                                            } else if (response.error) {
                                               // alert(response.error);
                                                // Append the error message to the login-error-message element
                                                $('#login-success-message').text(response.error).show();
                                                //     document.getElementById('login-success-message').textContent = response.message;
                                             document.getElementById('loginform').reset();
                                         //    setTimeout(function() {
                                           //    location.reload();
                                           //
                                       //
                                   //}, 500);
                                            }
                                       
                                          
                                          
                                        // alert('User created successfully!');
                                            // Optionally, redirect the user to another page
                                        //  window.location.href = '/success_page/';
                                        },
                                        error: function(xhr, status, error) {
                                            //alert(data);


                                            console.error('Failed to create user:', error);
                                        //   alert('Failed to create user. Please try again.');
                                        }
                                    });
        
    

    
            });
            
        }
    });
});







$(document).ready(function() {
    $('#JobForm').validate({
        rules: {
            title: {
                required: true,
                minlength: 3
            },
            jobcat: {
                required: true
                
            },
            description: {
                required: true
            
            },
            role: {
                required: true
            
            },
            jobsumm: {
                required: true
            },
            skills: {
                required: true
            },
            Qualification:{
                required:true

            },
            state: {
                required: true
            },
            city: {
                required: true
            },
            salary: {
                required: true
                
            },
            job_type: {
                required: true
                
            },
            vacancy: {
                required: true
                
            },
            joindate:{
                required:true
            },
            comp:{
                required:true
            },
            preference:{
                required:true
            },
            compname:{
                required:true
            },

            logo: {
                required: true,
                extension: "jpg|jpeg|png|gif"
            }
          
        },
        messages: {
            title: {
                required: "Please enter your Title.",
                minlength: "Title must be at least 3 characters long."
            },
            jobcat: {
                required: "Please select Job Category "
            
            },
            description: {
                required: "Please enter Job Description."
            },
            role: {
                required: "Please enter Job Role ."
                
            },
            jobsumm: "Please enter Job Summary .",
            skills:"Please enter Skills",
            Qualification: "Please select your qualification.",
            state: "Please select your state.",
            Salary: "Please enter salary.",
            job_type: "Please select Job type.",
            vacancy: "Please enter no of Vacancies.",
            comp: "Please Enter Company Details.",
            preference:"Please Enter Job Preference",
            compname: "Please Enter Company Name",
            joindate: {
                required: "Please select Deadline of Job."
            },
            logo: {
                required: "Please upload your profile picture.",
                extension: "Please upload an image file (jpg, jpeg, png, gif)."
            }
        },

        errorPlacement: function(error, element) {
            // Check the ID of the input element and place the error message accordingly
            if (element.attr("name") == "title") {
                error.appendTo($('#titleError'));
            } else if (element.attr("name") == "jobcat") {
                error.appendTo($('#jobcatError'));
            } else if (element.attr("name") == "description") {
                error.appendTo($('#descriptionError'));
            }else if (element.attr("name") == "role") {
                error.appendTo($('#roleError'));
                
            }else if (element.attr("name") == "jobsumm") {
                error.appendTo($('#jobsummError'));
            }else if (element.attr("name") == "skills") {
                error.appendTo($('#skillsError'));
            }else if (element.attr("name") == "salary") {
                error.appendTo($('#salaryError'));
            }else if (element.attr("name") == "job_type") {
                error.appendTo($('#job_typeError')); 
            }else if (element.attr("name") == "vacancy") {
                error.appendTo($('#vacancyError')); 
            }else if (element.attr("name") == "joindate") {
                error.appendTo($('#joindateError')); 
            }
            else if (element.attr("name") == "comp") {
                error.appendTo($('#compError')); 
            }
            else if (element.attr("name") == "preference") {
                error.appendTo($('#preferenceError')); 
            }
            else if (element.attr("name") == "compname") {
                error.appendTo($('#compnameError')); 
            }
            
            else if (element.attr("name") == "Qualification") {
                error.appendTo($('#qualifyError'));
            } else if (element.attr("name") == "state") {
                error.appendTo($('#stateError'));
            } else if (element.attr("name") == "city") {
                error.appendTo($('#cityError'));
            }  else if (element.attr("name") == "logo") {
                error.appendTo($('#logoError'));
            } 
            
            
            
            
            else {
                // For other fields, use default placement (next to the input element)
                error.insertAfter(element);
              



            }
        },

        submitHandler: function(form) {
            $('#JobForm').submit(function(e) {
                e.preventDefault(); // Prevent the form from submitting normally
               // var username = $(this).find('[name="name"]').val();
               var formData = $(this).serialize(); // Serialize form data

               //     var formData = new FormData(this); // Get form data
                
                    var formData = new FormData(this);
               
            //   var name = $(this).find('[name="name"]').val();
                           
                                 // Retrieve job ID from the hidden input field
                                 var title = $(this).find('[name="title"]').val();
                                 var jobcat = $(this).find('[name="jobcat"]').val(); // Find name within the current form
                                 var desc = $(this).find('[name="description"]').val(); // Find email within the current form
                                 var role = $(this).find('[name="role"]').val(); // Find mobile within the current form 
                                 var jsum = $(this).find('[name="jobsumm"]').val(); 
                                 var skills = $(this).find('[name="skills"]').val(); 
                                 var salary = $(this).find('[name="salary"]').val(); 
                                 var job_type = $(this).find('[name="job_type"]').val(); 
                                 var vacancy = $(this).find('[name="vacancy"]').val();  
                                 var joindate = $(this).find('[name="joindate"]').val();
                                 var comp = $(this).find('[name="comp"]').val();
                                 var compname = $(this).find('[name="compname"]').val();
                                 var preference = $(this).find('[name="preference"]').val();
                                 var Qualification = $(this).find('[name="Qualification"]').val(); 
                                 var state = $(this).find('[name="state"]').val();
                                 var city = $(this).find('[name="city"]').val();

                                 formData.append('title', title);
                                 formData.append('jobcat', jobcat);
                                 formData.append('desc', desc);
                                 formData.append('role', role);
                                 formData.append('jsum', jsum);
                                 formData.append('skills', skills);
                                 formData.append('salary', salary);
                                 formData.append('vacancy', vacancy);
                                 formData.append('joindate', joindate);
                                 formData.append('comp', comp);
                                 formData.append('preference', preference);
                                 formData.append('Qualification', Qualification);
                                 formData.append('state', state);
                                 formData.append('city', city);
                                 formData.append('job_type', job_type);
                                 formData.append('compname', compname);
                                 
                                 formData.append('logo', $('#logo')[0].files[0]);
                           //      alert(formData);
                                 $.ajax({
                                        url: '/add_job/', // URL of your API endpoint
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                        
                                        success: function(response) {
                                            document.getElementById('JobForm').reset();
                                            document.getElementById('registration-success-message').textContent = response.message;
                                          
                                            setTimeout(function() {
                                                location.reload();
                                            }, 100);
                                          
                                          
                                        // alert('User created successfully!');
                                            // Optionally, redirect the user to another page
                                     //    window.location.href = '/joblist/';
                                        },
                                        error: function(xhr, status, error) {
                                            //alert(data);


                                            console.error('Failed to create user:', error);
                                        //   alert('Failed to create user. Please try again.');
                                        }
                                    });
        
    

    
            });

            // Form submission
         //   form.submit();
        }
    });
});



function validateDate() {
    // Get the value of the date picker
    var datePicker = document.getElementById('joindate');
    var selectedDate = datePicker.value;

    // Check if a date is selected
    if (!selectedDate) {
        document.getElementById('joindateError').innerText = "Please select a date.";
        return;
    }

    // Check date format (YYYY-MM-DD)
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(selectedDate)) {
        document.getElementById('joindateError').innerText = "Invalid date format. Please use YYYY-MM-DD format.";
        return;
    }

    // Check if it's a valid date
    var date = new Date(selectedDate);
    if (isNaN(date.getTime())) {
        document.getElementById('joindateError').innerText = "Invalid date. Please enter a valid date.";
        return;
    }

    // Additional validation for specific date range
    var minDate = new Date(); // Example: current date
    var maxDate = new Date("2025-12-31"); // Example: maximum allowed date
    if (date < minDate || date > maxDate) {
        document.getElementById('joindateError').innerText = "Please select a date within the allowed range.";
        return;
    }

    // All validations passed
    document.getElementById('joindateError').innerText = "Date is valid.";
}







$(document).ready(function() {
    $('#applyjob').validate({
        rules: {
            name: {
                required: true,
            
            },
            lang: {
                required: true,
            
            },
            comp:{
                required:true,
             },
            skills: {
                required: true,
            
            },
            cstatus:{
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            mobile: {
                required: true,
                digits: true,
                mobileLength: true
            },
            file:{
                required: true,
            },
            desc:{
                required:true,
        },
        qualification:{
            required:true,
        },
        city:{
            required:true,
        },
        },
        messages: {
            email: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            },
            name: {
                required: "Please enter your Name.",
            },
            lang: {
                required: "Please enter your languages known.",
            },
            skills: {
                required: "Please enter your Skills.",
            },
            comp: {
                required: "Please enter your company Details.",
            
            },
            cstatus:{
                required: "Please enter your company Status.",
            },
            mobile: {
                required: "Please enter your Mobile.",
                digits: "Please enter a valid mobile number.",
            },
            file: {
                required: "Please enter your Resume.",
            },
            desc: {
                required: "Please tell about  yourself.",
            },
            qualification:{
                required: "Please enter  Qualifiaction.",
            },
            city:{
                required: "Please enter  City.",
            },


        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "email") {
                error.appendTo($('#emailError'));
            } else if (element.attr("name") == "name") {
                error.appendTo($('#nameError'));
            }
            else if (element.attr("name") == "mobile") {
                error.appendTo($('#mobileError'));
            }
            else if (element.attr("name") == "file") {
                error.appendTo($('#fileError'));
            }
            else if (element.attr("name") == "desc") {
                error.appendTo($('#descError'));
            } else if (element.attr("name") == "skills") {
                error.appendTo($('#skillsError'));
            } else if (element.attr("name") == "lang") {
                error.appendTo($('#langError'));
            }else if (element.attr("name") == "comp") {
                error.appendTo($('#compError'));
            }else if (element.attr("name") == "cstatus") {
                error.appendTo($('#cstatusError'));
            }else if (element.attr("name") == "qualification") {
                error.appendTo($('#qualifyError'));
            }else if (element.attr("name") == "city") {
                error.appendTo($('#cityError'));
            }


        },
        submitHandler: function(form) {
            $('#applyjob').submit(function(e) {
                e.preventDefault(); // Prevent the form from submitting normally
               // var username = $(this).find('[name="name"]').val();
              // var formData = $(this).serialize(); // Serialize form data
               var formData = new FormData(this);
               
               var email = $(this).find('[name="email"]').val(); // Find name within the current form
               var name = $(this).find('[name="name"]').val(); 
               var mobile = $(this).find('[name="mobile"]').val(); 
             // var name = $(this).find('[name="file"]').val(); 
               var desc = $(this).find('[name="desc"]').val(); // Find email within the current form
               var skills = $(this).find('[name="skills"]').val();
               var qualification = $(this).find('[name="qualification"]').val();
               var city = $(this).find('[name="city"]').val();
               var lang = $(this).find('[name="lang"]').val();
               var comp = $(this).find('[name="comp"]').val();
               var cstatus = $(this).find('[name="cstatus"]').val();
  
               formData.append('enail', email);
               formData.append('name', name);
               formData.append('mobile', mobile);
               formData.append('qualification', qualification);
               formData.append('city', city);
               formData.append('desc', desc);
               formData.append('skills', skills);
               formData.append('lang', lang);
               formData.append('comp', comp);
               formData.append('cstatus', cstatus);
               formData.append('file', $('#file')[0].files[0]);
               
                               //  alert(skills);
                                 $.ajax({
                                        url: '/applied_job/', // URL of your API endpoint
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,                            
                                        success: function(response) {
                                            console.log(response.error);
                                            if (response.message) {
                                                // Append the success message to the login-success-message element
                                                $('#job-success-message').text(response.message).show();
                                                document.getElementById('applyjob').reset();
                                              window.location.href = '/joblist/';
                                            } else if (response.error) {
                                               // alert(response.error);
                                                // Append the error message to the login-error-message element
                                                $('#job-success-message').text(response.error).show();
                                                //     document.getElementById('login-success-message').textContent = response.message;
                                             document.getElementById('applyjob').reset();
                                            // window.location.href = '/view_jobs/';
                                         //    setTimeout(function() {
                                           //    location.reload();
                                           //
                                       //
                                   //}, 500);
                                            }
                                       
                                          
                                          
                                        // alert('User created successfully!');
                                            // Optionally, redirect the user to another page
                                        //  window.location.href = '/success_page/';
                                        },
                                        error: function(xhr, status, error) {
                                            //alert(data);


                                            console.error('Failed to create user:', error);
                                        //   alert('Failed to create user. Please try again.');
                                        }
                                    });
        
    

    
            });
            
        }
    });
});








$(document).ready(function() {
    $('#EditJobForm').validate({
        rules: {
            title: {
                required: true,
                minlength: 3
            },
            jobcat: {
                required: true
                
            },
            description: {
                required: true
            
            },
            role: {
                required: true
            
            },
            jobsumm: {
                required: true
            },
            skills: {
                required: true
            },
            Qualification:{
                required:true

            },
            statee: {
                required: true
            },
            city: {
                required: true
            },
            salary: {
                required: true
                
            },
            job_type: {
                required: true
                
            },
            vacancy: {
                required: true
                
            },
            joindate:{
                required:true
            },
            comp:{
                required:true
            },
            preference:{
                required:true
            },
            compname:{
                required:true
            },

          //  logo: {
            //    required: true,
              //  extension: "jpg|jpeg|png|gif"
           // }
          
        },
        messages: {
            title: {
                required: "Please enter your Title.",
                minlength: "Title must be at least 3 characters long."
            },
            jobcat: {
                required: "Please select Job Category "
            
            },
            description: {
                required: "Please enter Job Description."
            },
            role: {
                required: "Please enter Job Role ."
                
            },
            jobsumm: "Please enter Job Summary .",
            skills:"Please enter Skills",
            Qualification: "Please select your qualification.",
            statee: "Please select your state.",
            Salary: "Please enter salary.",
            job_type: "Please select Job type.",
            vacancy: "Please enter no of Vacancies.",
            comp: "Please Enter Company Details.",
            preference:"Please Enter Job Preference",
            compname: "Please Enter Company Name",
            joindate: {
                required: "Please select Deadline of Job."
            }
          //  logo: {
            //    required: "Please upload your profile picture.",
              //  extension: "Please upload an image file (jpg, jpeg, png, gif)."
           // }
        },

        errorPlacement: function(error, element) {
            // Check the ID of the input element and place the error message accordingly
            if (element.attr("name") == "title") {
                error.appendTo($('#titleError'));
            } else if (element.attr("name") == "jobcat") {
                error.appendTo($('#jobcatError'));
            } else if (element.attr("name") == "description") {
                error.appendTo($('#descriptionError'));
            }else if (element.attr("name") == "role") {
                error.appendTo($('#roleError'));
                
            }else if (element.attr("name") == "jobsumm") {
                error.appendTo($('#jobsummError'));
            }else if (element.attr("name") == "skills") {
                error.appendTo($('#skillsError'));
            }else if (element.attr("name") == "salary") {
                error.appendTo($('#salaryError'));
            }else if (element.attr("name") == "job_type") {
                error.appendTo($('#job_typeError')); 
            }else if (element.attr("name") == "vacancy") {
                error.appendTo($('#vacancyError')); 
            }else if (element.attr("name") == "joindate") {
                error.appendTo($('#joindateError')); 
            }
            else if (element.attr("name") == "comp") {
                error.appendTo($('#compError')); 
            }
            else if (element.attr("name") == "preference") {
                error.appendTo($('#preferenceError')); 
            }
            else if (element.attr("name") == "compname") {
                error.appendTo($('#compnameError')); 
            }
            
            else if (element.attr("name") == "Qualification") {
                error.appendTo($('#qualifyError'));
            } else if (element.attr("name") == "statee") {
                error.appendTo($('#stateError'));
            } else if (element.attr("name") == "city") {
                error.appendTo($('#cityError'));
            }  
            //else if (element.attr("name") == "logo") {
              //  error.appendTo($('#logoError'));
            //} 
            
            
            
            
            else {
                // For other fields, use default placement (next to the input element)
                error.insertAfter(element);
              



            }
        },

        submitHandler: function(form) {
            $('#EditJobForm').submit(function(e) {
                e.preventDefault(); // Prevent the form from submitting normally
               // var username = $(this).find('[name="name"]').val();
               var formData = $(this).serialize(); // Serialize form data

               //     var formData = new FormData(this); // Get form data
                
                    var formData = new FormData(this);
               
            //   var name = $(this).find('[name="name"]').val();
                                var id =  $(this).find('[name="id"]').val();
                                 // Retrieve job ID from the hidden input field
                                 var title = $(this).find('[name="title"]').val();
                                 var jobcat = $(this).find('[name="jobcat"]').val(); // Find name within the current form
                                 var desc = $(this).find('[name="description"]').val(); // Find email within the current form
                                 var role = $(this).find('[name="role"]').val(); // Find mobile within the current form 
                                 var jsum = $(this).find('[name="jobsumm"]').val(); 
                                 var skills = $(this).find('[name="skills"]').val(); 
                                 var salary = $(this).find('[name="salary"]').val(); 
                                 var job_type = $(this).find('[name="job_type"]').val(); 
                                 var vacancy = $(this).find('[name="vacancy"]').val();  
                                 var joindate = $(this).find('[name="joindate"]').val();
                                 var comp = $(this).find('[name="comp"]').val();
                                 var compname = $(this).find('[name="compname"]').val();
                                 var preference = $(this).find('[name="preference"]').val();
                                 var Qualification = $(this).find('[name="Qualification"]').val(); 
                                 var state = $(this).find('[name="statee"]').val();
                                 var city = $(this).find('[name="city"]').val();

                                 formData.append('title', title);
                                 formData.append('jobcat', jobcat);
                                 formData.append('desc', desc);
                                 formData.append('role', role);
                                 formData.append('jsum', jsum);
                                 formData.append('skills', skills);
                                 formData.append('salary', salary);
                                 formData.append('vacancy', vacancy);
                                 formData.append('joindate', joindate);
                                 formData.append('comp', comp);
                                 formData.append('preference', preference);
                                 formData.append('Qualification', Qualification);
                                 formData.append('state', state);
                                 formData.append('city', city);
                                 formData.append('job_type', job_type);
                                 formData.append('compname', compname);
                                 
                                 formData.append('logo', $('#logo')[0].files[0]);
                           //      alert(formData);
                                 $.ajax({
                                        url: '/edit_job/', // URL of your API endpoint
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                        
                                        success: function(response) {
                                            
                                            document.getElementById('edit-success-message').textContent = response.message;
                                            //document.getElementById('EditJobForm').reset();
                                         //   setTimeout(function() {
                                           //     location.reload();
                                           // }, 100);
                                          
                                          
                                        // alert('User created successfully!');
                                            // Optionally, redirect the user to another page
                                        //  window.location.href = '/success_page/';
                                        },
                                        error: function(xhr, status, error) {
                                            //alert(data);


                                            console.error('Failed to create user:', error);
                                        //   alert('Failed to create user. Please try again.');
                                        }
                                    });
        
    

    
            });

            // Form submission
         //   form.submit();
        }
    });
});




$(document).ready(function() {
    $('#testi').validate({
        rules: {
            pro: {
                required: true,
                
            },
            description: {
                required: true,
            },
            name: {
                required: true,
            },
            img: {
                required: true,
            },
        },
        messages: {
            pro: {
                required: "Please enter your Profession.",
            
            },
            description: {
                required: "Please enter your Experience .",
            },
            name: {
                required: "Please enter your Name .",
            },
            img: {
                required: "Please enter your Experience .",
            },
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "pro") {
                error.appendTo($('#proError'));
            } else if (element.attr("name") == "description") {
                error.appendTo($('#descriptionError'));
            }else if (element.attr("name") == "name") {
                error.appendTo($('#titleError'));
            }else if (element.attr("name") == "img") {
                error.appendTo($('#imgError'));
            }
        },
        submitHandler: function(form) {
            $('#testi').submit(function(e) {
                e.preventDefault(); // Prevent the form from submitting normally
               // var username = $(this).find('[name="name"]').val();
              // var formData = $(this).serialize(); // Serialize form data
               var formData = new FormData(this);
               
               var pro = $(this).find('[name="pro"]').val(); // Find name within the current form
               var desc = $(this).find('[name="description"]').val(); // Find email within the current form
               var name = $(this).find('[name="name"]').val(); 
               formData.append('name', name);
               formData.append('pro', pro);
               formData.append('desc', desc);
               formData.append('img', $('#img')[0].files[0]);
               
                           //      alert(formData);
                                 $.ajax({
                                        url: '/add_testi/', // URL of your API endpoint
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                       
                                        success: function(response) {
                                            console.log(response.error);
                                            if (response.message) {
                                                // Append the success message to the login-success-message element
                                                $('#login-success-message').text(response.message).show();
                                               window.location.href = '/';
                                            } else if (response.error) {
                                               // alert(response.error);
                                                // Append the error message to the login-error-message element
                                                $('#login-success-message').text(response.error).show();
                                                //     document.getElementById('login-success-message').textContent = response.message;
                                             document.getElementById('loginform').reset();
                                         //    setTimeout(function() {
                                           //    location.reload();
                                           //
                                       //
                                   //}, 500);
                                            }
                                       
                                          
                                          
                                        // alert('User created successfully!');
                                            // Optionally, redirect the user to another page
                                        //  window.location.href = '/success_page/';
                                        },
                                        error: function(xhr, status, error) {
                                            //alert(data);


                                            console.error('Failed to create user:', error);
                                        //   alert('Failed to create user. Please try again.');
                                        }
                                    });
        
    

    
            });
            
        }
    });
});






$(document).ready(function() {
    // Function to fetch job categories from the server
    function fetchJobCategories() {
        $.ajax({
            type: 'GET',
            url: '/get_jobcat/', // URL to fetch job categories
            success: function(categories) {
                // Populate job category dropdown
                var categoryDropdown = $('#jobCategory');
               // categoryDropdown.empty();
                $.each(categories, function(index, category) {
                //    categoryDropdown.append($('<option></option>').attr('value', category.id).text(category.name));
                    $('#jobCategory').append('<option value="' + category.id + '">' + category.title + '</option>');
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching job categories:', error);
            }
        });
    }

    // Function to fetch locations from the server
    function fetchLocations() {
        $.ajax({
            type: 'GET',
            url: '/get_citydata/', // URL to fetch locations
            success: function(locations) {
                // Populate location dropdown
                var locationDropdown = $('#citydata');
             //   locationDropdown.empty();
                $.each(locations, function(index, location) {
                    $('#citydata').append('<option value="' + location.id + '">' +location.citynames + '</option>');
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching locations:', error);
            }
        });
    }

    // Call functions to fetch job categories and locations
    fetchJobCategories();
    fetchLocations();

    // Submit form handler
    $('#searchForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Capture input values
        var searchTitle = $('#search').val();
        var jobCategory = $('#jobCategory').val();
        var location = $('#citydata').val();

        // Create data object to send in AJAX request
        var searchData = {
            searchTitle: searchTitle,
            jobCategory: jobCategory,
            location: location
        };

        // Send AJAX request
        $.ajax({
            type: 'GET',
            url: '/search_data/',  // URL to your Django view handling the search
            data: searchData,
            success: function(response) {

                

                //window.location.href = '/search_view/'?data=' + JSON.stringify(response);
              //  window.location.href = '/search_view/?data=' + JSON.stringify(response);
                // Process search results
                displaySearchResults(response);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});








// Function to display search results
function displaySearchResults(results) {
    var data = results.data;
    var statelist = results.statelist;
    var citylist = results.citylist;

    $('#joblistdata').hide();
  //  $('#msg').append('<h1 class="text-center mb-5 " >Search Results Job Listing</h1>');
    $('#searchResults').empty(); // Clear previous search results
    // Loop through search results and display them
    if(data.length==0){
        $('#searchResults').append(' <div class="job-item p-4 mb-4"> <div class="row g-4"><h1> No result found</h1>  </div> </div>');
    }
    for (var i = 0; i < data.length; i++) {
        var result = data[i];
        var stateId = result.state; // Assuming 'State' holds the ID of the state
        var sname = ''; // Initialize state name
       var cityid=result.city;
       var cname="";
        // Find the state with the corresponding ID
        for (var j = 0; j < statelist.length; j++) {
            if (statelist[j].id === stateId) {
                sname = statelist[j].statename;
                break; // Exit loop once state is found
            }
        }
        for (var k = 0; k < citylist.length; k++) {
            if (citylist[k].id === cityid) {
                cname = citylist[k].citynames;
                break; // Exit loop once state is found
            }
        }

        // Append search result to the search results container
        //$('#searchResults').append('<p>' + result.title + ', ' + sname + ', ' + cname + ',' + result.job_type + ',' + cname + '</p>');

     
        $('#searchResults').append(`   
        <div class="job-item p-4 mb-4">
            <div class="row g-4">
                <div class="col-sm-12 col-md-8 d-flex align-items-center">
                    <img class="flex-shrink-0 img-fluid border rounded" src="/media/${result.comp_logo}" alt="" style="width: 80px; height: 80px;">
                    <div class="text-start ps-4">
                        <h5 class="mb-3">${result.title}</h5>
                        <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${cname}, ${sname}</span>
                        <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>${result.job_type}</span>
                        <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i>${result.salary}</span>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                    <div class="d-flex mb-3">
                        <a class="btn btn-light btn-square me-3" href=""><i class="far fa-heart text-primary"></i></a>
                        <a class="btn btn-primary" href="/apply_job/${result.id}">Apply Now</a>
                    </div>
                    <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Date Line: ${result.job_closing_date}</small>
                </div>
            </div>
        </div>
    `);








    }

}


$(document).ready(function() {
    // Get CSRF token from cookie
    var csrftoken = Cookies.get('csrftoken');

    // Include CSRF token in AJAX requests
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
});









$(document).ready(function() {
    $.ajax({
        url: '/view_testi/', // URL of your Django view
        type: 'GET',
        dataType: 'json',
        //data: searchData,
        success: function(response) {
            // Iterate over the data and append it to the HTML element
            displaytestimonialResults(response);
           
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch testimonials:', error);
        }
    });
});








function displaytestimonialResults(results) {

    var data = results.data;
    for (var i = 0; i < data.length; i++) {
        var res = data[i];
        console.log(res.about)

        $('#testidata').append('<div class="testimonial-item bg-light rounded p-4">' +
        '<i class="fa fa-quote-left fa-2x text-primary mb-3"></i>' +
        '<p>' + res.about + '</p>' +
        '<div class="d-flex align-items-center">' +
        '<img class="img-fluid flex-shrink-0 rounded" src="/media/' + res.img + '" style="width: 50px; height: 50px;">' +
        '<div class="ps-3">' +
        '<h5 class="mb-1">' + res.name + '</h5>' +
        '<small>' + res.profession + '</small>' +
        '</div>' +
        '</div>' +
        '</div>'
);

}
}




$(document).ready(function() {
    $('#contact').validate({
        rules: {
            name: {
                required: true,
                
            },
            email: {
                required: true,
                email:true,
            },
            subject: {
                required: true,
            },
            message: {
                required: true,
            },
        },
        messages: {
            name: {
                required: "Please enter your Name.",
            
            },
            email: {
                required: "Please enter your email .",
                email:"please enter a valid email address",
            },
            subject: {
                required: "Please enter your Subject .",
            },
            message: {
                required: "Please enter your message .",
            },
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "name") {
                error.appendTo($('#nameError'));
            } else if (element.attr("name") == "email") {
                error.appendTo($('#emailError'));
            }else if (element.attr("name") == "subject") {
                error.appendTo($('#subjectError'));
            }else if (element.attr("name") == "message") {
                error.appendTo($('#messageError'));
            }
        },
        submitHandler: function(form) {
            $('#contact').submit(function(e) {
                e.preventDefault(); // Prevent the form from submitting normally
               // var username = $(this).find('[name="name"]').val();
              // var formData = $(this).serialize(); // Serialize form data
               var formData = new FormData(this);
               
               var name = $(this).find('[name="name"]').val(); // Find name within the current form
               var email = $(this).find('[name="email"]').val(); // Find email within the current form
               var sub = $(this).find('[name="subject"]').val(); 
               var msg = $(this).find('[name="message"]').val(); 
               formData.append('name', name);
               formData.append('email', email);
               formData.append('sub', sub);
               formData.append('msg', msg);
               
                           //      alert(formData);
                                 $.ajax({
                                        url: '/add_contact/', // URL of your API endpoint
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                       
                                        success: function(response) {
                                            console.log(response.error);
                                            if (response.message) {
                                                // Append the success message to the login-success-message element
                                                $('#login-success-message').text(response.message).show();
                                                document.getElementById('contact').reset();
                                           //    window.location.href = '/test/';
                                            } else if (response.error) {
                                               // alert(response.error);
                                                // Append the error message to the login-error-message element
                                                $('#login-success-message').text(response.error).show();
                                                //     document.getElementById('login-success-message').textContent = response.message;
                                             document.getElementById('loginform').reset();
                                         //    setTimeout(function() {
                                           //    location.reload();
                                           //
                                       //
                                   //}, 500);
                                            }
                                       
                                          
                                          
                                        // alert('User created successfully!');
                                            // Optionally, redirect the user to another page
                                        //  window.location.href = '/success_page/';
                                        },
                                        error: function(xhr, status, error) {
                                            //alert(data);


                                            console.error('Failed to create user:', error);
                                        //   alert('Failed to create user. Please try again.');
                                        }
                                    });
        
    

    
            });
            
        }
    });
});





$(document).ready(function() {
    $('#profiledata').validate({
        rules: {
            about: {
                required: true,
                
            },
            edu: {
                required: true,
                
            },
            comp: {
                required: true,
            },
            pro: {
                required: true,
            },
            job: {
                required: true,
            },
            exp: {
                required: true,
            },
        },
        messages: {
            about: {
                required: "Please enter about yourself.",
            
            },
            edu: {
                required: "Please enter your Education dtls .",
            },
            comp: {
                required: "Please enter your company name .",
            },
            pro: {
                required: "Please enter your Designation .",
            },
            exp: {
                required: "Please enter your Experience .",
            },
            job: {
                required: "Please enter your Job Responsibilities .",
            },

        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "about") {
                error.appendTo($('#titleError'));
            } else if (element.attr("name") == "edu") {
                error.appendTo($('#eduError'));
            }else if (element.attr("name") == "comp") {
                error.appendTo($('#cnameError'));
            }else if (element.attr("name") == "pro") {
                error.appendTo($('#proError'));
            }else if (element.attr("name") == "job") {
                error.appendTo($('#jobError'));
            }else if (element.attr("name") == "exp") {
                error.appendTo($('#expError'));
            }
        },
        submitHandler: function(form) {
            $('#profiledata').submit(function(e) {
                e.preventDefault(); // Prevent the form from submitting normally
               // var username = $(this).find('[name="name"]').val();
              // var formData = $(this).serialize(); // Serialize form data
               var formData = new FormData(this);
               
               var about = $(this).find('[name="about"]').val(); // Find name within the current form
               var edu = $(this).find('[name="edu"]').val(); // Find email within the current form
               var comp = $(this).find('[name="comp"]').val(); 
               var pro = $(this).find('[name="pro"]').val(); 
               var job = $(this).find('[name="job"]').val(); 
               var exp = $(this).find('[name="exp"]').val(); 
               var user_id = $(this).find('[name="user_id"]').val();
               formData.append('about', about);
               formData.append('edu', edu);
               formData.append('cname', comp);
               formData.append('pro', pro);
               formData.append('exp', exp);
               formData.append('job', job);
               formData.append('id', user_id);
               
                           //      alert(formData);
                                 $.ajax({
                                        url: '/add_profiledata/', // URL of your API endpoint
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                       
                                        success: function(response) {
                                            console.log(response.error);
                                            if (response.message) {
                                                // Append the success message to the login-success-message element
                                                $('#login-success-message').text(response.message).show();
                                                document.getElementById('contact').reset();
                                           //    window.location.href = '/test/';
                                            } else if (response.error) {
                                               // alert(response.error);
                                                // Append the error message to the login-error-message element
                                                $('#login-success-message').text(response.error).show();
                                                //     document.getElementById('login-success-message').textContent = response.message;
                                             document.getElementById('loginform').reset();
                                         //    setTimeout(function() {
                                           //    location.reload();
                                           //
                                       //
                                   //}, 500);
                                            }
                                       
                                          
                                          
                                        // alert('User created successfully!');
                                            // Optionally, redirect the user to another page
                                        //  window.location.href = '/success_page/';
                                        },
                                        error: function(xhr, status, error) {
                                            //alert(data);


                                            console.error('Failed to create user:', error);
                                        //   alert('Failed to create user. Please try again.');
                                        }
                                    });
        
    

    
            });
            
        }
    });
});