from django.urls import path
from .views import predict_risk

urlpatterns = [
    path(
        "<str:taxpayer_id>/",
        predict_risk,
        name="predict-risk"
    ),
]