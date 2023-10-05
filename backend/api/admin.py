from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
# Register your models here.\
admin.site.register(Doctor)
admin.site.register(Appointment)
admin.site.register(Profile)
# class CustomUserAdmin(UserAdmin):
#     list_display = ('username', 'email', 'is_doctor', 'is_superuser')
#     list_filter = ('is_doctor', 'is_superuser')
#     fieldsets = (
#         (None, {'fields': ('username', 'email', 'password')}),
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
#         ('Important Dates', {'fields': ('last_login', 'date_joined')}),
#         ('Additional Info', {'fields': ('is_doctor',)}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_superuser', 'is_doctor'),
#         }),
#     )
#     search_fields = ('username', 'email')
#     ordering = ('username',)

# Register your custom user model with the admin site



