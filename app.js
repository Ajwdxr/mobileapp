// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Try relative path first, then absolute path
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
                // Try alternative path
                return navigator.serviceWorker.register('sw.js');
            })
            .then(registration => {
                if (registration) {
                    console.log('SW registered with alternative path: ', registration);
                }
            })
            .catch(finalError => {
                console.log('SW registration completely failed: ', finalError);
                // Don't let service worker failure stop the app
                console.log('Continuing without service worker...');
            });
    });
}

// App functionality
class IslamicApp {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
        this.updatePaymentData();
        this.setupNotifications();
    }

    initializeApp() {
        // Add loading animation
        document.body.classList.add('loaded');
        
        // Initialize payment data
        this.paymentData = {
            thisMonth: {
                amount: 150.00,
                change: 12.5,
                trend: 'positive'
            },
            thisYear: {
                amount: 1250.00,
                change: 8.3,
                trend: 'positive'
            }
        };
        
        // Service mappings
        this.services = {
            'infaq': 'Mobile donation service',
            'wakaf': 'Endowment services',
            'fidyah': 'Compensation payments',
            'van jenazah': 'Funeral transport service',
            'waktu solat': 'Prayer times',
            'quran': 'Holy Quran access'
        };
    }

    setupEventListeners() {
        // Initialize carousel
        try {
            this.initializeCarousel();
        } catch (error) {
            console.error('Carousel initialization failed:', error);
        }
        
        // Payment cards click handlers
        const paymentCards = document.querySelectorAll('.payment-card');
        paymentCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.handlePaymentCardClick(e);
            });
        });

        // Action cards click handlers
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleActionCardClick(e);
            });
        });

        // Reminder items click handlers
        const reminderItems = document.querySelectorAll('.reminder-item');
        reminderItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleReminderClick(e);
            });
        });

        // Header buttons
        const notificationBtn = document.querySelector('.notification-btn');
        const searchBtn = document.querySelector('.search-btn');
        
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showNotifications();
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.showSearch();
            });
        }

        // Feature banner interaction
        const featureBanner = document.querySelector('.feature-banner');
        if (featureBanner) {
            featureBanner.addEventListener('click', () => {
                this.handleFeatureBannerClick();
            });
        }

        // Add touch feedback
        this.addTouchFeedback();
    }

    handleServiceCardClick(e) {
        const card = e.currentTarget;
        const href = card.getAttribute('href');
        
        if (href) {
            e.preventDefault();
            
            // Add click animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);

            // Navigate with transition
            this.navigateToPage(href);
        }
    }

    navigateToPage(url) {
        const currentPage = document.querySelector('main');
        const overlay = document.getElementById('pageOverlay');

        // Create overlay if it doesn't exist
        if (!overlay) {
            const newOverlay = document.createElement('div');
            newOverlay.id = 'pageOverlay';
            newOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(newOverlay);
        }

        // Show overlay
        document.getElementById('pageOverlay').classList.add('active');

        // Slide current page out to the left
        currentPage.style.transition = 'transform 0.4s ease';
        currentPage.style.transform = 'translateX(-100%)';

        // After animation completes, navigate to new page
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    }

    handlePaymentCardClick(e) {
        const card = e.currentTarget;
        const label = card.querySelector('.payment-label').textContent;
        
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        this.showPaymentDetails(label);
    }

    handleFeatureBannerClick() {
        this.showToast('Opening new payment feature...');
        // Add feature banner logic here
    }

    handleActionCardClick(e) {
        const card = e.currentTarget;
        const actionText = card.querySelector('.action-text').textContent;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Handle different actions
        switch(actionText.toLowerCase()) {
            case 'quran':
                this.showQuranSection();
                break;
            case 'prayer times':
                this.showPrayerTimes();
                break;
            case 'qibla':
                this.showQiblaDirection();
                break;
            case 'islamic calendar':
                this.showIslamicCalendar();
                break;
        }
    }

    handleReminderClick(e) {
        const reminder = e.currentTarget;
        const title = reminder.querySelector('h3').textContent;
        
        // Add completion animation
        reminder.style.background = 'var(--light-green)';
        reminder.style.borderLeftColor = 'var(--primary-green)';
        
        setTimeout(() => {
            reminder.style.background = '';
            reminder.style.borderLeftColor = '';
        }, 2000);

        this.showToast(`Marked "${title}" as completed!`);
    }

    handleNavigation(e) {
        const navItem = e.currentTarget;
        const navText = navItem.querySelector('span').textContent;
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        navItem.classList.add('active');
        
        // Handle navigation
        switch(navText.toLowerCase()) {
            case 'home':
                this.showHome();
                break;
            case 'prayer':
                this.showPrayerSection();
                break;
            case 'quran':
                this.showQuranSection();
                break;
            case 'calendar':
                this.showCalendarSection();
                break;
            case 'profile':
                this.showProfileSection();
                break;
        }
    }

    updatePaymentData() {
        // Update payment amounts with animation
        const paymentAmounts = document.querySelectorAll('.payment-amount');
        paymentAmounts.forEach(amount => {
            const currentValue = parseFloat(amount.textContent.replace('RM ', '').replace(',', ''));
            this.animateNumber(amount, 0, currentValue, 1000);
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            element.textContent = `RM ${current.toFixed(2)}`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    setupNotifications() {
        // Request notification permission
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }

    showNotifications() {
        this.showToast('Notifications panel opened');
        // Add notification panel logic here
    }

    showSearch() {
        this.showToast('Search functionality coming soon');
        // Add search functionality here
    }

    // Service handlers
    showInfaqService() {
        this.showToast('Opening Infaq service...');
        // Add infaq service logic here
    }

    showWakafService() {
        this.showToast('Opening Wakaf service...');
        // Add wakaf service logic here
    }

    showFidyahService() {
        this.showToast('Opening Fidyah service...');
        // Add fidyah service logic here
    }

    showVanJenazahService() {
        this.showToast('Opening Van Jenazah service...');
        // Add van jenazah service logic here
    }

    showPaymentDetails(label) {
        this.showToast(`Opening ${label} details...`);
        // Add payment details logic here
    }

    showQuranSection() {
        this.showToast('Opening Quran section...');
        // Add Quran section logic here
    }

    showPrayerTimes() {
        this.showToast('Opening Prayer Times...');
        // Add prayer times logic here
    }

    showQiblaDirection() {
        this.showToast('Finding Qibla direction...');
        // Add qibla direction logic here
    }

    showIslamicCalendar() {
        this.showToast('Opening Islamic Calendar...');
        // Add calendar logic here
    }

    showHome() {
        this.showToast('Already on Home page');
    }

    showPrayerSection() {
        this.showToast('Opening Prayer section...');
    }

    showCalendarSection() {
        this.showToast('Opening Calendar section...');
    }

    showProfileSection() {
        this.showToast('Opening Profile section...');
    }

    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--primary-green)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    addTouchFeedback() {
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll('.service-card, .payment-card, .action-card, .reminder-item, .nav-item, .feature-banner');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 100);
            });
        });
    }

    initializeCarousel() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.totalSlides = this.slides.length;
        
        // Check if elements exist
        if (this.slides.length === 0 || this.indicators.length === 0) {
            return;
        }
        
        // Ensure first slide is active
        this.updateCarousel();
        
        // Set up auto-rotation every 5 seconds
        this.carouselInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
        
        // Set up indicator click handlers
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Pause auto-rotation on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(this.carouselInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                this.carouselInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            });
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update slides
        this.slides.forEach((slide, index) => {
            const isActive = index === this.currentSlide;
            slide.classList.toggle('active', isActive);
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            const isActive = index === this.currentSlide;
            indicator.classList.toggle('active', isActive);
        });
    }
    


    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-MY', {
            style: 'currency',
            currency: 'MYR'
        }).format(amount);
    }

    getCurrentPrayer() {
        const now = new Date();
        const hour = now.getHours();
        
        // Simple prayer time logic (can be enhanced with actual prayer time API)
        if (hour >= 5 && hour < 12) return 'dhuhr';
        if (hour >= 12 && hour < 16) return 'asr';
        if (hour >= 16 && hour < 19) return 'maghrib';
        if (hour >= 19 || hour < 5) return 'isha';
        return 'fajr';
    }

    // Initialize progress bars for wakaf projects
    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                bar.style.width = progress + '%';
            }
        });
    }

    // Initialize wakaf page functionality
    initializeWakafPage() {
        if (document.querySelector('.wakaf-projects')) {
            this.initializeProgressBars();
            this.setupWakafEventListeners();
        }
    }

    setupWakafEventListeners() {
        // Donate button handlers
        const donateButtons = document.querySelectorAll('.btn-donate');
        donateButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Opening donation form...');
                // Add donation logic here
            });
        });

        // Details button handlers
        const detailsButtons = document.querySelectorAll('.btn-details');
        detailsButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Opening project details...');
                // Add project details logic here
            });
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new IslamicApp();
    
    // Initialize wakaf page if we're on it
    if (app.initializeWakafPage) {
        app.initializeWakafPage();
    }
});

