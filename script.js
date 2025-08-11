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

// ==================== HELP MODAL FUNCTIONALITY ====================

// Generate session ID for help purposes
function generateSessionId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `KUC-${timestamp.toString().slice(-6)}-${random}`;
}

// Get current session ID (create if doesn't exist)
function getCurrentSessionId() {
    let sessionId = localStorage.getItem('currentSessionId');
    if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('currentSessionId', sessionId);
    }
    return sessionId;
}

// Create help modal HTML
function createHelpModal() {
    // Check if modal already exists
    if (document.getElementById('help-modal')) {
        return;
    }

    const modalHTML = `
        <div id="help-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-center rounded-t-2xl">
                    <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <circle cx="12" cy="17" r=".5"/>
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold text-white mb-2">Need Help?</h2>
                    <p class="text-blue-100 text-sm">We're here to assist you</p>
                </div>

                <!-- Content -->
                <div class="p-6 space-y-6">
                    <!-- Session Info -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                            </svg>
                            Session Information
                        </h3>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Session ID:</span>
                                <span id="help-session-id" class="font-mono font-medium text-gray-900 dark:text-white"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Time:</span>
                                <span id="help-timestamp" class="font-medium text-gray-900 dark:text-white"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Page:</span>
                                <span id="help-current-page" class="font-medium text-gray-900 dark:text-white"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            Contact Support
                        </h3>
                        <div class="space-y-3">
                            <a href="tel:+60321234567" class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 dark:text-green-400">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="font-medium text-gray-900 dark:text-white">Call Support</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">+60 3-2123-4567</div>
                                </div>
                            </a>

                            <a href="mailto:support@kucharge.com" class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 dark:text-blue-400">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="font-medium text-gray-900 dark:text-white">Email Support</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">support@kucharge.com</div>
                                </div>
                            </a>

                            <a href="https://wa.me/60321234567" target="_blank" class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 dark:text-green-400">
                                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="font-medium text-gray-900 dark:text-white">WhatsApp Support</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">+60 3-2123-4567</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <!-- Operating Hours -->
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            Support Hours
                        </h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600 dark:text-gray-400">Monday - Friday:</span>
                                    <span class="font-medium text-gray-900 dark:text-white">8:00 AM - 8:00 PM</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600 dark:text-gray-400">Saturday:</span>
                                    <span class="font-medium text-gray-900 dark:text-white">9:00 AM - 6:00 PM</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600 dark:text-gray-400">Sunday:</span>
                                    <span class="font-medium text-gray-900 dark:text-white">10:00 AM - 4:00 PM</span>
                                </div>
                                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                    <span class="text-xs text-gray-500 dark:text-gray-400">Emergency support available 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="border-t border-gray-200 dark:border-gray-700 p-6">
                    <button onclick="closeHelpModal()" class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Show help modal
function showHelpModal() {
    // Create modal if it doesn't exist
    createHelpModal();

    // Update session information
    document.getElementById('help-session-id').textContent = getCurrentSessionId();
    document.getElementById('help-timestamp').textContent = new Date().toLocaleString();

    // Get current page name
    const path = window.location.pathname;
    let pageName = 'Unknown';
    if (path.includes('index.html') || path === '/') {
        pageName = 'Home / Connection';
    } else if (path.includes('charger.html')) {
        pageName = 'Charger Selection';
    } else if (path.includes('payment.html')) {
        pageName = 'Payment';
    } else if (path.includes('active.html')) {
        pageName = 'Active Charging';
    } else if (path.includes('receipt.html')) {
        pageName = 'Receipt';
    } else if (path.includes('success.html')) {
        pageName = 'Success';
    } else if (path.includes('fail.html')) {
        pageName = 'Failed Payment';
    }
    document.getElementById('help-current-page').textContent = pageName;

    // Show modal
    document.getElementById('help-modal').classList.remove('hidden');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close help modal
function closeHelpModal() {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function (event) {
    const modal = document.getElementById('help-modal');
    if (modal && event.target === modal) {
        closeHelpModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeHelpModal();
    }
});