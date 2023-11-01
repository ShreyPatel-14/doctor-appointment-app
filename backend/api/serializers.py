from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from .models import *
# from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    # name= serializers.SerializerMethodField(read_only=True)
    # _id = serializers.SerializerMethodField(read_only=True)
    # isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','email','password','username']
        
class AppointmentSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    # name= serializers.SerializerMethodField(read_only=True)
    # _id = serializers.SerializerMethodField(read_only=True)
    # isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Appointment
        fields = ['id','firstname','lastname','gender','age','weight','contact','address','date','specialisation_1','doctor_name','status_bit','visited_bit','time_slot']
        

    