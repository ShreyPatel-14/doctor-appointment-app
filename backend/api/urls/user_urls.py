from django.urls import path
from api.views import user_views as views


urlpatterns = [
    path('register/',views.registerUser,name='register'),
    # path('profile/',views.getUserProfile,name="user_profile"),
    # path('profile/update/',views.updateUserProfile,name="user_profile_update"),
    path('login/', views.logIn, name='logIn'),
    path('logout/',views.logOut,name='logOut'),
    path('specialisation/',views.Specialisation,name='specialisation'),
    path('appointment/',views.Appointments,name='appointment'),
    path('yourappoints/',views.YourAppoints,name='yourappointment'),
    # path('delete/<str:pk>/',views.deleteUser,name="deleteUser"),
    path('cancelappoint/',views.cancelAppoint,name='cancelappoint'),
    path('updatemodal/',views.updateModal,name='updatemodal'),
    path('updateappoint/',views.updateAppoint,name='updateappoint'),
]
