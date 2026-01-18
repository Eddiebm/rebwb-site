// Main JavaScript for REBWB

// Theme Toggle
function initTheme() {
    const saved = localStorage.getItem('rebwb-theme');
    if (saved === 'light') {
        document.documentElement.classList.add('light-mode');
    }
}
initTheme();

function toggleTheme() {
    document.documentElement.classList.toggle('light-mode');
    const isLight = document.documentElement.classList.contains('light-mode');
    localStorage.setItem('rebwb-theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
}

function updateThemeIcon() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isLight = document.documentElement.classList.contains('light-mode');
    btn.innerHTML = isLight 
        ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
        : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>';
}

document.addEventListener('DOMContentLoaded', function() {
    updateThemeIcon();
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Module toggles for course page
    const moduleToggles = document.querySelectorAll('.module-toggle');
    moduleToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.module-arrow');
            
            content.classList.toggle('hidden');
            content.classList.toggle('active');
            arrow.classList.toggle('rotated');
        });
    });
    
    // FAQ toggles (supports both .faq-toggle and .faq-question classes)
    const faqToggles = document.querySelectorAll('.faq-toggle, .faq-question');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.faq-arrow, .faq-icon');
            
            content.classList.toggle('hidden');
            content.classList.toggle('active');
            if (arrow) {
                arrow.classList.toggle('rotate-180');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
    
    // Add active link highlighting based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('text-white', 'font-semibold');
            link.classList.remove('text-gray-300');
        }
    });
    
    // Video-Audio Synchronization for Presenter Videos
    const presenterVideos = document.querySelectorAll('.presenter-video');
    
    presenterVideos.forEach(video => {
        const audioId = video.getAttribute('data-audio');
        const audio = document.getElementById(audioId);
        
        if (!audio) return;
        
        // Sync play
        video.addEventListener('play', function() {
            audio.currentTime = video.currentTime;
            audio.play().catch(err => console.log('Audio play error:', err));
        });
        
        // Sync pause
        video.addEventListener('pause', function() {
            audio.pause();
        });
        
        // Sync seeking
        video.addEventListener('seeked', function() {
            audio.currentTime = video.currentTime;
        });
        
        // Sync time updates (for drift correction)
        video.addEventListener('timeupdate', function() {
            const timeDiff = Math.abs(video.currentTime - audio.currentTime);
            // If audio drifts more than 0.3 seconds, resync
            if (timeDiff > 0.3 && !video.paused) {
                audio.currentTime = video.currentTime;
            }
        });
        
        // Sync volume changes
        video.addEventListener('volumechange', function() {
            // Keep video muted, control volume through audio element
            if (!video.muted) {
                video.muted = true;
            }
        });
        
        // Handle ended event
        video.addEventListener('ended', function() {
            audio.pause();
            audio.currentTime = 0;
        });
    });
});

// Utility function to format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Utility function to format percentage
function formatPercentage(value) {
    return value.toFixed(2) + '%';
}

// Utility function to get number input value
function getInputValue(id) {
    const input = document.getElementById(id);
    return input ? parseFloat(input.value) || 0 : 0;
}

// Utility function to set text content
function setTextContent(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Utility function to add result color class
function setResultColor(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.remove('text-green-400', 'text-red-400', 'text-yellow-400', 'text-blue-400', 'text-purple-400');
        if (value > 0) {
            element.classList.add('text-green-400');
        } else if (value < 0) {
            element.classList.add('text-red-400');
        }
    }
}
