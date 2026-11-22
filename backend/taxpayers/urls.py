from django.urls import path
from .views import taxpayer_list

urlpatterns = [
    path("", taxpayer_list, name="taxpayer-list"),
]