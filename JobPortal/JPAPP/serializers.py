# serializers.py

from rest_framework import serializers
from JPAPP.models import Userstbl

#class UserSerializer(serializers.ModelSerializer):
   # class Meta:
      #  model = Userstbl
     #   fields = ('username', 'email', 'password', 'mobile', 'state', 'city', 'profile_pic', 'gender')
        # You may need to add extra_kwargs for password field to handle write-only serialization


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userstbl
        fields = '__all__'
