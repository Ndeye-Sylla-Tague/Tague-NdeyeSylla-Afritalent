document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mode Sombre ---
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeBtn) themeBtn.textContent = "☀️";
        } else {
            document.body.classList.remove('dark-mode');
            if (themeBtn) themeBtn.textContent = "🌙";
        }
    };
    if (currentTheme) applyTheme(currentTheme);
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = "☀️";
            } else {
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = "🌙";
            }
        });
    }

    // --- 2. Navbar et Scroll ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Back to Top ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        });
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. Intersection Observers (Animation & Compteurs) ---
    
    // Observateur pour les animations (Fade-in, Textes, Typewriter)
    const animatedElements = document.querySelectorAll('.fade-in, .text-animate, .text-animate-right, .typewriter');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si c'est l'effet typewriter
                if (entry.target.classList.contains('typewriter')) {
                    const text = entry.target.getAttribute('data-text');
                    if (text) entry.target.innerText = text;
                }
                // Ajoute la classe pour déclencher l'animation CSS
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => animationObserver.observe(el));

    // Observateur spécifique pour les compteurs
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const speed = 100;
                const updateCount = () => {
                    const current = +counter.innerText;
                    const increment = Math.ceil(target / speed);
                    if (current < target) {
                        counter.innerText = current + increment;
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});