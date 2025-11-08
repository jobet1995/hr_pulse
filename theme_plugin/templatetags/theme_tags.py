from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def theme_css():
    """
    Template tag to include the theme CSS file
    """
    return mark_safe(
        f'<link rel="stylesheet" type="text/css" href="{settings.STATIC_URL}css/advanced_theme.css">'
    )


@register.simple_tag
def theme_js():
    """
    Template tag to include the theme JavaScript file
    """
    return mark_safe(
        f'<script src="{settings.STATIC_URL}js/advanced_theme.js"></script>'
    )


@register.simple_tag
def theme_toggle_button():
    """
    Template tag to render a theme toggle button
    """
    return mark_safe('''
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path id="theme-toggle-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </button>
    ''')


@register.simple_tag
def back_to_top_button():
    """
    Template tag to render a back-to-top button
    """
    return mark_safe('''
        <button class="back-to-top" aria-label="Back to top">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    ''')


@register.simple_tag
def theme_classes():
    """
    Template tag to add theme-related classes to the body element
    """
    return mark_safe('class="theme-plugin"')