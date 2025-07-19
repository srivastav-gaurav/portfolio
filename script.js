// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = navMenu.classList.contains('active') 
                ? `rotate(${index === 0 ? 45 : index === 2 ? -45 : 0}deg) translate(${index === 1 ? '-100%' : '0'}, ${index === 0 ? '8px' : index === 2 ? '-8px' : '0'})`
                : 'none';
            bar.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
        });
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // Reset hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Hide all cards first
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';

                // Show cards that match the filter
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    }
                }, 100);
            });
        });
    });

    // Project modal functionality
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    // Project data for modals
    const projectData = {
        'augmet-api': {
            title: 'API Platform for AUGMET',
            role: 'Python Developer',
            duration: 'Oct 2021 – Mar 2023',
            description: 'Built a comprehensive API platform for AUGMET using Flask microservices with MongoDB aggregation pipelines, deployed on AWS infrastructure. The platform serves as the backbone for genomics data processing and analysis.',
            achievements: [
                'Scaled variant analysis processing by 40%',
                'Implemented efficient MongoDB aggregation pipelines',
                'Deployed scalable microservices architecture on AWS',
                'Integrated with multiple genomics analysis tools'
            ],
            techStack: ['Flask', 'MongoDB', 'AWS EC2', 'AWS S3', 'Python', 'REST APIs']
        },
        'augmet-cli': {
            title: 'AUGMET CLI Tool',
            role: 'Python Developer',
            duration: 'Oct 2021 – Mar 2023',
            description: 'Developed a comprehensive command-line interface tool with 7 distinct modules serving over 10 laboratories and 1000+ users. Built using Python Click framework and containerized with Docker.',
            achievements: [
                'Serves 10+ laboratories across different locations',
                'Supports 1K+ active users',
                '7 specialized modules for different genomics workflows',
                'Fully containerized with Docker for easy deployment'
            ],
            techStack: ['Python', 'Click', 'Docker', 'CI/CD', 'Bash', 'Linux']
        },
        'task-management': {
            title: 'Task Management System',
            role: 'DevOps Engineer',
            duration: 'Mar 2023 – Present',
            description: 'Designed and implemented a distributed task management system using AWS Lambda and SQS with cost-optimized scheduling algorithms that significantly reduced manual intervention.',
            achievements: [
                'Reduced manual steps by 60%',
                'Implemented cost-optimized scheduling',
                'Built distributed worker architecture',
                'Automated task prioritization and resource allocation'
            ],
            techStack: ['AWS Lambda', 'AWS SQS', 'Python', 'CloudFormation', 'AWS CloudWatch']
        },
        'api-gateway': {
            title: 'API Gateway for Healthcare',
            role: 'DevOps Engineer',
            duration: 'Mar 2023 – Present',
            description: 'Developed modular Flask backend services with JWT authentication and integrated AI chatbot functionality to accelerate user onboarding and improve customer experience.',
            achievements: [
                'Accelerated user onboarding process',
                'Implemented secure JWT authentication',
                'Integrated AI chatbot for customer support',
                'Built modular and scalable architecture'
            ],
            techStack: ['Flask', 'JWT', 'AI Integration', 'Python', 'REST APIs', 'Authentication']
        },
        'image-engine': {
            title: 'Medical Image Engine',
            role: 'Python Developer',
            duration: 'Oct 2021 – Mar 2023',
            description: 'Built a Python-based medical image processing engine using OpenSlide and Deep Zoom technologies for browser-based visualization, significantly improving diagnostic throughput.',
            achievements: [
                'Improved diagnostic throughput',
                'Enabled browser-based image visualization',
                'Processed high-resolution medical images',
                'Implemented zoom and pan functionality'
            ],
            techStack: ['Python', 'OpenSlide', 'Deep Zoom', 'Image Processing', 'Web Visualization']
        }
    };

    // Open modal when project card is clicked
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <div class="modal-project">
                        <h2>${project.title}</h2>
                        <div class="modal-meta">
                            <span class="modal-role"><i class="fas fa-user"></i> ${project.role}</span>
                            <span class="modal-duration"><i class="fas fa-calendar"></i> ${project.duration}</span>
                        </div>
                        <p class="modal-description">${project.description}</p>
                        <div class="modal-achievements">
                            <h4>Key Achievements:</h4>
                            <ul>
                                ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-tech">
                            <h4>Technology Stack:</h4>
                            <div class="modal-tech-tags">
                                ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functionality
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact form handling with Formspree integration
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('_replyto');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show sending state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Submit to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        showNotification('Oops! There was a problem submitting your form: ' + data.errors.map(error => error.message).join(', '), 'error');
                    } else {
                        showNotification('Oops! There was a problem submitting your form', 'error');
                    }
                });
            }
        })
        .catch(error => {
            showNotification('Oops! There was a problem submitting your form. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });

    // Resume download functionality
    const resumeButtons = document.querySelectorAll('#resumeBtn, .resume-download');
    resumeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if resume file exists and handle download
            const resumePath = './assets/resume.pdf';
            
            // Try to download the resume
            fetch(resumePath, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        // File exists, trigger download
                        const link = document.createElement('a');
                        link.href = resumePath;
                        link.download = 'Gaurav_Srivastava_Resume.pdf';
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showNotification('Resume download started!', 'success');
                    } else {
                        // File doesn't exist, show placeholder message
                        showNotification('Resume will be available soon. Please use the contact form to request it.', 'info');
                    }
                })
                .catch(() => {
                    // Error checking file, show placeholder message
                    showNotification('Resume will be available soon. Please use the contact form to request it.', 'info');
                });
        });
    });

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Scroll animations
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

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const number = parseInt(finalNumber.replace(/\D/g, ''));
                const suffix = finalNumber.replace(/\d/g, '');
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Smooth scroll for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .nav-link.active {
            color: #667eea !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .modal-project h2 {
            color: #2c3e50;
            margin-bottom: 1rem;
            border-bottom: 2px solid #667eea;
            padding-bottom: 0.5rem;
        }
        
        .modal-meta {
            display: flex;
            gap: 2rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }
        
        .modal-role, .modal-duration {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #667eea;
            font-weight: 500;
        }
        
        .modal-description {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .modal-achievements h4, .modal-tech h4 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .modal-achievements ul {
            margin-bottom: 1.5rem;
        }
        
        .modal-achievements li {
            color: #666;
            margin-bottom: 0.5rem;
        }
        
        .modal-tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .tech-tag {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .notification {
            animation-fill-mode: both;
        }
    `;
    document.head.appendChild(style);
});

// Additional utility functions
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

// Optimize scroll performance
const debouncedScroll = debounce(function() {
    // Scroll-dependent operations here
}, 10);

window.addEventListener('scroll', debouncedScroll); 