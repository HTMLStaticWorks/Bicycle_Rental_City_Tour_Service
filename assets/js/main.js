/**
 * Bikora - Bicycle Rental & City Tour Service
 * Main Functional Logic, 3D WebGL & 2026 Animation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initNavbar();
    initBackToTop();
    initScrollAnimations();
    initPasswordToggle();
    initSVGRouteDrawing();
    initMagneticButtons();
    initLenisSmoothScroll();
});

/**
 * PASSWORD VISIBILITY TOGGLE
 */
function initPasswordToggle() {
    const toggles = document.querySelectorAll('.password-toggle, .password-toggle-icon');
    toggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            togglePasswordVisibility(btn);
        });
    });
}

window.togglePasswordVisibility = function(btn) {
    const container = btn.closest('.password-group') || btn.closest('.mb-3') || btn.parentElement;
    const input = container.querySelector('input');
    if (!input) return;
    const icon = btn.tagName === 'I' ? btn : btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    } else {
        input.type = 'password';
        if (icon) {
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        }
    }
};

/**
 * THEME TOGGLE LOGIC
 */
function initTheme() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const root = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    themeToggles.forEach(toggle => updateThemeIcon(toggle, savedTheme));

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if ((toggle.tagName === 'A' && toggle.getAttribute('href') && toggle.getAttribute('href') !== '#') || 
                toggle.classList.contains('rtl-toggle-btn')) {
                return;
            }
            
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggles.forEach(t => updateThemeIcon(t, newTheme));
        });
    });
}

function updateThemeIcon(toggle, theme) {
    const icon = toggle.querySelector('i');
    if (icon) {
        if (theme === 'dark') {
            icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        } else {
            icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        }
    }
}

/**
 * RTL TOGGLE LOGIC
 */
function initRTL() {
    const rtlToggles = document.querySelectorAll('#rtl-toggle, #rtl-toggle-off, .rtl-toggle-input, .rtl-toggle-btn');
    const root = document.documentElement;
    
    const savedRTL = localStorage.getItem('rtl') === 'true';
    if (savedRTL) {
        root.setAttribute('dir', 'rtl');
        rtlToggles.forEach(toggle => {
            if (toggle.type === 'checkbox') toggle.checked = true;
        });
    }

    rtlToggles.forEach(toggle => {
        const toggleAction = (state) => {
            root.setAttribute('dir', state ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', state);
            rtlToggles.forEach(t => {
                if (t.type === 'checkbox') t.checked = state;
            });
        };

        if (toggle.type === 'checkbox') {
            toggle.addEventListener('change', () => toggleAction(toggle.checked));
        } else {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const currentState = root.getAttribute('dir') === 'rtl';
                toggleAction(!currentState);
            });
        }
    });
}

/**
 * NAVBAR & OFFCANVAS LOGIC
 */
function initNavbar() {
    const header = document.querySelector('header');
    const hamburger = document.getElementById('hamburger');
    const offcanvas = document.getElementById('offcanvas-menu');
    const backdrop = document.getElementById('offcanvas-backdrop');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-link');
    const closeBtn = document.getElementById('offcanvas-close');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    function toggleOffcanvas() {
        if (offcanvas && backdrop) {
            offcanvas.classList.toggle('active');
            backdrop.classList.toggle('active');
        }
    }

    if (hamburger) hamburger.addEventListener('click', toggleOffcanvas);
    if (backdrop) backdrop.addEventListener('click', toggleOffcanvas);
    if (closeBtn) closeBtn.addEventListener('click', toggleOffcanvas);

    offcanvasLinks.forEach(link => {
        link.addEventListener('click', toggleOffcanvas);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && offcanvas && offcanvas.classList.contains('active')) {
            toggleOffcanvas();
        }
    });
}

/**
 * BACK-TO-TOP BICYCLE FLIGHT ANIMATION
 */
function initBackToTop() {
    const btt = document.getElementById('back-to-top');
    if (!btt) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btt.classList.add('show');
        } else {
            btt.classList.remove('show');
        }
    });

    btt.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const icon = btt.querySelector('i');
        if (icon) {
            icon.style.transition = 'transform 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
            icon.style.transform = 'translateY(-100vh) rotate(-20deg)';
            
            setTimeout(() => {
                icon.style.transition = 'none';
                icon.style.transform = 'translateY(0) rotate(0deg)';
            }, 800);
        }
    });
}

/* 3D WebGL Hero disabled for ultra-fast instant page loading */
function initThreejsBicycleHero() {}

/**
 * SVG ROUTE DRAWING ON SCROLL
 */
function initSVGRouteDrawing() {
    const routePaths = document.querySelectorAll('.svg-route-path');
    if (!routePaths.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('draw-active');
            }
        });
    }, { threshold: 0.2 });

    routePaths.forEach(path => observer.observe(path));
}

/**
 * MAGNETIC BUTTONS INTERACTION
 */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

/**
 * NATIVE ULTRA-FAST 120 FPS SCROLL ENGINE
 */
function initLenisSmoothScroll() {
    // Disabled Lenis JS scroll interception to allow instant 120 FPS native browser scrolling
}

/**
 * SCROLL ANIMATIONS (Intersection Observer)
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
}

