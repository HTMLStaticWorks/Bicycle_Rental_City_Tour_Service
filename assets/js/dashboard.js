/**
 * Bikora - Bicycle Rental & City Tour Service
 * Customer Dashboard Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initBookingCalculator();
    initActiveTimer();
    initReceiptModal();
    initProfileSettingsForm();
});

function initSidebar() {
    const sidebar = document.getElementById('dashboard-sidebar');
    const toggle = document.getElementById('sidebar-toggle');

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });
}

function switchTab(tabId) {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(l => l.classList.remove('active'));
    
    const activeLink = document.querySelector(`.sidebar-link[onclick="switchTab('${tabId}')"]`);
    if (activeLink) activeLink.classList.add('active');

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    const activeTab = document.getElementById(`${tabId}-tab`);
    if (activeTab) {
        activeTab.style.display = 'block';
        setTimeout(() => {
            activeTab.classList.add('active');
        }, 20);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * BOOKING CALCULATOR LOGIC
 */
function initBookingCalculator() {
    const bikeTypeSelect = document.getElementById('booking-bike-type');
    const durationSelect = document.getElementById('booking-duration');
    const tourSelect = document.getElementById('booking-tour');
    const totalPriceEl = document.getElementById('booking-total-price');

    if (!bikeTypeSelect || !durationSelect || !totalPriceEl) return;

    function calculateTotal() {
        const bikeRates = { 'city-hybrid': 12, 'e-bike': 25, 'road-pro': 20, 'cruiser-duo': 18 };
        const durationMultipliers = { '1h': 1, '2h': 2, '4h': 3.5, 'half-day': 4.5, 'full-day': 8, '3-day': 20 };
        const tourAddons = { 'none': 0, 'guided-historic': 35, 'guided-sunset': 40, 'guided-food': 50, 'self-guided-gps': 10 };

        const bikeRate = bikeRates[bikeTypeSelect.value] || 15;
        const multiplier = durationMultipliers[durationSelect.value] || 1;
        const tourPrice = tourSelect ? (tourAddons[tourSelect.value] || 0) : 0;

        const total = (bikeRate * multiplier) + tourPrice;
        totalPriceEl.textContent = `$${total.toFixed(2)}`;
    }

    bikeTypeSelect.addEventListener('change', calculateTotal);
    durationSelect.addEventListener('change', calculateTotal);
    if (tourSelect) tourSelect.addEventListener('change', calculateTotal);

    calculateTotal();
}

/**
 * ACTIVE RENTAL COUNTDOWN TIMER
 */
function initActiveTimer() {
    const timerHours = document.getElementById('timer-hours');
    const timerMins = document.getElementById('timer-mins');
    const timerSecs = document.getElementById('timer-secs');

    if (!timerHours || !timerMins || !timerSecs) return;

    let totalSeconds = 2 * 3600 + 44 * 60 + 18; // 02:44:18

    setInterval(() => {
        if (totalSeconds <= 0) return;
        totalSeconds--;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        timerHours.textContent = String(h).padStart(2, '0');
        timerMins.textContent = String(m).padStart(2, '0');
        timerSecs.textContent = String(s).padStart(2, '0');
    }, 1000);
}

/**
 * RECEIPT DOWNLOAD SIMULATOR
 */
function initReceiptModal() {
    window.downloadReceipt = function(invoiceId) {
        alert(`Downloading Receipt #${invoiceId} as PDF... Thank you for riding with Bikora!`);
    };
}

/**
 * PROFILE SETTINGS FORM SAVE
 */
function initProfileSettingsForm() {
    const form = document.getElementById('profile-settings-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const toast = document.getElementById('profile-saved-toast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        } else {
            alert('Profile & Rental preferences successfully saved!');
        }
    });
}

// Live GPS bike location drift mock logic
setInterval(() => {
    const pins = document.querySelectorAll('.map-pin');
    pins.forEach(pin => {
        const top = parseFloat(pin.style.top) || 45;
        const left = parseFloat(pin.style.left) || 50;
        
        pin.style.top = `${top + (Math.random() - 0.5) * 0.1}%`;
        pin.style.left = `${left + (Math.random() - 0.5) * 0.1}%`;
    });
}, 2000);

