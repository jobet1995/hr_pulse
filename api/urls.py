from django.urls import path
from .views import FeaturesAPIView, BenefitsAPIView, StatsAPIView, ThemeAPIView

urlpatterns = [
    path('features/', FeaturesAPIView.as_view(), name='api_features'),
    path('benefits/', BenefitsAPIView.as_view(), name='api_benefits'),
    path('stats/', StatsAPIView.as_view(), name='api_stats'),
    path('theme/', ThemeAPIView.as_view(), name='api_theme'),
]