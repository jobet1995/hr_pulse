from django.test import TestCase
from django.urls import reverse


class ThemePluginTestCase(TestCase):
    """Test cases for the theme plugin"""

    def test_theme_demo_view(self):
        """Test that the theme demo view loads correctly"""
        url = reverse('theme_plugin:theme_demo')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Advanced Theme Plugin')

    def test_theme_demo_function_view(self):
        """Test that the function-based theme demo view loads correctly"""
        url = reverse('theme_plugin:theme_demo_function')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Advanced Theme Plugin')