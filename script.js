// Age Verification Modal
const ageModal = document.getElementById('ageModal');
const mainContent = document.getElementById('mainContent');
const confirmAgeBtn = document.getElementById('confirmAge');
const denyAgeBtn = document.getElementById('denyAge');

// Check if user has already verified age
const ageVerified = localStorage.getItem('ageVerified');

if (ageVerified === 'true') {
    ageModal.classList.add('hidden');
    mainContent.classList.remove('hidden');
} else {
    ageModal.classList.remove('hidden');
    mainContent.classList.add('hidden');
}

// Confirm age button
confirmAgeBtn.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    ageModal.classList.add('hidden');
    mainContent.classList.remove('hidden');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Deny age button
denyAgeBtn.addEventListener('click', () => {
    alert('Ľutujeme, ale musíte byť starší ako 18 rokov na prístup k tejto stránke.');
    window.location.href = 'https://www.google.com';
});

// Navigation scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations - faster and smoother
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections with faster transitions
document.querySelectorAll('.about-item, .location-card, .social-btn').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    observer.observe(card);
});

// Prevent right-click on logo (optional brand protection)
document.querySelectorAll('img[src*="logo"]').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// Remove slow loading animation for faster page load

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Lazy load images (if any are added later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

