document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
    
    if (hamburgerMenu && navbar) {
        hamburgerMenu.addEventListener('click', function() {
            navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
            navbar.style.flexDirection = 'column';
            navbar.style.position = 'absolute';
            navbar.style.top = '100%';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.backgroundColor = '#fff';
            navbar.style.borderTop = '1px solid #ddd';
            navbar.style.padding = '10px';
            navbar.style.zIndex = '1000';
        });
    }

    // Smooth scrolling for navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const exploreBtn = document.querySelector('.explore-btn');
    
    // Map navigation items to sections
    const sectionMap = {
        'Home': '.hero-section',
        'About': '.about-section',
        'Flavors': '.flavors-section',
        'Pricing': '.pricing-section',
        'Extras': '.beverages-dining-section',
        'Contact': '.contact-section'
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionSelector = sectionMap[this.textContent];
            if (sectionSelector) {
                const section = document.querySelector(sectionSelector);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Hide mobile menu after clicking
            if (window.innerWidth <= 768) {
                navbar.style.display = 'none';
            }
        });
    });
    
    // Explore Flavors button functionality
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const flavorsSection = document.querySelector('.flavors-section');
            if (flavorsSection) {
                flavorsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name.trim()) {
                alert('Please enter your name.');
                return;
            }
            
            if (!email.trim()) {
                alert('Please enter your email.');
                return;
            }
            
            if (!message.trim() || message.trim().length < 10) {
                alert('Please enter a message with at least 10 characters.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburgerMenu.contains(e.target) && !navbar.contains(e.target)) {
            if (window.innerWidth <= 768) {
                navbar.style.display = 'none';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbar.style.display = 'flex';
            navbar.style.flexDirection = 'row';
            navbar.style.position = 'static';
            navbar.style.backgroundColor = 'transparent';
            navbar.style.border = 'none';
            navbar.style.padding = '0';
        } else {
            navbar.style.display = 'none';
        }
    });
    
    // Add active state to navigation items
    const sections = document.querySelectorAll('section');
    const navItemsArray = Array.from(navItems);
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.className.split('-')[0];
            }
        });
        
        navItemsArray.forEach(item => {
            item.classList.remove('active');
            const itemText = item.textContent.toLowerCase();
            if (itemText === current || 
                (current === 'hero' && itemText === 'home') ||
                (current === 'beverages' && itemText === 'extras')) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
});
