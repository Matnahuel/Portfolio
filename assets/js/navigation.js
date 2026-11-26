import { translations } from './translations.js';

export function initNavigation() {
    const navLinks = document.getElementById('nav-links');
    const toggleButton = document.getElementById('toggle-profile');
    const profileCard = document.getElementById('profile-card');
    const profileDetails = document.querySelector('.profile-details');
    const backToTopButton = document.getElementById('back-to-top');

    // Navegación principal (píldoras superiores en mobile)
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Mostrar / ocultar detalles del perfil
    if (toggleButton && profileCard && profileDetails) {
        toggleButton.addEventListener('click', () => {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            const nextExpanded = !isExpanded;
            profileDetails.classList.toggle('hidden');
            profileCard.classList.toggle('expanded', nextExpanded);
            toggleButton.setAttribute('aria-expanded', String(nextExpanded));

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
