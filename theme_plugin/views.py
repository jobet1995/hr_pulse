from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import JsonResponse


class ThemeDemoView(TemplateView):
    """
    A demo view to showcase the theme plugin functionality
    """
    template_name = 'advanced_theme_demo.html'


def theme_demo(request):
    """
    Function-based view to showcase the theme plugin functionality
    """
    return render(request, 'advanced_theme_demo.html')


def features_api(request):
    """
    API endpoint for features data
    """
    features = [
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path></svg>",
            "title": "Dark/Light Theme",
            "description": "Seamlessly toggle between dark and light themes with smooth transitions."
        },
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><line x1='12' y1='8' x2='12' y2='12'></line><line x1='12' y1='16' x2='12.01' y2='16'></line></svg>",
            "title": "Dynamic Loading",
            "description": "Load content dynamically via AJAX with retry logic and error handling."
        },
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path><circle cx='9' cy='7' r='4'></circle><path d='M23 21v-2a4 4 0 0 0-3-3.87'></path><path d='M16 3.13a4 4 0 0 1 0 7.75'></path></svg>",
            "title": "Responsive Design",
            "description": "Fully responsive design that works on all device sizes."
        }
    ]
    return JsonResponse(features, safe=False)


def benefits_api(request):
    """
    API endpoint for benefits data
    """
    benefits = [
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='22 12 18 12 15 21 9 3 6 12 2 12'></polyline></svg>",
            "title": "Improved Performance",
            "description": "Optimized code with efficient loading and caching strategies."
        },
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'></path></svg>",
            "title": "Enhanced Security",
            "description": "Built-in CSRF protection and secure data handling."
        },
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'></path><line x1='12' y1='17' x2='12.01' y2='17'></line></svg>",
            "title": "Easy Customization",
            "description": "Simple to customize and extend with your own styles and functionality."
        }
    ]
    return JsonResponse(benefits, safe=False)


def stats_api(request):
    """
    API endpoint for stats data
    """
    stats = [
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 8h1a4 4 0 0 1 0 8h-1'></path><path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z'></path><line x1='6' y1='1' x2='6' y2='4'></line><line x1='10' y1='1' x2='10' y2='4'></line><line x1='14' y1='1' x2='14' y2='4'></line></svg>",
            "title": "99.9% Uptime",
            "description": "Reliable performance with minimal downtime."
        },
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path><circle cx='9' cy='7' r='4'></circle><path d='M23 21v-2a4 4 0 0 0-3-3.87'></path><path d='M16 3.13a4 4 0 0 1 0 7.75'></path></svg>",
            "title": "10K+ Users",
            "description": "Trusted by thousands of satisfied users."
        },
        {
            "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon></svg>",
            "title": "4.9 Rating",
            "description": "Highly rated by our user community."
        }
    ]
    return JsonResponse(stats, safe=False)


def modal_content_api(request):
    """
    API endpoint for modal content
    """
    content = """
    <h4 class='text-xl font-semibold mb-4'>Modal Content</h4>
    <p class='mb-4'>This content was loaded dynamically via AJAX. The modal system supports:</p>
    <ul class='list-disc pl-6 mb-4'>
        <li>Dynamic content loading</li>
        <li>Multiple close methods</li>
        <li>Keyboard navigation</li>
        <li>Responsive design</li>
    </ul>
    <p>Try closing this modal by clicking the X, the Close button, clicking outside, or pressing Escape.</p>
    """
    return JsonResponse({'content': content})