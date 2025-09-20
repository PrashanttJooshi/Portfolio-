// Prashant Joshi Portfolio - JavaScript Functionality

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const typingText = document.getElementById('typing-text');

// Global Variables
let currentTheme = localStorage.getItem('theme') || 'dark';
let typingIndex = 0;
let typingTextIndex = 0;
const typingTexts = [
    'Data Science Enthusiast',
    'Python Developer', 
    'ML Engineer',
    'AI Researcher',
    'Problem Solver'
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    initializeTheme();
    initializeLoading();
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeCounters();
    initializeSkillBars();
    initializeContactForm();
    initializeBackToTop();
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleScroll);
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
});

// Loading Screen
function initializeLoading() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.style.overflow = 'visible';
                    
                    // Trigger entrance animations
                    triggerEntranceAnimations();
                }, 500);
            }
        }, 1000);
    });
}

// Theme Management
function initializeTheme() {
    console.log('Initializing theme:', currentTheme);
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon();
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Theme toggle clicked');
            toggleTheme();
        });
    }
}

function toggleTheme() {
    console.log('Toggling theme from:', currentTheme);
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    console.log('Theme changed to:', currentTheme);
    
    // Add transition effect
    if (themeToggle) {
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

function updateThemeIcon() {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Enhanced Navigation with better accessibility
function initializeNavigation() {
    console.log('Initializing enhanced navigation');

    // Mobile menu toggle with accessibility
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });

        // Add ARIA attributes for accessibility
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }

    // Navigation links smooth scroll with enhanced accessibility
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', link.getAttribute('href'));

            closeMobileMenu();

            // Smooth scroll to section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update focus for accessibility
                targetSection.focus({ preventScroll: true });
            }
        });

        // Add keyboard support
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Close mobile menu when clicking outside with improved logic
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    console.log('Toggling mobile menu');
    if (navMenu) navMenu.classList.toggle('active');
    if (navToggle) navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
}