// Add PWA install prompt
// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//     e.preventDefault();
//     deferredPrompt = e;
    
//     // Show install button or prompt
//     setTimeout(() => {
//         if (deferredPrompt) {
//             this.showInstallPrompt();
//         }
//     }, 3000);
// });

// Show install prompt
// function showInstallPrompt() {
//     const installPrompt = document.createElement('div');
//     installPrompt.className = 'install-prompt';
//     installPrompt.innerHTML = `
//         <div class="install-content">
//             <i class="fas fa-download"></i>
//             <span>Install Islamic App</span>
//             <button class="install-btn">Install</button>
//             <button class="dismiss-btn">×</button>
//         </div>
//     `;
    
//     Object.assign(installPrompt.style, {
//         position: 'fixed',
//         bottom: '100px',
//         left: '50%',
//         transform: 'translateX(-50%)',
//         background: 'var(--primary-green)',
//         color: 'white',
//         padding: '16px 24px',
//         borderRadius: '12px',
//         fontSize: '14px',
//         fontWeight: '500',
//         zIndex: '10000',
//         boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '12px'
//     });
    
//     document.body.appendChild(installPrompt);
    
//     // Install button handler
//     const installBtn = installPrompt.querySelector('.install-btn');
//     installBtn.addEventListener('click', () => {
//         deferredPrompt.prompt();
//         deferredPrompt.userChoice.then((choiceResult) => {
//             if (choiceResult.outcome === 'accepted') {
//                 console.log('User accepted the install prompt');
//             }
//             deferredPrompt = null;
//             document.body.removeChild(installPrompt);
//         });
//     });
    
//     // Dismiss button handler
//     const dismissBtn = installPrompt.querySelector('.dismiss-btn');
//     dismissBtn.addEventListener('click', () => {
//         document.body.removeChild(installPrompt);
//     });
// }

// Add offline/online status
window.addEventListener('online', () => {
    console.log('App is online');
});

window.addEventListener('offline', () => {
    console.log('App is offline');
});



 