// Extract charger_id from URL query parameters
function getChargerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('charger_id');
}

// Extract amount from URL query parameters
function getAmountFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('amount');
}

// Redirect to charger page with charger_id
function redirectToCharger(chargerId) {
    window.location.href = `charger.html?charger_id=${chargerId}`;
}

// Main initialization function for index.html only
function initializeApp() {
    // Only run on index page
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        return;
    }

    // Get charger_id from URL
    const chargerId = getChargerIdFromURL();

    // Set a timeout to simulate loading time (2 seconds)
    setTimeout(() => {
        if (chargerId) {
            // If charger_id is found in URL, redirect to charger page
            console.log(`Charger ID found: ${chargerId}`);
            redirectToCharger(chargerId);
        } else {
            // If no charger_id is found, use default value
            const defaultChargerId = 'default123';
            console.log(`No charger ID found, using default: ${defaultChargerId}`);
            redirectToCharger(defaultChargerId);
        }
    }, 2000);
}

// Initialize the app when DOM is loaded (only for index page)
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        initializeApp();

        // Add loading animation for index page only
        const statusText = document.querySelector('p:last-of-type');
        if (statusText) {
            let dots = 0;

            const loadingAnimation = setInterval(() => {
                dots = (dots + 1) % 4;
                const dotsString = '.'.repeat(dots);
                statusText.textContent = `Please wait${dotsString}`;
            }, 500);

            // Clear the animation after 2 seconds (when redirect happens)
            setTimeout(() => {
                clearInterval(loadingAnimation);
            }, 2000);
        }
    }
});

// Dark mode toggle functionality
function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');

    // Save preference to localStorage
    const isDark = html.classList.contains('dark');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');

    // Update toggle button text
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = isDark ?
            '<span class="text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>' :
            '<span class="text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg></span>';
    }
}

// Initialize dark mode based on saved preference
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const html = document.documentElement;

    if (savedMode === 'true') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Update toggle button if it exists
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (toggleBtn) {
        const isDark = html.classList.contains('dark');
        toggleBtn.innerHTML = isDark ?
            '<span class="text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>' :
            '<span class="text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg></span>';
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initializeDarkMode);
