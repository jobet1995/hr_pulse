/**
 * Advanced Theme Plugin JavaScript
 * Provides theme management, dynamic content loading, and UI enhancements
 */

class AdvancedThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.csrfToken = this.getCsrfToken();
    this.init();
  }

  /**
   * Initialize the theme manager
   */
  init() {
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupDynamicSections();
    this.setupAjaxForms();
    this.setupModals();
  }

  /**
   * Get CSRF token from meta tag
   * @returns {string|null} CSRF token or null if not found
   */
  getCsrfToken() {
    const tokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
    return tokenElement ? tokenElement.value : null;
  }

  /**
   * Get the stored theme from localStorage
   * @returns {string|null} The stored theme or null if not found
   */
  getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      console.warn('Could not access localStorage for theme', e);
      return null;
    }
  }

  /**
   * Get the system theme preference
   * @returns {string} 'dark' or 'light'
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Store the theme preference in localStorage
   * @param {string} theme - The theme to store
   */
  storeTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Could not store theme in localStorage', e);
    }
  }

  /**
   * Apply the specified theme
   * @param {string} theme - The theme to apply ('light' or 'dark')
   */
  applyTheme(theme) {
    this.currentTheme = theme;
    
    // Apply theme to document element
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
    
    // Optionally persist theme via API
    this.persistThemeViaAPI(newTheme);
  }

  /**
   * Persist theme via API call
   * @param {string} theme - The theme to persist
   */
  persistThemeViaAPI(theme) {
    // Example API call - replace with your actual endpoint
    /*
    if (this.csrfToken) {
      fetch('/api/theme/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': this.csrfToken
        },
        body: JSON.stringify({ theme: theme })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to persist theme');
        }
        return response.json();
      })
      .then(data => {
        console.log('Theme persisted successfully:', data);
      })
      .catch(error => {
        console.error('Error persisting theme:', error);
      });
    }
    */
  }

  /**
   * Set a specific theme
   * @param {string} theme - The theme to set ('light' or 'dark')
   */
  setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      this.applyTheme(theme);
      this.storeTheme(theme);
      this.persistThemeViaAPI(theme);
    }
  }

  /**
   * Get the current theme
   * @returns {string} The current theme ('light' or 'dark')
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Set up event listeners for theme changes
   */
  setupEventListeners() {
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only apply system theme if user hasn't explicitly set a theme
        if (!this.getStoredTheme()) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(newTheme);
        }
      });
    }
    
    // Listen for theme toggle button clicks
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  /**
   * Set up scroll effects for navbar and back-to-top button
   */
  setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    // Debounce function to limit scroll event frequency
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
    
    // Handle scroll events
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Navbar effects
      if (navbar) {
        if (scrollPosition > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      
      // Back to top button
      if (backToTop) {
        if (scrollPosition > 300) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      }
    };
    
    // Add scroll event listener with debounce
    window.addEventListener('scroll', debounce(handleScroll, 10));
    
    // Back to top button click handler
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - (navbar ? navbar.offsetHeight : 0),
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Set up dynamic sections loading
   */
  setupDynamicSections() {
    // Load sections when they come into view
    const sections = document.querySelectorAll('[data-section-api]');
    
    if (sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            const apiEndpoint = section.getAttribute('data-section-api');
            
            if (apiEndpoint) {
              this.loadSectionContent(section, apiEndpoint);
              observer.unobserve(section); // Stop observing once loaded
            }
          }
        });
      }, {
        rootMargin: '50px' // Load 50px before entering viewport
      });
      
      sections.forEach(section => {
        observer.observe(section);
      });
    }
  }

  /**
   * Load section content from API
   * @param {HTMLElement} section - The section element to populate
   * @param {string} apiEndpoint - The API endpoint to fetch data from
   */
  loadSectionContent(section, apiEndpoint) {
    section.classList.add('loading');
    
    // Retry logic for API calls
    const fetchWithRetry = (url, options = {}, retries = 3) => {
      return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => {
          if (retries > 0) {
            console.warn(`Retrying API call (${retries} retries left):`, error);
            return new Promise(resolve => setTimeout(resolve, 1000))
              .then(() => fetchWithRetry(url, options, retries - 1));
          } else {
            throw error;
          }
        });
    };
    
    // Fetch data with retry logic
    fetchWithRetry(apiEndpoint)
      .then(data => {
        this.renderSectionContent(section, data);
        section.classList.remove('loading');
      })
      .catch(error => {
        console.error('Error loading section content:', error);
        section.classList.remove('loading');
        section.innerHTML = '<p class="error">Failed to load content. Please try again later.</p>';
      });
  }

  /**
   * Render section content as cards
   * @param {HTMLElement} section - The section element to populate
   * @param {Array} data - The data to render
   */
  renderSectionContent(section, data) {
    if (!Array.isArray(data)) {
      console.error('Expected array data for section content');
      return;
    }
    
    const container = document.createElement('div');
    container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card reveal';
      
      // Create card content
      let cardContent = '';
      
      if (item.icon) {
        cardContent += `<div class="mb-4 text-primary">${item.icon}</div>`;
      }
      
      if (item.title) {
        cardContent += `<h3 class="text-lg font-semibold mb-2">${item.title}</h3>`;
      }
      
      if (item.description) {
        cardContent += `<p class="text-muted">${item.description}</p>`;
      }
      
      card.innerHTML = cardContent;
      container.appendChild(card);
    });
    
    section.innerHTML = '';
    section.appendChild(container);
    
    // Trigger scroll reveal animation
    setTimeout(() => {
      section.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);
  }

  /**
   * Set up AJAX forms
   */
  setupAjaxForms() {
    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitAjaxForm(form);
      });
    });
  }

  /**
   * Submit form via AJAX
   * @param {HTMLFormElement} form - The form to submit
   */
  submitAjaxForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.innerHTML : null;
    
    // Show loading state
    if (submitButton) {
      submitButton.innerHTML = '<span class="spinner"></span> Submitting...';
      submitButton.disabled = true;
    }
    
    // Prepare form data
    const formData = new FormData(form);
    
    // Add CSRF token if available
    if (this.csrfToken) {
      formData.append('csrfmiddlewaretoken', this.csrfToken);
    }
    
    // Submit form via fetch
    fetch(form.action, {
      method: form.method || 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': this.csrfToken
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle success
      this.showFormMessage(form, 'Success! Your form has been submitted.', 'success');
      
      // Reset form if requested
      if (form.hasAttribute('data-reset')) {
        form.reset();
      }
    })
    .catch(error => {
      // Handle error
      console.error('Form submission error:', error);
      this.showFormMessage(form, 'Error submitting form. Please try again.', 'error');
    })
    .finally(() => {
      // Restore button state
      if (submitButton && originalText) {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }
    });
  }

  /**
   * Show form message
   * @param {HTMLFormElement} form - The form to show message for
   * @param {string} message - The message to display
   * @param {string} type - The message type ('success' or 'error')
   */
  showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message mt-4 p-3 rounded ${type === 'success' ? 'bg-success text-background' : 'bg-destructive text-background'}`;
    messageEl.textContent = message;
    
    // Insert message after form
    form.appendChild(messageEl);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 5000);
  }

  /**
   * Set up modals
   */
  setupModals() {
    // Handle modal triggers
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById(modalId);
        if (modal) {
          this.openModal(modal);
        }
      });
    });
    
    // Handle modal close buttons
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
          this.closeModal(modal);
        }
      });
    });
    
    // Close modals on overlay click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
    });
    
    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modals.forEach(modal => {
          if (modal.classList.contains('show')) {
            this.closeModal(modal);
          }
        });
      }
    });
  }

  /**
   * Open modal
   * @param {HTMLElement} modal - The modal to open
   */
  openModal(modal) {
    // Load content if modal has data-api attribute
    const apiEndpoint = modal.getAttribute('data-api');
    if (apiEndpoint) {
      this.loadModalContent(modal, apiEndpoint);
    }
    
    // Show modal
    modal.classList.add('show');
    
    // Show backdrop
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      document.body.appendChild(backdrop);
    }
    backdrop.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close modal
   * @param {HTMLElement} modal - The modal to close
   */
  closeModal(modal) {
    // Hide modal
    modal.classList.remove('show');
    
    // Hide backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('show');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  /**
   * Load modal content from API
   * @param {HTMLElement} modal - The modal to populate
   * @param {string} apiEndpoint - The API endpoint to fetch data from
   */
  loadModalContent(modal, apiEndpoint) {
    const modalBody = modal.querySelector('.modal-body');
    if (!modalBody) return;
    
    // Show loading state
    modalBody.innerHTML = '<div class="text-center py-8"><div class="spinner"></div><p>Loading...</p></div>';
    
    // Fetch content with retry logic
    const fetchWithRetry = (url, options = {}, retries = 3) => {
      return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text(); // Get as text to handle HTML content
        })
        .catch(error => {
          if (retries > 0) {
            console.warn(`Retrying API call (${retries} retries left):`, error);
            return new Promise(resolve => setTimeout(resolve, 1000))
              .then(() => fetchWithRetry(url, options, retries - 1));
          } else {
            throw error;
          }
        });
    };
    
    fetchWithRetry(apiEndpoint)
      .then(htmlContent => {
        modalBody.innerHTML = htmlContent;
      })
      .catch(error => {
        console.error('Error loading modal content:', error);
        modalBody.innerHTML = '<div class="text-center py-8"><p class="text-destructive">Failed to load content. Please try again.</p></div>';
      });
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.advancedThemeManager = new AdvancedThemeManager();
});

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AdvancedThemeManager };
}