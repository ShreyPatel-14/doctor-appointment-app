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
from django.db.models import Q

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Local Import 
from api.models import *
from api.serializers import *

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
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
    try:
        user_1 = User.objects.get(email=Email)
    except User.DoesNotExist:
        return Response({"error_mail":"Username does not match"})
    profile = Profile.objects.get(user=user_1)
    print(user_1)
    if check_password(password,user_1.password):
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
        # slot=Appointment.objects.filter(specialisation_1=special,date=date_1,status_bit=0)
        slot = Appointment.objects.filter(Q(specialisation_1=special) & Q(date=date_1) & (Q(status_bit=1) | Q(status_bit=2) )).order_by("-date")
        print(slot)
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
        smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
        smtp_server.starttls()
        smtp_server.login("healixpvtltd@gmail.com", "gafl wpuh nbnr fovu")

        sender_email = "healixpvtltd@gmail.com"
        receiver_email = data['email']
        subject = "Confirmation of Your Scheduled Appointment"
        
        message = MIMEMultipart("alternative")
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject
        
        html = f"<html><body><p>Dear {data['firstname']},<br><br>We are writing to confirm that your appointment has been successfully scheduled and is set for the following date and time:<br><br>Date: {data['date']}<br>Time: {data['time_slot']}<br>Doctor: {data['doctor_name']}<br><br>We understand the importance of your appointment and want to ensurethat all necessary arrangements have been made to accommodate your needs.<br><br>If you have any questions or need to make any changes to your appointment, please do not hesitate to contact us at +91 1234567890. Our team is here to assist you and will be happy to address any concerns you may have.<br><br>We look forward to serving you and providing you with the best possible experience during your appointment. Thank you for choosing our services, and we appreciate the opportunity to assist you.<br><br>Best Regards,<br><br>Healix<br>+91 1234567890</p></body></html>"
        part = MIMEText(html, "html")
        message.attach(part)
        smtp_server.sendmail(sender_email, receiver_email, message.as_string())
        smtp_server.quit()
        
        return Response({"message": "Stored Successfully"})

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
        # appoints = Appointment.objects.filter(Q(user=user_1[0]) & (Q(status_bit=0) | Q(status_bit=2) )).order_by("-date")
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
        slot = Appointment.objects.filter(Q(doctor_name=data['doctor']) & Q(date=data['date']) & (Q(status_bit=1) | Q(status_bit=2) )).order_by("-date")
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
        return Response({"message":"date & slots updated succesfully"})
    except Exception as e:
        message = {"error": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)