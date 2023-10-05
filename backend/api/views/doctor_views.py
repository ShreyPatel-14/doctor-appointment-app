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
from datetime import time
# Local Import 
from api.models import *
from api.serializers import *



@api_view(['POST'])
def Doctor_appointment(request):
    try:
        data=request.data
        user_1=Doctor.objects.filter(email=data['doctor_mail'])

        appoints=Appointment.objects.filter(doctor=user_1[0],date=data['date'])
        appoint=AppointmentSerializer(appoints,many=True)
        return Response({"message":"doctor data found succesfully","appoint":appoint.data})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def Change_data(request):
    try:
        data=request.data
        print(data)
        
        appoint=Appointment.objects.get(id=data['p_id'])
        appoint.visited_bit=data['v_bit']
        appoint.save()
        return Response({"message":"slots find succesfully"})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def dashboard(request):
    try:
        data=request.data
        Email=data['doctor_mail']
        date_1=data['date']
        Doctor_1 = Doctor.objects.filter(email=Email)
        appoints = Appointment.objects.filter(doctor=Doctor_1[0],date__lte=date_1).order_by('-date') 
        history=AppointmentSerializer(appoints,many=True)
        return Response({"message":"succesfully got data","name":history.data})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
        