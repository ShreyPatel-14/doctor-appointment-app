from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinLengthValidator,MaxLengthValidator
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
# Create your models here.
 
class Doctor(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    email = models.EmailField()
    gender = models.CharField(max_length=10)
    contact = models.CharField(max_length=10)
    specialisation = models.CharField(max_length=50)    
    
    def __str__(self):
        return self.name +" " + self.specialisation
    
class Appointment(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    doctor= models.ForeignKey(Doctor,on_delete=models.CASCADE)
    firstname = models.CharField(max_length=40)
    lastname = models.CharField(max_length=40)
    gender = models.CharField(max_length=10)
    age = models.IntegerField(default=0)
    weight = models.FloatField()
    contact = models.CharField(max_length=10)
    address = models.TextField()
    date=models.DateField()
    specialisation_1 = models.CharField(max_length=40)
    doctor_name=models.CharField(max_length=40)
    status_bit=models.IntegerField(default=1)
    visited_bit=models.IntegerField(default=0)
    time_slot=models.CharField(max_length=20)

    def __str__(self):
        return self.firstname +" " + self.lastname
    
class Profile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    is_doctor=models.BooleanField(default=False)
    
    def __str__(self):
        return self.user.username
    
    