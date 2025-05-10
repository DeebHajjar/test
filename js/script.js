// Current language
let currentLang = 'en';

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // Language Switcher
    const langSwitcher = document.getElementById('language-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('change', function() {
            currentLang = this.value;
            updateLanguage();
            
            // Update page direction based on language
            if (currentLang === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
                document.body.classList.add('rtl');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
                document.body.classList.remove('rtl');
            }
        });
    }

    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all menu categories
                menuCategories.forEach(category => {
                    category.classList.remove('active');
                });

                // Show the selected menu category
                const targetMenu = this.getAttribute('data-menu');
                document.getElementById(targetMenu).classList.add('active');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('header nav a, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (menu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        menu.classList.remove('active');
                    }
                    
                    // Smooth scroll to the section
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update active menu item
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Highlight active menu item on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Add/remove header background on scroll
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active menu item based on scroll position
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Form Submission
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real application, you would send this data to a server
            console.log('Reservation details:', formObject);
            
            // Show success message
            alert('Thank you for your reservation! We will contact you shortly to confirm.');
            
            // Reset form
            this.reset();
        });
    }

    // Set minimum date for reservation to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        const todayString = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', todayString);
        dateInput.value = todayString;
    }

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .about-content, .menu-item, .gallery-item, .reservation-content, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Update language function
    function updateLanguage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                // Check if the element is an input with placeholder
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[currentLang][key]);
                } else {
                    element.innerHTML = translations[currentLang][key];
                }
            }
        });
    }
    
    // Initialize language
    updateLanguage();
});
