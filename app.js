// Portfolio JavaScript functionality

// Global variables
let isInitialized = false;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (isInitialized) return;
    
    // Initialize lucide icons first
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeMobileMenu();
    initializeContactButtons();
    initializeHoverEffects();
    initializeProjectButtons();
    
    isInitialized = true;
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            
            const targetId = href.substring(1); // Remove the # symbol
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Smooth scroll to section with proper offset for fixed navbar
                scrollToSection(targetId);
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', throttle(updateActiveNavOnScroll, 100));
}

// Mobile menu functionality
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!navToggle || !mobileMenu) return;
    
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close mobile menu when clicking on mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => closeMobileMenu(), 100);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
            }
        }
    });
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (!mobileMenu || !navToggle) return;
    
    const menuIcon = navToggle.querySelector('.menu-icon');
    const closeIcon = navToggle.querySelector('.close-icon');
    
    mobileMenu.classList.remove('hidden');
    navToggle.classList.add('active');
    
    if (menuIcon) menuIcon.style.display = 'none';
    if (closeIcon) closeIcon.style.display = 'block';
    
    // Animate menu items
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (!mobileMenu || !navToggle) return;
    
    const menuIcon = navToggle.querySelector('.menu-icon');
    const closeIcon = navToggle.querySelector('.close-icon');
    
    mobileMenu.classList.add('hidden');
    navToggle.classList.remove('active');
    
    if (menuIcon) menuIcon.style.display = 'block';
    if (closeIcon) closeIcon.style.display = 'none';
}

// Scroll effects
function initializeScrollEffects() {
    // Navbar background opacity on scroll
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(0.95, 0.8 + (scrolled / 200) * 0.15);
        
        // Check for dark mode
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || 
                          document.documentElement.getAttribute('data-color-scheme') === 'dark';
        
        if (isDarkMode) {
            navbar.style.background = `rgba(31, 33, 33, ${opacity})`;
        } else {
            navbar.style.background = `rgba(255, 255, 255, ${opacity})`;
        }
    });
}

// Animation on scroll
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.card, .skill-badge, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Stagger animation for skills
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Enhanced hover effects
function initializeHoverEffects() {
    // Skill badge interactions
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Contact card special hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        const icon = card.querySelector('.contact-icon');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.1)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
            this.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Project button functionality
function initializeProjectButtons() {
    // Handle all project buttons
    const projectButtons = document.querySelectorAll('.project-btn');
    
    projectButtons.forEach(button => {
        // Remove any existing event listeners
        button.removeEventListener('click', handleProjectClick);
        button.addEventListener('click', handleProjectClick);
    });
}

function handleProjectClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const button = e.currentTarget;
    
    // Check if it's an anchor tag with href (Zomato project)
    if (button.tagName === 'A' && button.href) {
        // Open the GitHub link in a new tab
        window.open(button.href, '_blank', 'noopener,noreferrer');
        return;
    }
    
    // Handle button elements (placeholder projects)
    if (button.tagName === 'BUTTON') {
        const projectType = button.getAttribute('data-project');
        
        if (projectType === 'gps') {
            showProjectPlaceholder('Real-Time GPS Tracking System');
        }
    }
}

function showProjectPlaceholder(projectName) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification-overlay, .project-notification');
    existingNotifications.forEach(el => el.remove());
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        backdrop-filter: blur(4px);
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'project-notification';
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-surface);
        color: var(--color-text);
        padding: var(--space-24);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--color-border);
        z-index: 10000;
        max-width: 400px;
        text-align: center;
        animation: fadeInScale 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <h3 style="margin: 0 0 var(--space-16) 0; color: var(--color-text); font-size: var(--font-size-xl);">Project Coming Soon</h3>
        <p style="margin: 0 0 var(--space-16) 0; color: var(--color-text-secondary);">${projectName} will be available soon. Stay tuned for updates!</p>
        <button class="btn btn--primary btn--sm close-notification">
            Got it
        </button>
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.remove();
        overlay.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            notification.remove();
            overlay.remove();
        }
    });
    
    // Add CSS animations if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeInScale {
                from { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.contains(notification)) {
            notification.remove();
        }
        if (document.contains(overlay)) {
            overlay.remove();
        }
    }, 5000);
}

// Contact button functionality
function initializeContactButtons() {
    // Contact Me button in hero section
    const contactButtons = document.querySelectorAll('.hero-buttons .btn--primary');
    contactButtons.forEach(button => {
        if (button.textContent.trim().includes('Contact Me')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                scrollToSection('contact');
            });
        }
    });
    
    // Add click animation to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add ripple to external links
            if (this.hasAttribute('href') && this.getAttribute('target') === '_blank') {
                return;
            }
            
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// Helper functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const navbar = document.getElementById('navbar');
    
    if (!section || !navbar) return;
    
    const navbarHeight = navbar.offsetHeight || 80;
    const targetPosition = section.offsetTop - navbarHeight - 20;
    
    window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
    });
    
    // Update active nav link
    setTimeout(() => {
        updateActiveNavLink('#' + sectionId);
    }, 100);
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    let currentSection = '';
    const scrollPos = window.pageYOffset + navbar.offsetHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Global scroll to section function for inline onclick
window.scrollToSection = scrollToSection;

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu and notifications
    if (e.key === 'Escape') {
        closeMobileMenu();
        
        // Close any open notifications
        const notifications = document.querySelectorAll('.notification-overlay, .project-notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add active class to nav links CSS
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--color-primary) !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-primary);
        border-radius: 1px;
    }
    
    .mobile-nav-link.active {
        color: var(--color-primary) !important;
        font-weight: var(--font-weight-semibold);
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(navStyle);

// Performance optimization - Reduce animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Ensure initialization happens even if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading
    document.addEventListener('DOMContentLoaded', function() {
        if (!isInitialized) {
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                initializeNavigation();
                initializeScrollEffects();
                initializeAnimations();
                initializeMobileMenu();
                initializeContactButtons();
                initializeHoverEffects();
                initializeProjectButtons();
                isInitialized = true;
            }, 100);
        }
    });
} else {
    // DOM is already loaded
    if (!isInitialized) {
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            initializeNavigation();
            initializeScrollEffects();
            initializeAnimations();
            initializeMobileMenu();
            initializeContactButtons();
            initializeHoverEffects();
            initializeProjectButtons();
            isInitialized = true;
        }, 100);
    }
}

document.getElementById("dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
// Dark mode toggle functionality
// Dark Mode Toggle
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')) {
        darkToggle.textContent = '☀️ Light Mode';
    } else {
        darkToggle.textContent = '🌙 Dark Mode';
    }
});

// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// Smooth Scroll Function
function scrollToSection(id) {
    const section = document.getElementById(id);
    if(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close mobile menu when link clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});
