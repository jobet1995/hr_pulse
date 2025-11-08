# Advanced Theme Plugin for Wagtail/Django

A professional, feature-rich theme system for Wagtail/Django with dark/light mode, dynamic content loading, and smooth animations.

## Features

### 1. CSS Theme Variables
- Comprehensive CSS custom properties for colors, typography, spacing, and more
- Light (default) and dark theme variants
- Smooth transitions between themes
- Responsive design defaults for mobile, tablet, and desktop
- Utility classes for consistent styling

### 2. Dark/Light Mode Toggle
- JavaScript toggle that adds/removes a `.dark` class on the `<body>`
- Theme persistence via localStorage and optional API calls
- Dynamic CSS variable updates with smooth visual transitions
- CSRF token utility function for secure API calls

### 3. Typography & Layout
- Global typography system for all HTML elements
- Responsive font scaling and line heights
- Spacing and radius variables for consistent design
- Utility classes for quick styling

### 4. Dynamic Section Loader
- AJAX-powered content loading from JSON API endpoints
- Scroll reveal animations via IntersectionObserver
- Retry logic for failed API calls
- Error handling and logging

### 5. Sticky Navbar & Scroll Utilities
- Sticky navbar with scroll effects
- Smooth scrolling for anchor links
- Back-to-top button with visibility control
- Active section highlighting

### 6. AJAX Forms & Modals
- AJAX-powered forms with validation and feedback
- Dynamic modal content loading
- Multiple close methods (button, overlay, Escape key)

### 7. Performance & Utility
- Debounced scroll events for better performance
- IntersectionObserver helpers for animations
- Retry logic for AJAX requests
- Clean, modular, and professional code

## Installation

1. Add `theme_plugin` to your `INSTALLED_APPS` in Django settings:

```python
INSTALLED_APPS = [
    # ... other apps
    'theme_plugin',
]
```

2. Include the plugin URLs in your main `urls.py`:

```python
from django.urls import path, include

urlpatterns = [
    # ... other patterns
    path('theme/', include('theme_plugin.urls')),
]
```

3. Load the theme tags in your templates:

```html
{% load theme_tags %}
```

4. Include the CSS and JavaScript in your base template:

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

### Back-to-Top Button

To add a back-to-top button:

```html
{% back_to_top_button %}
```

### Dynamic Sections

To create a section that loads content dynamically:

```html
<section data-section-api="/api/your-endpoint/">
  <div class="text-center py-12">
    <div class="spinner"></div>
    <p>Loading content...</p>
  </div>
</section>
```

### AJAX Forms

To create an AJAX form:

```html
<form data-ajax data-reset>
  <!-- form fields -->
  <button type="submit">Submit</button>
</form>
```

### Modals

To create a modal that loads content dynamically:

```html
<button data-modal-target="your-modal-id">Open Modal</button>

<div id="your-modal-id" class="modal" data-api="/api/modal-content/">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Modal Title</h3>
      <button data-modal-close>×</button>
    </div>
    <div class="modal-body">
      <!-- Content will be loaded here -->
    </div>
    <div class="modal-footer">
      <button data-modal-close>Close</button>
    </div>
  </div>
</div>
```

## CSS Variables

The plugin defines comprehensive CSS variables for theming:

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

### Component Colors
- `--color-card-background`: Card background color
- `--color-border`: Border color
- `--color-sidebar-background`: Sidebar background color
- `--color-header-background`: Header background color
- `--color-footer-background`: Footer background color
- `--color-navbar-background`: Navbar background color
- `--color-modal-background`: Modal background color
- `--color-popover-background`: Popover background color

### Chart Colors
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
- `--line-height-none` to `--line-height-loose`: Line height options

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

### Breakpoints
- `--breakpoint-sm`: 640px
- `--breakpoint-md`: 768px
- `--breakpoint-lg`: 1024px
- `--breakpoint-xl`: 1280px
- `--breakpoint-2xl`: 1536px

## Utility Classes

The plugin provides extensive utility classes:

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

## JavaScript API

The theme manager provides a global API for advanced functionality:

```javascript
// Get the theme manager instance
const themeManager = window.advancedThemeManager;

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

// Get CSRF token
const csrfToken = themeManager.getCsrfToken();
```

## API Endpoints

The plugin includes several API endpoints for demo purposes:

- `/theme/api/features/`: Returns features data
- `/theme/api/benefits/`: Returns benefits data
- `/theme/api/stats/`: Returns statistics data
- `/theme/api/modal-content/`: Returns modal content

## Customization

To customize the theme, you can override CSS variables in your own stylesheet:

```css
:root {
    --color-primary: #your-custom-color;
    --font-family-sans: 'Your Custom Font', sans-serif;
}

[data-theme="dark"],
.dark {
    --color-primary: #your-dark-color;
    --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.6);
}
```

## Browser Support

The theme plugin works in all modern browsers that support:
- CSS custom properties (CSS variables)
- localStorage API
- classList API
- CustomEvents
- IntersectionObserver
- Fetch API

This includes:
- Chrome 49+
- Firefox 36+
- Safari 9.1+
- Edge 15+
- Opera 36+

## Accessibility

The theme plugin follows accessibility best practices:
- Proper contrast ratios between text and background colors
- Focus indicators for interactive elements
- Semantic HTML structure
- ARIA attributes where appropriate
- Keyboard navigation support

## Performance

The plugin is optimized for performance:
- Efficient CSS with minimal repaints
- Debounced scroll events
- Lazy loading of dynamic content
- Optimized JavaScript with minimal DOM manipulation