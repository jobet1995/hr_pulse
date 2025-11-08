from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

# Sample data for features and benefits
FEATURES_DATA = [
    {
        "icon": "💡",
        "title": "Innovative Solutions",
        "description": "Cutting-edge HR technology to streamline your processes"
    },
    {
        "icon": "📊",
        "title": "Data Analytics",
        "description": "Gain valuable insights with our advanced analytics dashboard"
    },
    {
        "icon": "🔒",
        "title": "Secure Platform",
        "description": "Enterprise-grade security to protect your sensitive data"
    },
    {
        "icon": "📱",
        "title": "Mobile Friendly",
        "description": "Access HR tools anytime, anywhere on any device"
    }
]

BENEFITS_DATA = [
    {
        "icon": "⏱️",
        "title": "Time Saving",
        "description": "Automate repetitive tasks and focus on strategic initiatives"
    },
    {
        "icon": "💰",
        "title": "Cost Effective",
        "description": "Reduce operational costs with our efficient solutions"
    },
    {
        "icon": "👥",
        "title": "Employee Satisfaction",
        "description": "Improve workplace experience and boost engagement"
    },
    {
        "icon": "📈",
        "title": "Performance Growth",
        "description": "Track and enhance team productivity effectively"
    }
]

class FeaturesAPIView(View):
    def get(self, request):
        return JsonResponse(FEATURES_DATA, safe=False)

class BenefitsAPIView(View):
    def get(self, request):
        return JsonResponse(BENEFITS_DATA, safe=False)

class StatsAPIView(View):
    def get(self, request):
        stats_data = [
            {"value": 150, "label": "Clients"},
            {"value": 98, "label": "Satisfaction"},
            {"value": 24, "label": "Countries"},
            {"value": 2500, "label": "Employees"}
        ]
        return JsonResponse(stats_data, safe=False)

class ThemeAPIView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request):
        # In a real application, you would save the theme preference to the user's session or database
        try:
            data = json.loads(request.body)
            theme = data.get('theme', 'light')
            # Here you would typically save the theme preference
            return JsonResponse({'success': True, 'message': f'Theme set to {theme}'})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON'}, status=400)