# Global Theme Plugin for Wagtail/Django

A professional theme plugin that provides a consistent design system with CSS custom properties for both light and dark themes.

## Features

- CSS custom properties for consistent styling
- Light and dark theme variants
- Dynamic theme switching with JavaScript
- System preference detection
- Local storage persistence
- Template tags for easy integration
- Comprehensive utility classes
- Responsive design tokens

## Advanced Features

For a more advanced theme system with additional features like dynamic content loading, AJAX forms, and scroll effects, see our [Advanced Theme Plugin Documentation](README_ADVANCED.md).

## Installation

1. Add `theme_plugin` to your `INSTALLED_APPS` in Django settings:

```python
INSTALLED_APPS = [
    # ... other apps
    'theme_plugin',
]
```

2. Load the theme tags in your templates:

```html
{% load theme_tags %}
```

3. Include the CSS and JavaScript in your base template:

```html
<head>
    <!-- ... other head content -->
    {% theme_css %}
</head>
<body>
    <!-- ... page content -->
    {% theme_js %}
</body>
```

## Usage

### Theme Toggle Button

To add a theme toggle button to your template:

```html
{% theme_toggle_button %}
```

### Manual Theme Control

You can control the theme programmatically using the global `themeManager` object:

```javascript
// Toggle between light and dark themes
window.themeManager.toggleTheme();

// Set a specific theme
window.themeManager.setTheme('dark');  // or 'light'

// Get the current theme
const currentTheme = window.themeManager.getCurrentTheme();
```

### Demo Page

The plugin includes a demo page to showcase all theme features. Access it at:

```
/theme/demo/
```

## CSS Variables

The plugin defines the following CSS variables:

### Colors
- `--color-primary`: Primary brand color
- `--color-secondary`: Secondary brand color
- `--color-background`: Main background color
- `--color-foreground`: Main text color
- `--color-accent`: Accent color for highlights
- `--color-destructive`: Color for destructive actions
- `--color-muted`: Muted text color
- `--color-success`: Success state color
- `--color-warning`: Warning state color
- `--color-card-background`: Card background color
- `--color-border`: Border color
- `--color-sidebar-background`: Sidebar background color
- `--color-header-background`: Header background color
- `--color-footer-background`: Footer background color
- `--color-chart-primary`: Primary chart color
- `--color-chart-secondary`: Secondary chart color
- `--color-chart-accent`: Chart accent color
- `--color-chart-success`: Success chart color
- `--color-chart-warning`: Warning chart color
- `--color-chart-danger`: Danger chart color

### Typography
- `--font-family-sans`: Default sans-serif font stack
- `--font-family-serif`: Default serif font stack
- `--font-family-mono`: Default monospace font stack
- `--font-size-xs` to `--font-size-6xl`: Font size scale
- `--font-weight-thin` to `--font-weight-black`: Font weight options

### Spacing
- `--spacing-0` to `--spacing-32`: Spacing scale based on 4px unit

### Border Radius
- `--border-radius-none` to `--border-radius-full`: Border radius scale

### Shadows
- `--shadow-none` to `--shadow-2xl`: Shadow scale
- `--shadow-inner`: Inner shadow

### Transitions
- `--transition-default`: Default transition timing
- `--transition-fast`: Fast transition timing
- `--transition-slow`: Slow transition timing

### Z-Index
- `--z-index-dropdown` to `--z-index-tooltip`: Z-index scale

## Utility Classes

The plugin provides utility classes for common styling:

### Colors
- Text colors: `.text-primary`, `.text-secondary`, etc.
- Background colors: `.bg-primary`, `.bg-secondary`, etc.
- Border colors: `.border-primary`, `.border-secondary`, etc.

### Spacing
- Padding: `.p-0`, `.p-1`, `.p-2`, etc.
- Horizontal padding: `.px-0`, `.px-1`, `.px-2`, etc.
- Vertical padding: `.py-0`, `.py-1`, `.py-2`, etc.
- Margin: `.m-0`, `.m-1`, `.m-2`, etc.
- Horizontal margin: `.mx-0`, `.mx-1`, `.mx-2`, etc.
- Vertical margin: `.my-0`, `.my-1`, `.my-2`, etc.

### Typography
- Font sizes: `.text-xs`, `.text-sm`, `.text-base`, etc.
- Font weights: `.font-thin`, `.font-light`, `.font-normal`, etc.

### Borders & Radius
- Borders: `.border`
- Border radius: `.rounded-sm`, `.rounded`, `.rounded-lg`, etc.

### Shadows
- Shadows: `.shadow-xs`, `.shadow-sm`, `.shadow`, etc.

### Transitions
- Transitions: `.transition`, `.transition-fast`, `.transition-slow`

### Z-Index
- Z-index: `.z-dropdown`, `.z-modal`, `.z-tooltip`, etc.

## Events

The theme system dispatches a `themechange` event when the theme changes:

```javascript
window.addEventListener('themechange', function(e) {
    console.log('Theme changed to:', e.detail);
    
    // Update any custom elements that need theme-specific styling
    document.querySelectorAll('.custom-element').forEach(el => {
        el.classList.toggle('dark-mode', e.detail === 'dark');
    });
});
```

## Customization

To customize the theme colors, you can override the CSS variables in your own stylesheet:

```css
:root {
    --color-primary: #your-custom-color;
    --font-family-sans: 'Your Custom Font', sans-serif;
}
```

For dark theme overrides:

```css
[data-theme="dark"],
.dark {
    --color-primary: #your-dark-color;
    --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.6);
}
```

## JavaScript API

The theme manager provides a global API for theme control:

```javascript
// Get the theme manager instance
const themeManager = window.themeManager;

// Get current theme
const currentTheme = themeManager.getCurrentTheme(); // 'light' or 'dark'

// Set theme
themeManager.setTheme('dark');

// Toggle theme
themeManager.toggleTheme();

// Listen for theme changes
window.addEventListener('themechange', (event) => {
    console.log('Theme changed to:', event.detail);
});
```

## Accessibility

The theme plugin follows accessibility best practices:

- Proper contrast ratios between text and background colors
- Focus indicators for interactive elements
- Semantic HTML in template tags
- ARIA attributes where appropriate

The theme toggle button includes:
- Proper aria-label for screen readers
- Focus management
- Keyboard navigation support

## Browser Support

The theme plugin works in all modern browsers that support:
- CSS custom properties (CSS variables)
- localStorage API
- classList API
- CustomEvents

This includes:
- Chrome 49+
- Firefox 36+
- Safari 9.1+
- Edge 15+
- Opera 36+

## Advanced Features

For documentation on the advanced features of this plugin, including dynamic content loading, AJAX forms, and scroll effects, please see [README_ADVANCED.md](README_ADVANCED.md).