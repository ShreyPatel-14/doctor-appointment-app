# Django Import 
from datetime import datetime
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth import login,logout,authenticate
# Rest Framework Import
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from django.contrib.auth.hashers import check_password

# Local Import 
from api.models import *
from api.serializers import *

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        # User.objects.get(username="Henil").delete()
        # User.objects.get(username="Shrey").delete()
        # User.objects.get(username="Mansi").delete()
        user_2=User.objects.filter(email=data['email'])
        print(user_2)
        if len(user_2)==0:
            user_1 =User.objects.create(
                username=data['name'],
                email=data['email'],
                password=make_password(data['password']),
            )
            Profile.objects.create(
                user=user_1
            )
            serializer = UserSerializer(user_1, many=False)
            return Response({"message":"sign up","data":serializer.data})
        
        else:
            return Response({'detail':"Email ID is Already Registered"})
    except Exception as e:
        message = {"detail": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])
def logIn(request):
    data=request.data
    Email=data['email']
    password=data['password']
    print(Email,password)
    user_1 = User.objects.get(email=Email)
    profile = Profile.objects.get(user=user_1)
    print(user_1)
    if user_1 is None:
        return Response({"error_mail":"Username does not match"})
    elif check_password(password,user_1.password):
        login(request,user_1)
        return Response({"message":"Sign In successfully","getid":profile.pk,"getemail":user_1.email,"isdoctor":profile.is_doctor})
    else:
        return Response({"error_password":"Password does not match"})
    
@api_view(['POST'])
def logOut(request):
    logout(request)
    return Response({"message":"Logout Succesfully"})

@api_view(['POST'])
def Specialisation(request):
    try:
        data=request.data
        arr=["12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM"]
        special=data['specialisation']
        select_date=data['selected_date']
        date_1=datetime.strptime(select_date,'%Y-%m-%d')
        slot=Appointment.objects.filter(specialisation_1=special,date=date_1)
        doctor=Doctor.objects.filter(specialisation=special)
        if not slot:
            return Response({"avails_slot":arr,"message":"slots find succesfully","doct_name":doctor[0].name,"doct_id":doctor[0].pk})
        for i in slot:
            if i.time_slot in arr:
                arr.remove(i.time_slot)
        return Response({"avails_slot":arr,"message":"slots find succesfully","doct_name":doctor[0].name,"doct_id":doctor[0].pk})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def Appointments(request):
    try:
        data = request.data
        required_fields = ['email', 'firstname', 'lastname', 'gender', 'age', 'weight', 'contact', 'address', 'date', 'specialisation', 'doctor_name', 'status_bit', 'visited_bit', 'time_slot']

        for field in required_fields:
            if field not in data:
                return Response({"error": f"Field '{field}' is missing in the request data."}, status=status.HTTP_400_BAD_REQUEST)

        user_1 = User.objects.filter(email=data['email'])
        doctor_1 = Doctor.objects.filter(specialisation=data['specialisation'], name=data['doctor_name'])
        
        # Create the Appointment object
        appoint = Appointment.objects.create(
            user=user_1[0],
            doctor=doctor_1[0],
            firstname=data['firstname'],
            lastname=data['lastname'],
            gender=data['gender'],
            age=data['age'],
            weight=data['weight'],
            contact=data['contact'],
            address=data['address'],
            date=data['date'],
            specialisation_1=data['specialisation'],
            doctor_name=data['doctor_name'],
            status_bit=data['status_bit'],
            visited_bit=data['visited_bit'],
            time_slot=data['time_slot'],
        )
        
        # Serialize the created Appointment object
        serializer = AppointmentSerializer(appoint, many=False)
        return Response({"message": "Stored Successfully", "data": serializer.data})

    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def YourAppoints(request):
    try:
        data=request.data
        Email=data['email']
        user_1=User.objects.filter(email=Email)
        print(user_1)
        appoints=Appointment.objects.filter(user=user_1[0]).order_by("-date")
        history=AppointmentSerializer(appoints,many=True)
        print(history)
        return Response({"message":"succesfully got data","history":history.data})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def cancelAppoint(request):
    try:
        data=request.data
        appoint=Appointment.objects.get(id=data['appoint_id'])
        appoint.status_bit=0
        appoint.save()
        return Response({"message":"succesfully got data"})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def updateModal(request):
    try:
        data=request.data
        arr=["12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM"]
        slot=Appointment.objects.filter(doctor_name=data['doctor'],date=data['date'])
        
        if not slot:
            return Response({"avails_slot":arr,"message":"slots find succesfully"})
        for i in slot:
            if i.time_slot in arr:
                arr.remove(i.time_slot)
        return Response({"avails_slot":arr,"message":"slots find succesfully"})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def updateAppoint(request):
    try:
        data=request.data
        appoint=Appointment.objects.get(id=data['appoint_id'])
        appoint.date=data['date']
        appoint.time_slot=data['time_slot']
        appoint.save()
        return Response({"message":"slots find succesfully"})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
    
    


    
        
        
        
    
    
    
    

    