function handleScroll() {
    const navbar = document.getElementById('navbar');
    const scrolled = window.pageYOffset;
    
    // Navbar background opacity
    if (navbar) {
        if (scrolled > 50) {
            navbar.style.background = currentTheme === 'dark' 
                ? `rgba(31, 33, 33, 0.98)` 
                : `rgba(19, 52, 59, 0.98)`;
        } else {
            navbar.style.background = currentTheme === 'dark' 
                ? `rgba(31, 33, 33, 0.95)` 
                : `rgba(19, 52, 59, 0.95)`;
        }
    }
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Show/hide back to top button
    if (backToTop) {
        if (scrolled > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Enhanced Typing Animation with smoother transitions
function initializeTypingAnimation() {
    if (!typingText) return;

    console.log('Starting enhanced typing animation');

    function typeText() {
        const currentText = typingTexts[typingTextIndex];

        if (typingIndex < currentText.length) {
            typingText.textContent = currentText.substring(0, typingIndex + 1);
            typingIndex++;
            setTimeout(typeText, 120); // Slightly slower for smoother effect
        } else {
            setTimeout(deleteText, 2500); // Longer pause before deleting
        }
    }

    function deleteText() {
        const currentText = typingTexts[typingTextIndex];

        if (typingIndex > 0) {
            typingText.textContent = currentText.substring(0, typingIndex - 1);
            typingIndex--;
            setTimeout(deleteText, 60); // Slightly slower deletion
        } else {
            typingTextIndex = (typingTextIndex + 1) % typingTexts.length;
            setTimeout(typeText, 800); // Longer pause before next text
        }
    }

    // Start typing animation after loading screen with smoother timing
    setTimeout(() => {
        typeText();
    }, 1800);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for different animation types
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .about-content > *,
        .stat-card,
        .skill-category,
        .project-card,
        .timeline-item,
        .certificate-card,
        .education-item,
        .contact-card,
        .contact-form
    `);
    
    animatedElements.forEach((el, index) => {
        // Add animation classes based on position
        if (index % 2 === 0) {
            el.classList.add('fade-in-left');
        } else {
            el.classList.add('fade-in-right');
        }
        
        // Add stagger delay
        el.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(el);
    });
}

function triggerEntranceAnimations() {
    const heroElements = document.querySelectorAll('.hero-text > *, .hero-image');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Animated Counters
function initializeCounters() {
    // Will be triggered by intersection observer
}

function animateCounter(statCard) {
    const numberEl = statCard.querySelector('.stat-number');
    if (!numberEl || numberEl.classList.contains('animated')) return;
    
    const targetValue = parseFloat(numberEl.getAttribute('data-count'));
    const isDecimal = targetValue % 1 !== 0;
    const increment = targetValue / 100;
    let currentValue = 0;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            numberEl.textContent = currentValue.toFixed(2);
        } else {
            numberEl.textContent = Math.floor(currentValue);
        }
    }, 20);
    
    numberEl.classList.add('animated');
}

// Skill Bars Animation
function initializeSkillBars() {
    // Will be triggered by intersection observer
}

function animateSkillBars(skillCategory) {
    if (skillCategory.classList.contains('animated')) return;
    
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
    
    skillCategory.classList.add('animated');
}

// Contact Form
function initializeContactForm() {
    console.log('Initializing contact form');
    
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        console.log('Contact form submitted');
        handleContactSubmit(e);
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    console.log('Handling contact form submit');
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('success-message');
    
    // Validate form
    if (!validateForm()) {
        console.log('Form validation failed');
        return;
    }
    
    console.log('Form validation passed');
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    setTimeout(() => {
        console.log('Form data:', data);
        
        // Show success message
        successMessage.classList.remove('hidden');
        contactForm.reset();
        
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }, 2000);
}

function validateForm() {
    console.log('Validating form');
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject.value.trim()) {
        showError('subject', 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    console.log('Form validation result:', isValid);
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const value = field.value.trim();
    
    clearError({ target: field });
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                showError('name', 'Name is required');
            } else if (value.length < 2) {
                showError('name', 'Name must be at least 2 characters');
            }
            break;
        case 'email':
            if (!value) {
                showError('email', 'Email is required');
            } else if (!isValidEmail(value)) {
                showError('email', 'Please enter a valid email address');
            }
            break;
        case 'subject':
            if (!value) {
                showError('subject', 'Subject is required');
            }
            break;
        case 'message':
            if (!value) {
                showError('message', 'Message is required');
            } else if (value.length < 10) {
                showError('message', 'Message must be at least 10 characters');
            }
            break;
    }
}

function showError(fieldName, message) {
    console.log('Showing error for field:', fieldName, 'Message:', message);
    
    const field = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}-error`);
    
    if (field && errorEl) {
        field.classList.add('error');
        errorEl.textContent = message;
        errorEl.classList.add('show');
        errorEl.style.display = 'block';
    }
}

function clearError(e) {
    const field = e.target;
    const fieldName = field.name || field.id;
    const errorEl = document.getElementById(`${fieldName}-error`);
    
    if (field && errorEl) {
        field.classList.remove('error');
        errorEl.classList.remove('show');
        errorEl.style.display = 'none';
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const formFields = document.querySelectorAll('.form-control');
    
    errorElements.forEach(error => {
        error.classList.remove('show');
        error.style.display = 'none';
    });
    
    formFields.forEach(field => {
        field.classList.remove('error');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Back to Top Button
function initializeBackToTop() {
    console.log('Initializing back to top');
    
    if (!backToTop) {
        console.log('Back to top button not found');
        return;
    }
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Back to top clicked');
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Resize Handler
function handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

// Utility Functions
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

// Add debounced scroll handler
window.addEventListener('scroll', debounce(handleScroll, 10));

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Certificate card hover effects
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social links hover effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Enhanced ripple effect to buttons with better performance
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Smooth reveal animations for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', debounce(revealOnScroll, 10));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Tab navigation for mobile menu
    if (navMenu && navMenu.classList.contains('active')) {
        const focusableElements = navMenu.querySelectorAll('a[href], button');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    }
});

// Enhanced performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Load images 50px before they enter the viewport
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Fallback for browsers that don't support Intersection Observer
if (!('IntersectionObserver' in window)) {
    // Fallback animation triggers
    function fallbackAnimations() {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
        elements.forEach(el => el.classList.add('animate'));
        
        // Trigger counters and skill bars immediately
        document.querySelectorAll('.stat-card').forEach(animateCounter);
        document.querySelectorAll('.skill-category').forEach(animateSkillBars);
    }
    
    setTimeout(fallbackAnimations, 1000);
}

// Error handling and debugging
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

console.log('Portfolio JavaScript loaded successfully');