// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
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

// Dropdown menu close on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
        });
    }
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = formatNumber(currentValue);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = formatNumber(end);
        }
    };
    window.requestAnimationFrame(step);
};

const formatNumber = (num) => {
    if (num >= 1000000000) {
        return '$' + (num / 1000000000).toFixed(2) + 'B';
    }
    if (num >= 1000000) {
        return '$' + (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
};

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to cards
document.querySelectorAll('.feature-card, .way-card, .security-card, .channel-card, .resource-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(card);
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Form handling (newsletter, contact)
const newsletterForm = document.querySelector('.footer-newsletter');
if (newsletterForm) {
    const form = newsletterForm.closest('form') || newsletterForm;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
            alert('Thank you for subscribing!');
            input.value = '';
        }
    });
}

// Language selector (if needed)
const languageSelector = document.querySelector('.language-selector');
if (languageSelector) {
    languageSelector.addEventListener('click', () => {
        // Language selection logic can be added here
        console.log('Language selector clicked');
    });
}

// Button click handlers
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
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

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
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

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll animation for way cards
const wayCards = document.querySelectorAll('.way-card-left, .way-card-right');
const wayCardsObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const wayCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 200);
            wayCardsObserver.unobserve(entry.target);
        }
    });
}, wayCardsObserverOptions);

wayCards.forEach(card => {
    wayCardsObserver.observe(card);
});

// Roadmap Slider
function initRoadmapSlider() {
    const roadmapSlider = document.getElementById('roadmapSlider');
    const roadmapPrev = document.getElementById('roadmapPrev');
    const roadmapNext = document.getElementById('roadmapNext');
    const roadmapIndicators = document.getElementById('roadmapIndicators');
    const roadmapSlides = document.querySelectorAll('.roadmap-slide');

    if (!roadmapSlider || !roadmapPrev || !roadmapNext || roadmapSlides.length === 0) {
        console.log('Roadmap slider elements not found');
        return;
    }

    let currentIndex = 0;
    let slidesToShow = 4;

    function getSlidesToShow() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 4;
    }

    function updateSlider() {
        slidesToShow = getSlidesToShow();
        
        if (roadmapSlides.length === 0) return;
        
        // Get actual slide width including gap
        const firstSlide = roadmapSlides[0];
        if (!firstSlide) return;
        
        const slideWidth = firstSlide.offsetWidth;
        const gap = 32; // 2rem = 32px
        const slideStep = slideWidth + gap;
        
        // Calculate max index
        const maxIndex = Math.max(0, roadmapSlides.length - slidesToShow);
        
        // Clamp current index
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        
        // Calculate translate
        const translateX = -currentIndex * slideStep;
        roadmapSlider.style.transform = `translateX(${translateX}px)`;
        
        console.log('Slider update:', {
            currentIndex,
            maxIndex,
            slidesToShow,
            translateX,
            slideWidth
        });
        
        // Update progress bar
        const timelineLine = document.querySelector('.timeline-line');
        if (timelineLine) {
            const progress = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0;
            timelineLine.style.setProperty('--progress', `${Math.min(progress, 100)}%`);
        }
        
        // Update arrow states
        roadmapPrev.classList.toggle('disabled', currentIndex === 0);
        roadmapNext.classList.toggle('disabled', currentIndex >= maxIndex);
        
        // Update indicators
        if (roadmapIndicators) {
            const indicators = roadmapIndicators.querySelectorAll('.roadmap-indicator');
            const currentPage = Math.floor(currentIndex / slidesToShow);
            indicators.forEach((ind, idx) => {
                ind.classList.toggle('active', idx === currentPage);
            });
        }
    }

    function nextSlide() {
        slidesToShow = getSlidesToShow();
        const maxIndex = Math.max(0, roadmapSlides.length - slidesToShow);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    function goToPage(pageIndex) {
        slidesToShow = getSlidesToShow();
        currentIndex = pageIndex * slidesToShow;
        updateSlider();
    }

    // Create indicators
    function createIndicators() {
        if (!roadmapIndicators) return;
        
        roadmapIndicators.innerHTML = '';
        slidesToShow = getSlidesToShow();
        const totalPages = Math.ceil(roadmapSlides.length / slidesToShow);
        
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'roadmap-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToPage(i));
            roadmapIndicators.appendChild(indicator);
        }
    }

    // Event listeners
    roadmapNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Next clicked');
        nextSlide();
    });

    roadmapPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Prev clicked');
        prevSlide();
    });

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesToShow = getSlidesToShow();
            if (newSlidesToShow !== slidesToShow) {
                slidesToShow = newSlidesToShow;
                currentIndex = 0;
                createIndicators();
            }
            updateSlider();
        }, 250);
    });

    // Initialize
    createIndicators();
    
    // Wait for layout to calculate
    setTimeout(() => {
        updateSlider();
    }, 100);
    
    // Also update after full load
    window.addEventListener('load', () => {
        setTimeout(updateSlider, 200);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoadmapSlider);
} else {
    initRoadmapSlider();
}

