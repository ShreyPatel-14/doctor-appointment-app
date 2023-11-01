from django.urls import path
from api.views import doctor_views as views

urlpatterns = [
    path('dashboard/',views.dashboard,name='dashboard'),
    path('appoints_data/',views.Doctor_appointment,name='doctor_appointment'),
    path('change_data/',views.Change_data,name='change_data'),
    path('rejectappoint/',views.Reject_App,name='reject_appointment'),
    # path('profile/',views.getUserProfile,name="user_profile"),
    # path('profile/update/',views.updateUserProfile,name="user_profile_update"),
]
