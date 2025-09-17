 // Modern JavaScript for Java Web Application
 document.addEventListener('DOMContentLoaded', function() {
    console.log(' Java Web Application loaded successfully!');
    
    // Initialize all features
    initializeFormEnhancement();
    initializeAnimations();
    initializeThemeToggle();
    
    // Welcome message
    showWelcomeMessage();
 });
 // Form Enhancement
 function initializeFormEnhancement() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            const nameInput = this.querySelector('input[name="name"]');
            
            // Validate input
            if (nameInput && nameInput.value.trim() === '') {
                e.preventDefault();
                nameInput.focus();
                showError('Please enter your name');
                return;
            }
            
            // Add loading state
            if (submitButton) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                }, 1000);
            }
        });
    });
    
    // Input validation
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                clearErrorMessage(this);
            }
        });
    });
 }
 // Input validation
 function validateInput(input) {
    const value = input.value.trim();
    
    if (input.hasAttribute('required') && value === '') {
        input.classList.add('error');
        showError('This field is required', input);
        return false;
    }
    
    if (input.type === 'email' && value && !isValidEmail(value)) {
        input.classList.add('error');
        showError('Please enter a valid email address', input);
        return false;
    }
    
    input.classList.remove('error');
    clearErrorMessage(input);
    return true;
 }
 // Email validation
 function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
 }
 // Error handling
 function showError(message, element = null) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 5px;
        padding: 5px 10px;
        background: rgba(231, 76, 60, 0.1);
        border-radius: 4px;
        border-left: 3px solid #e74c3c;
    `;
    errorDiv.textContent = message;
    
    // Insert error message
    if (element) {
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    } else {
        // Show as toast notification
        showToast(message, 'error');
    }
 }
 // Clear error messages
 function clearErrorMessage(input) {
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
 }
 // Toast notifications
 function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#2ecc71',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    toast.style.backgroundColor = colors[type] || colors.info;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
 }
 // Animation effects
 function initializeAnimations() {
    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
 }
 // Theme toggle functionality
 function initializeThemeToggle() {
    // Create theme toggle button
    const themeButton = document.createElement('button');
    themeButton.innerHTML = '';
    themeButton.className = 'theme-toggle';
    themeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(themeButton);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeButton(themeButton, savedTheme);
    
    // Theme toggle event
    themeButton.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(themeButton, newTheme);
    });
 }
 // Update theme button appearance
 function updateThemeButton(button, theme) {
    button.innerHTML = theme === 'dark' ? '☀ ' : '';
    button.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
 }
 // Welcome message
 function showWelcomeMessage() {
    // Check if this is the user's first visit
    const isFirstVisit = !localStorage.getItem('hasVisited');
    
    if (isFirstVisit) {
        setTimeout(() => {
            showToast('Welcome to your Java Web Application! ', 'success');
            localStorage.setItem('hasVisited', 'true');
        }, 1000);
    }
 }
 // Utility functions
 function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
timeout = setTimeout(later, wait);
 };
 }
 // Add CSS for dark theme
 const darkThemeCSS = `
 [data-theme="dark"] {
	--bg-color: #2c3e50;
	--text-color: #ecf0f1;
	--card-bg: #34495e;
	--border-color: #4a5f7a;
 }
 [data-theme="dark"] body {
 background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
 color: var(--text-color);
 }
 [data-theme="dark"] .container {
 background: rgba(52, 73, 94, 0.95);
 }
 [data-theme="dark"] .card {
 background: var(--card-bg);
 color: var(--text-color);
 border-color: var(--border-color);
 }
 [data-theme="dark"] .input {
 background: #4a5f7a;
 border-color: #5a6f8a;
 color: var(--text-color);
 }
 [data-theme="dark"] .input:focus {
 background: #5a6f8a;
 }
 `;
 // Inject dark theme CSS
 const style = document.createElement('style');
 style.textContent = darkThemeCSS;
 document.head.appendChild(style);
 // Export functions for global access (if needed)
 window.JavaWebApp = {
 showToast,
 showError,
 validateInput
 };
