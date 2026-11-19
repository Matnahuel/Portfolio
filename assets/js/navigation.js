import { translations } from './translations.js';

export function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const toggleButton = document.getElementById('toggle-profile');
    const profileCard = document.getElementById('profile-card');
    const profileDetails = document.querySelector('.profile-details');
    const backToTopButton = document.getElementById('back-to-top');

    // Menú hamburguesa
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!isExpanded));
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Mostrar / ocultar detalles del perfil
    if (toggleButton && profileCard && profileDetails) {
        toggleButton.addEventListener('click', () => {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            profileDetails.classList.toggle('hidden');
            toggleButton.setAttribute('aria-expanded', String(!isExpanded));

            const currentLang = localStorage.getItem('language') || 'esp';
            toggleButton.textContent = profileDetails.classList.contains('hidden')
                ? translations[currentLang]['see-all']
                : translations[currentLang]['see-less'];
        });
    }

    // Botón Volver Arriba
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}