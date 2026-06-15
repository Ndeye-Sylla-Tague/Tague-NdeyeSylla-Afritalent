
document.addEventListener('DOMContentLoaded', () => { // Attend que tout le HTML soit chargé
    
    // --- 1. Mode Sombre ---
    const themeBtn = document.getElementById('theme-toggle'); // Sélectionne le bouton de changement de thème
    const currentTheme = localStorage.getItem('theme'); // Récupère le thème enregistré dans le navigateur
    
    const applyTheme = (theme) => { // Fonction pour appliquer le thème
        if (theme === 'dark') {
            document.body.classList.add('dark-mode'); // Ajoute la classe CSS pour le mode sombre
            if (themeBtn) themeBtn.textContent = "☀️"; // Change l'icône du bouton
        } else {
            document.body.classList.remove('dark-mode'); // Enlève la classe pour repasser en clair
            if (themeBtn) themeBtn.textContent = "🌙";
        }
    };
    
    if (currentTheme) applyTheme(currentTheme); // Applique le thème stocké au chargement

    if (themeBtn) {
        themeBtn.addEventListener('click', () => { // Écoute le clic sur le bouton
            document.body.classList.toggle('dark-mode'); // Bascule entre les classes CSS
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark'); // Sauvegarde le choix dans le stockage local
                themeBtn.textContent = "☀️";
            } else {
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = "🌙";
            }
        });
    }

    // --- 2. Navbar et Scroll ---
    window.addEventListener('scroll', () => { // Écoute le défilement de la page
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled'); // Ajoute une classe quand on descend de 50px
            else navbar.classList.remove('scrolled'); // L'enlève quand on revient en haut
        }
    });

    // --- 3. Bouton "Back to Top" ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => { // Affiche le bouton uniquement après 300px de scroll
            if (window.scrollY > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        });
        backToTopBtn.addEventListener('click', (e) => { // Clic pour remonter
            e.preventDefault(); // Annule le comportement par défaut du lien
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Remonte en douceur
        });
    }
    // --- 4. Intersection Observers (Animation & Compteurs) ---
    
    const animatedElements = document.querySelectorAll('.fade-in, .text-animate, .text-animate-right, .typewriter');
    
    // Observateur pour les animations d'apparition (fade-in, etc.)
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Si l'élément est visible dans le viewport
                if (entry.target.classList.contains('typewriter')) { // Si c'est un effet machine à écrire
                    const text = entry.target.getAttribute('data-text'); // Récupère le texte à afficher
                    if (text) entry.target.innerText = text;
                }
                entry.target.classList.add('is-visible'); // Déclenche l'animation CSS
                observer.unobserve(entry.target); // Arrête d'observer une fois l'animation lancée
            }
        });
    }, { threshold: 0.1 }); // Se déclenche quand 10% de l'élément est visible

    animatedElements.forEach(el => animationObserver.observe(el));

    // Observateur spécifique pour les compteurs (stats)
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target'); // Valeur finale visée
                const speed = 100; // Vitesse d'incrémentation
                const updateCount = () => {
                    const current = +counter.innerText;
                    const increment = Math.ceil(target / speed); // Pas d'incrémentation
                    if (current < target) {
                        counter.innerText = current + increment; // Met à jour le nombre
                        setTimeout(updateCount, 20); // Répète toutes les 20ms
                    } else {
                        counter.innerText = target; // S'assure d'atteindre la cible précise
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 }); // Se déclenche quand 50% de l'élément est visible

    counters.forEach(counter => counterObserver.observe(counter));
});
// --- 5. Filtre de catégories (Freelances) ---
document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.dropdown-item');
    const cards = document.querySelectorAll('.freelance-card');

    filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            const category = filter.getAttribute('data-filter'); // Catégorie choisie

            cards.forEach(card => {
                const column = card.parentElement; // Sélectionne la colonne parente
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    column.classList.remove('d-none'); // Affiche si correspond
                } else {
                    column.classList.add('d-none'); // Cache si ne correspond pas
                }
            });
        });
    });
});

// --- 6. Validation Formulaire Contact ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // On bloque l'envoi pour traiter les erreurs

        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation Email
        if (!emailRegex.test(emailField.value)) {
            emailField.classList.add('is-invalid');
            emailField.classList.remove('is-valid');
            emailError.style.display = 'block'; // Affiche le message
            isValid = false;
        } else {
            emailField.classList.remove('is-invalid');
            emailField.classList.add('is-valid');
            emailError.style.display = 'none';
        }

        // Validation Message
        if (messageField.value.trim().length < 20) {
            messageField.classList.add('is-invalid');
            messageField.classList.remove('is-valid');
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageField.classList.remove('is-invalid');
            messageField.classList.add('is-valid');
            messageError.style.display = 'none';
        }

        // Si tout est valide, on simule l'envoi
        if (isValid) {
            alert("Merci ! Votre message a bien été envoyé.");
            contactForm.reset(); // Réinitialise le formulaire
            // Enlève les bordures vertes après envoi
            emailField.classList.remove('is-valid');
            messageField.classList.remove('is-valid');
        }
    });
}

// --- 7. Animation générale (Reveal scroll) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show'); // Ajoute la classe 'show' si visible
        else entry.target.classList.remove('show'); // L'enlève si on sort de la zone
    });
});

const hiddenElements = document.querySelectorAll('.hidden'); // Tous les éléments avec classe 'hidden'
hiddenElements.forEach((el) => observer.observe(el)); // Observe chaque élément trouvé
//ligne de copyright
document.getElementById("current-year").textContent = new Date().getFullYear();