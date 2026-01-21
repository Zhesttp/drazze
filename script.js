// Loading Screen
const loadingPhrases = [
    'Прыгай, будущее за тобой',
    'Новая эра цифрового бизнеса',
    'iGaming меняет правила игры',
    'Твоя возможность уже здесь',
    'Присоединяйся к революции',
    'Будущее начинается сейчас',
    'Инвестируй в завтра',
    'Стань частью экосистемы'
];

let currentPhraseIndex = 0;
let currentProgress = 0;

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const loadingPhrase = document.getElementById('loadingPhrase');
    
    if (!loadingScreen) return;
    
    // Update progress
    let lastUpdateTime = Date.now();
    const minUpdateInterval = 30; // Минимальный интервал между обновлениями (мс)
    const progressSpeed = 0.8; // Скорость загрузки (больше = быстрее)
    
    function updateProgress() {
        const now = Date.now();
        const deltaTime = now - lastUpdateTime;
        
        if (deltaTime < minUpdateInterval) {
            requestAnimationFrame(updateProgress);
            return;
        }
        
        if (currentProgress < 100) {
            // Замедляем немного в начале и конце
            let speed = progressSpeed;
            if (currentProgress < 15) {
                speed = progressSpeed * 0.7; // Немного медленнее в начале
            } else if (currentProgress > 85) {
                speed = progressSpeed * 0.5; // Медленнее в конце
            }
            
            currentProgress += speed * (deltaTime / 16.67); // Нормализуем к 60fps
            if (currentProgress > 100) currentProgress = 100;
            
            progressPercentage.textContent = Math.floor(currentProgress) + '$';
            
            // Change phrase every 12-15%
            const newPhraseIndex = Math.floor((currentProgress / 100) * loadingPhrases.length);
            if (newPhraseIndex !== currentPhraseIndex && newPhraseIndex < loadingPhrases.length) {
                currentPhraseIndex = newPhraseIndex;
                loadingPhrase.style.opacity = '0';
                setTimeout(() => {
                    loadingPhrase.textContent = loadingPhrases[currentPhraseIndex];
                    loadingPhrase.style.opacity = '1';
                }, 200);
            }
            
            lastUpdateTime = now;
            requestAnimationFrame(updateProgress);
        } else {
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 500);
        }
    }
    
    // Start progress after a short delay
    setTimeout(() => {
        lastUpdateTime = Date.now();
        updateProgress();
    }, 300);
}

// Initialize loading screen when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingScreen);
} else {
    initLoadingScreen();
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
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
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .feature-card, .stat-card, .igaming-card, .economy-point, .stats-card, .contact-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Counter animation for statistics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('ru-RU');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('ru-RU');
        }
    };
    
    updateCounter();
}

// Observe statistics cards for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stats-value');
            if (statValue && !statValue.classList.contains('animated')) {
                statValue.classList.add('animated');
                animateCounter(statValue);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-card').forEach(card => {
    statsObserver.observe(card);
});

// Particles Animation
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter effect for subtitle
function initTypewriter() {
    const typewriterText = document.getElementById('typewriter-text');
    if (!typewriterText) return;
    
    const fullText = 'Революционная криптовалюта для iGaming индустрии';
    let currentIndex = 0;
    const typingSpeed = 80; // milliseconds per character
    const startDelay = 1200; // start after 1.2 seconds
    
    function typeCharacter() {
        if (currentIndex < fullText.length) {
            typewriterText.textContent = fullText.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            // Hide cursor after typing is complete
            const cursor = document.querySelector('.typewriter-cursor');
            if (cursor) {
                setTimeout(() => {
                    cursor.style.opacity = '0';
                }, 1000);
            }
        }
    }
    
    setTimeout(typeCharacter, startDelay);
}

// Initialize particles when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initParticles();
        initTypewriter();
    });
} else {
    initParticles();
    initTypewriter();
}

// Typewriter effect removed - using CSS animations instead

// Parallax effect for hero section
let lastScrollY = 0;
let orbPositions = {};

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content-wrapper');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrolled / 500);
        }
        
        // Parallax for orbs
        const orbs = hero.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            const parallaxY = scrolled * speed;
            if (index === 2) {
                // Special handling for orb-3 which is centered
                orb.style.transform = `translate(-50%, calc(-50% + ${parallaxY}px))`;
            } else {
                orb.style.transform = `translateY(${parallaxY}px)`;
            }
        });
    }
    lastScrollY = scrolled;
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .igaming-card, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add ripple effect to buttons
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

