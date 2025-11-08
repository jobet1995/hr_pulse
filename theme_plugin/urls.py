from django.urls import path
from .views import (
    ThemeDemoView, 
    theme_demo,
    features_api,
    benefits_api,
    stats_api,
    modal_content_api
)

app_name = 'theme_plugin'

urlpatterns = [
    path('demo/', ThemeDemoView.as_view(), name='theme_demo'),
    path('demo-function/', theme_demo, name='theme_demo_function'),
    path('api/features/', features_api, name='features_api'),
    path('api/benefits/', benefits_api, name='benefits_api'),
    path('api/stats/', stats_api, name='stats_api'),
    path('api/modal-content/', modal_content_api, name='modal_content_api'),
]