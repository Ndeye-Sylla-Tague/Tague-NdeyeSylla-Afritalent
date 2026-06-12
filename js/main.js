document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // 1. Fonction pour appliquer le thème
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeBtn) themeBtn.textContent = "☀️"; // Affiche soleil en mode sombre
        } else {
            document.body.classList.remove('dark-mode');
            if (themeBtn) themeBtn.textContent = "🌙"; // Affiche lune en mode clair
        }
    };

    // 2. Appliquer le thème sauvegardé dès le chargement
    if (currentTheme) {
        applyTheme(currentTheme);
    }

    // 3. Gestion du clic sur le bouton
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Sauvegarder et changer l'icône
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = "☀️";
            } else {
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = "🌙";
            }
        });
    }
});
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    // Si on descend de plus de 50px, on ajoute la classe 'scrolled'
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        // Sinon, on l'enlève pour revenir au style initial
        navbar.classList.remove('scrolled');
    }
    
});
// 1. Sélection du bouton
const backToTopBtn = document.getElementById('back-to-top');

// 2. Écoute du scroll pour afficher/masquer le bouton
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Apparaît après 300px de scroll
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// 3. Retour en haut fluide au clic
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le lien de sauter
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Mouvement fluide
    });
});
/*window.scrollY : C'est une propriété JavaScript qui mesure la distance (en pixels) parcourue verticalement depuis le haut de la page.

/*classList.add/remove : On manipule la classe CSS de l'élément en temps réel, ce qui déclenche la transition fluide définie dans ton CSS.*/
