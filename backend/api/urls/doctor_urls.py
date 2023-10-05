from django.urls import path
from api.views import doctor_views as views


urlpatterns = [
    path('appoints_data/',views.Doctor_appointment,name='doctor_appointment'),
    path('change_data/',views.Change_data,name='change_data'),
    path('dashboard/',views.dashboard,name='dashboard'),
]
