// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements within sections
document.querySelectorAll('.section h2, .section p, .section .feature-card, .section .team-member, .section .report-item, .hero-content h1, .hero-content .hero-subtitle, .hero-content .cta-button').forEach(element => {
    observer.observe(element);
});

// Hero Section Slider
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    sliderContainer.style.transform = `translateX(${-index * 100}%)`;
}

// Auto slide (optional, will add with interval later)
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000); // Change slide every 5 seconds

// Hero Section Animation
const canvas = document.getElementById('hero-animation-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let numberOfParticles = 200; // Make this variable again
const maxDistance = 100; // Reverted to a fixed max distance
let mouse = { x: null, y: null, radius: 150 }; // Mouse interaction area

window.addEventListener('mousemove', function(event){
    const heroSection = document.getElementById('home');
    const rect = heroSection.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

window.addEventListener('mouseout', function(){
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2; // Increased size range
        this.baseX = this.x; // Base position for movement
        this.baseY = this.y;
        this.density = (Math.random() * 1) + 0.5; // Adjusted density for movement calculation
        this.velocityX = Math.random() * 1 - 0.5; // Increased random horizontal velocity range
        this.velocityY = Math.random() * 1 - 0.5; // Increased random vertical velocity range
        this.pulse = Math.random() * Math.PI * 2; // Starting point for pulse animation
        this.pulseSpeed = Math.random() * 0.05 + 0.01; // Speed of pulse animation
    }

    draw() {
        // ctx.fillStyle = 'rgba(255, 255, 255, 1.0)'; // Changed to fully opaque white (removed fillStyle)
        ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)'; // Set stroke color to opaque white
        ctx.lineWidth = 1; // Set line width for the circle outline

        // Calculate pulsed size
        const pulsedSize = this.size + Math.sin(this.pulse) * (this.size * 0.5); // Pulsing effect

        // Draw an empty circle (outline)
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulsedSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke(); // Stroke the path instead of filling
    }

    update(overallSpeedMultiplier) {
        // Apply constant movement with the overall speed multiplier
        this.x += this.velocityX * overallSpeedMultiplier;
        this.y += this.velocityY * overallSpeedMultiplier;

        // Keep particles within bounds (wrap around)
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction effect (modified)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
        } else {
            // Move back towards base position if far from mouse (less pull)
            if (this.x !== this.baseX) {
                 let ddx = this.x - this.baseX;
                 this.x -= ddx * 0.02; // Slower return
             }
             if (this.y !== this.baseY) {
                 let ddy = this.y - this.baseY;
                 this.y -= ddy * 0.02; // Slower return
             }
        }

        // Update pulse animation
        this.pulse += this.pulseSpeed;
    }
}

function setCanvasSize() {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        width = heroSection.clientWidth;
        height = heroSection.clientHeight;
    } else {
        // Fallback to window size if hero section not available yet
        width = window.innerWidth;
        height = window.innerHeight;
    }
    canvas.width = width;
    canvas.height = height;

    // Adjust number of particles based on screen size
    if (width < 768) { // Mobile screens
        numberOfParticles = 70; // Fewer particles on mobile
    } else if (width < 1200) { // Tablet screens
        numberOfParticles = 150; // Medium particles on tablet
    } else { // Desktop screens
        numberOfParticles = 300; // More particles on desktop
    }

    // Removed call to initParticles() from here
}

function initParticles() {
    particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push(new Particle(x, y));
    }
}

function update(overallSpeedMultiplier) {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(overallSpeedMultiplier);
    }
}

function draw() {
    setCanvasSize(); // Ensure canvas size is updated before drawing
    ctx.clearRect(0, 0, width, height);

    // Temporary test: Draw a bright rectangle to check if canvas is working
    // ctx.fillStyle = 'red'; // Use a bright color
    // ctx.fillRect(50, 50, 100, 100); // Draw a visible rectangle

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
    }

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const distance = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${1.0 * (1 - distance / maxDistance)})`; // Lines fade with distance (fully opaque base)
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    // Calculate overall speed multiplier based on screen size
    let overallSpeedMultiplier = 1; // Default speed for larger screens

    if (width < 768) { // Mobile screens
        overallSpeedMultiplier = 0.5; // Slower speed on mobile (adjust as needed)
    } else if (width < 1200) { // Tablet screens
        overallSpeedMultiplier = 0.75; // Slightly slower on tablets (adjust as needed)
    }

    // Apply mouse interaction speed boost only on larger screens
    if (width >= 1200 && mouse.x !== null && mouse.y !== null) {
        overallSpeedMultiplier *= 3; // Increase speed multiplier on mouse hover for desktop
    }

    update(overallSpeedMultiplier);
    draw();
    requestAnimationFrame(animate);
}

// Initial setup and event listeners
// setCanvasSize(); // Removed initial call
// initParticles(); // Removed initial call
// animate(); // Removed initial call

window.addEventListener('load', () => {
    setCanvasSize();
    initParticles();
    animate();
});

window.addEventListener('resize', () => {
    setCanvasSize(); // Update canvas size and particle count
    initParticles(); // Re-initialize particles with the new count
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.textContent = ''; // Clear previous status
        formStatus.style.display = 'none';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('send_email.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                formStatus.textContent = result.message;
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                formStatus.textContent = result.message;
                formStatus.className = 'form-status error';
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            formStatus.className = 'form-status error';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            formStatus.style.display = 'block';
        }
    });
} 