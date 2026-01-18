// Main JavaScript for REBWB

document.addEventListener('DOMContentLoaded', function() {
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
