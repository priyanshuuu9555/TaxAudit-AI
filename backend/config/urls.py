from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/taxpayers/",
        include("taxpayers.urls")
    ),

    path(
        "api/predictions/",
        include("predictions.urls")
    ),
]