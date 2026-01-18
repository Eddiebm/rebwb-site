// Analytics - Replace GA4_MEASUREMENT_ID with your actual ID
// Google Analytics 4
(function() {
    const GA4_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID
    
    if (GA4_ID !== 'G-XXXXXXXXXX') {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA4_ID);
        window.gtag = gtag;
    }
})();

// Track custom events
function trackEvent(eventName, params = {}) {
    if (window.gtag) {
        gtag('event', eventName, params);
    }
    console.log('Event:', eventName, params);
}

// Track page views
trackEvent('page_view', { page_path: window.location.pathname });
