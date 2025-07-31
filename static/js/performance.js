// Performance optimizations for Heroku deployment
document.addEventListener('DOMContentLoaded', function() {
    
    // Preload critical links on hover for instant navigation
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.dataset.preloaded) {
                const prefetch = document.createElement('link');
                prefetch.rel = 'prefetch';
                prefetch.href = this.href;
                document.head.appendChild(prefetch);
                this.dataset.preloaded = 'true';
            }
        });
    });
    
    // Fast click handling
    let clickTimeout;
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href && e.target.href.includes(window.location.origin)) {
            e.preventDefault();
            
            // Show loading state immediately
            showLoadingState();
            
            // Navigate with minimal delay
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                window.location.href = e.target.href;
            }, 50);
        }
    });
    
    // Loading state management
    function showLoadingState() {
        const loading = document.getElementById('loading-overlay') || createLoadingOverlay();
        loading.style.display = 'flex';
        document.body.style.cursor = 'wait';
    }
    
    function createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div style="text-align: center;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        border: 3px solid #f3f3f3;
                        border-top: 3px solid #1351B4;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 10px;
                    "></div>
                    <div style="color: #1351B4; font-weight: 500;">Carregando...</div>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
        
        document.body.appendChild(overlay);
        return overlay;
    }
    
    // Hide loading on page load
    window.addEventListener('load', function() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.style.display = 'none';
        }
        document.body.style.cursor = '';
    });
    
    // Optimize images loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.loading) {
            img.loading = 'lazy';
        }
    });
    
    // Service Worker for caching (if supported)
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker failed, continue without it
        });
    }
});

// Form optimization
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.tagName === 'FORM') {
        // Disable multiple submissions
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }
        
        // Show loading
        showLoadingState();
    }
});

// Fast back button handling
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        // Page was loaded from cache, hide loading immediately
        const loading = document.getElementById('loading-overlay');
        if (loading) loading.style.display = 'none';
        document.body.style.cursor = '';
    }
});