// Security Cards Auto Slider
function initSecuritySlider() {
    const securitySlider = document.getElementById('securityCardsSlider');
    const securityCards = document.querySelectorAll('.security-card');
    
    if (!securitySlider || securityCards.length === 0) {
        return;
    }
    
    // Only use first 3 cards (original ones)
    const originalCards = Array.from(securityCards).slice(0, 3);
    let currentCardIndex = 0;
    let isTransitioning = false;
    let intervalId = null;
    const SHOW_MS = 2200; // time card stays fully visible
    const TRANSITION_MS = 900; // CSS slide duration
    
    // Hide all cards initially
    originalCards.forEach((card) => {
        card.classList.remove('active', 'leaving', 'entering');
    });
    
    const setOnlyActive = (idx) => {
        originalCards.forEach((c, i) => {
            c.classList.toggle('active', i === idx);
            c.classList.remove('leaving', 'entering');
        });
    };

    const runTransitionTo = (nextIndex) => {
        if (isTransitioning) return;
        const current = originalCards[currentCardIndex];
        const next = originalCards[nextIndex];
        if (!next) return;

        isTransitioning = true;

        // Prepare next below the viewport
        next.classList.remove('leaving', 'active');
        next.classList.add('entering');
        next.style.setProperty('--enter-from', '70px');

        // Ensure current is active and not "entering"
        if (current) {
            current.classList.remove('entering');
            current.classList.add('active');
        }

        // Trigger animation next frame
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Slide current up and fade
                if (current) {
                    current.classList.add('leaving');
                }
                // Slide next to center and fade in
                next.classList.add('active');
                next.classList.remove('entering');

                // Cleanup after transition
                setTimeout(() => {
                    if (current) {
                        current.classList.remove('active', 'leaving', 'entering');
                    }
                    next.classList.remove('leaving', 'entering');
                    currentCardIndex = nextIndex;
                    isTransitioning = false;
                }, TRANSITION_MS);
            });
        });
    };

    const tick = () => {
        const nextIndex = (currentCardIndex + 1) % originalCards.length;
        runTransitionTo(nextIndex);
    };
    
    // Initialize - show first card
    setTimeout(() => {
        setOnlyActive(0);
        // Start loop
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(tick, SHOW_MS + TRANSITION_MS);
    }, 200);
}

// Initialize security slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecuritySlider);
} else {
    initSecuritySlider();
}

// FAQ Categories
function initFAQCategories() {
    const faqCategories = document.querySelectorAll('.faq-category-item');
    
    faqCategories.forEach(category => {
        const header = category.querySelector('.faq-category-header');
        
        if (header) {
            header.addEventListener('click', () => {
                // Remove active from all categories
                faqCategories.forEach(cat => {
                    cat.classList.remove('active');
                });
                
                // Add active to clicked category
                category.classList.add('active');
            });
        }
    });
}

// Initialize FAQ categories when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQCategories);
} else {
    initFAQCategories();
}

// Console message
console.log('%cDrazze', 'font-size: 20px; font-weight: bold; color: #0088cc;');
console.log('%cNative TON DeFi made simple', 'color: #666;');