// 3D Tilt Effect for Feature Cards
function init3DTilt() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Animate Progress Bar
function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = parseInt(progressFill.getAttribute('data-progress'));
                setTimeout(() => {
                    progressFill.style.width = progress + '%';
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    if (progressFill) {
        progressObserver.observe(progressFill.closest('.staking-info'));
    }
}

// Animate Percentage Counter
function animatePercentage() {
    const percentageValue = document.querySelector('.percentage-value');
    if (!percentageValue) return;
    
    const percentageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !percentageValue.classList.contains('animated')) {
                percentageValue.classList.add('animated');
                const target = parseInt(percentageValue.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        percentageValue.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        percentageValue.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    if (percentageValue) {
        percentageObserver.observe(percentageValue.closest('.staking-info'));
    }
}

// Web lines animation for features section
function initWebLines() {
    const webLines = document.querySelector('.web-lines');
    if (!webLines) return;
    
    const wrapper = document.querySelector('.features-grid-wrapper');
    if (!wrapper) return;
    
    const leftCards = document.querySelectorAll('.features-left .feature-card');
    const rightCards = document.querySelectorAll('.features-right .feature-card');
    const center = document.querySelector('.features-center');
    
    if (leftCards.length === 0 || rightCards.length === 0 || !center) return;
    
    function updateWebLines() {
        const wrapperRect = wrapper.getBoundingClientRect();
        const centerRect = center.getBoundingClientRect();
        const centerX = centerRect.left + centerRect.width / 2 - wrapperRect.left;
        const centerY = centerRect.top + centerRect.height / 2 - wrapperRect.top;
        
        let svgContent = '<svg viewBox="0 0 1000 600" preserveAspectRatio="none"><defs><linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgba(99, 102, 241, 0.5);stop-opacity:1" /><stop offset="50%" style="stop-color:rgba(139, 92, 246, 0.7);stop-opacity:1" /><stop offset="100%" style="stop-color:rgba(236, 72, 153, 0.5);stop-opacity:1" /></linearGradient></defs>';
        
        // Lines from left cards
        leftCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardX = cardRect.right - wrapperRect.left;
            const cardY = cardRect.top + cardRect.height / 2 - wrapperRect.top;
            const svgX1 = (cardX / wrapperRect.width) * 1000;
            const svgY1 = (cardY / wrapperRect.height) * 600;
            const svgX2 = (centerX / wrapperRect.width) * 1000;
            const svgY2 = (centerY / wrapperRect.height) * 600;
            svgContent += `<line class="web-line" x1="${svgX1}" y1="${svgY1}" x2="${svgX2}" y2="${svgY2}" stroke="url(#webGradient)" stroke-width="2"/>`;
        });
        
        // Lines from right cards
        rightCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardX = cardRect.left - wrapperRect.left;
            const cardY = cardRect.top + cardRect.height / 2 - wrapperRect.top;
            const svgX1 = (cardX / wrapperRect.width) * 1000;
            const svgY1 = (cardY / wrapperRect.height) * 600;
            const svgX2 = (centerX / wrapperRect.width) * 1000;
            const svgY2 = (centerY / wrapperRect.height) * 600;
            svgContent += `<line class="web-line" x1="${svgX1}" y1="${svgY1}" x2="${svgX2}" y2="${svgY2}" stroke="url(#webGradient)" stroke-width="2"/>`;
        });
        
        const svgX2 = (centerX / wrapperRect.width) * 1000;
        const svgY2 = (centerY / wrapperRect.height) * 600;
        svgContent += `<circle class="web-node" cx="${svgX2}" cy="${svgY2}" r="10" fill="url(#webGradient)"/>`;
        svgContent += '</svg>';
        
        webLines.innerHTML = svgContent;
    }
    
    // Update on load and resize
    window.addEventListener('load', updateWebLines);
    window.addEventListener('resize', updateWebLines);
    
    // Initial update with delay
    setTimeout(updateWebLines, 100);
}

// Rotating text and icons for iGaming large card
function initRotatingText() {
    const textItems = document.querySelectorAll('.rotating-text .text-item');
    const iconSvgs = document.querySelectorAll('.large-card-icon .icon-svg');
    if (textItems.length === 0 || iconSvgs.length === 0) return;
    
    let currentIndex = 0;
    
    function rotateText() {
        // Remove active from all text items
        textItems.forEach((item) => {
            item.classList.remove('active');
        });
        
        // Remove active from all icons
        iconSvgs.forEach((icon) => {
            icon.classList.remove('active');
        });
        
        // Get current category
        const currentItem = textItems[currentIndex];
        const category = currentItem.getAttribute('data-category');
        
        // Activate current text
        currentItem.classList.add('active');
        
        // Activate corresponding icon
        const correspondingIcon = document.querySelector(`.icon-svg[data-category="${category}"]`);
        if (correspondingIcon) {
            correspondingIcon.classList.add('active');
        }
        
        currentIndex = (currentIndex + 1) % textItems.length;
    }
    
    // Initialize first item
    const firstCategory = textItems[0].getAttribute('data-category');
    const firstIcon = document.querySelector(`.icon-svg[data-category="${firstCategory}"]`);
    if (firstIcon) {
        firstIcon.classList.add('active');
    }
    
    // Start rotation after 2 seconds
    setInterval(rotateText, 2000);
}

// Initialize all interactive effects
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init3DTilt();
        animateProgressBar();
        animatePercentage();
        initRotatingText();
        initWebLines();
    });
} else {
    init3DTilt();
    animateProgressBar();
    animatePercentage();
    initRotatingText();
    initWebLines();
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Prevent default behavior for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

