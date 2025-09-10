// Portfolio Website JavaScript
// Modern interactive features and animations

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeScrollEffects();
    initializeTypewriter();
    initializeParallax();
});
    
    // Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolled
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('projects-grid') || 
                    entry.target.classList.contains('skills-grid')) {
                    staggerGridAnimation(entry.target);
                }
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToAnimate = document.querySelectorAll(`
        .hero-text,
        .hero-image,
        .about-content,
        .timeline-item,
        .skill-category,
        .project-card,
        .contact-content,
        .skills,
        .projects-grid,
        .skills-grid
    `);

    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Stagger animations for grid items
function staggerGridAnimation(container) {
    const items = container.children;
    
    Array.from(items).forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 100);
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObject = {};
            
            // Convert FormData to object
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message couldn\'t be sent. Please reach out to be through LinkedIn.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                z-index: 9999;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .notification-success { background: #10b981; }
            .notification-error { background: #ef4444; }
            .notification-info { background: #3b82f6; }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Scroll effects
function initializeScrollEffects() {
    // Remove parallax effect for hero section to prevent overlap
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const parallaxElements = document.querySelectorAll('.hero');
    //     
    //     parallaxElements.forEach(element => {
    //         const speed = 0.5;
    //         element.style.transform = `translateY(${scrolled * speed}px)`;
    //     });
    // });

    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    // Add progress bar styles
    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0,0,0,0.1);
            z-index: 9999;
        }
        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyles);
    document.body.appendChild(progressBar);
    
    // Update progress bar
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
    });
}

// Typewriter effect for hero title
function initializeTypewriter() {
    const typewriterElement = document.querySelector('.gradient-text');
    
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        typewriterElement.style.borderRight = '2px solid #6366f1';
        
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                typewriterElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    typewriterElement.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeChar, 1000);
    }
}

// Enhanced parallax effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.tech-item, .project-card, .skill-category');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
                // Reduced parallax effect to prevent overlap
                const speed = 0.01 * (index % 2 + 1); // Reduced speed and variety
                const translateY = (scrollTop - elementTop) * speed;
                element.style.transform = `translateY(${translateY}px)`;
            }
        });
    });
}

// Resume download functionality
function initializeResumeDownload() {
    const resumeButtons = document.querySelectorAll('a[href*="resume"], .resume-download');
    
    resumeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Analytics tracking (if you have analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'Resume',
                    'event_label': 'CV Download'
                });
            }
            
            // Show download notification
            showNotification('Resume download started!', 'info');
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Theme switching (bonus feature)
function initializeThemeSwitch() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // Add theme toggle styles
    const themeStyles = document.createElement('style');
    themeStyles.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        [data-theme="dark"] {
            --bg-primary: #1f2937;
            --bg-secondary: #111827;
            --bg-card: #374151;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --border-color: #4b5563;
        }
    `;
    document.head.appendChild(themeStyles);
    document.body.appendChild(themeToggle);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Performance optimizations
function optimizePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(originalScrollHandler, 16); // ~60fps
    };
}

// Initialize bonus features
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeSwitch();
    initializeResumeDownload();
    optimizePerformance();
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio script error:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics helper functions
function trackEvent(eventName, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Contact link tracking
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;
    
    const href = target.getAttribute('href');
    
    if (href && href.includes('mailto:')) {
        trackEvent('contact', 'Email', 'Click');
    } else if (href && href.includes('tel:')) {
        trackEvent('contact', 'Phone', 'Click');
    } else if (href && href.includes('linkedin.com')) {
        trackEvent('social', 'LinkedIn', 'Click');
    // } else if (href && href.includes('github.com')) {
    //     trackEvent('social', 'GitHub', 'Click');
    }
});

// Smooth reveal animations for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in:not(.visible)');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on load
document.addEventListener('DOMContentLoaded', revealOnScroll); 