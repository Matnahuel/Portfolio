document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const toggleButton = document.getElementById("toggle-profile");
    const profileCard = document.getElementById("profile-card");
    const profileDetails = document.querySelector(".profile-details");

    // Lógica para el menú de hamburguesa
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // Cierra el menú si se hace clic en un enlace
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        });
    }

    // Lógica para mostrar/ocultar los detalles del perfil
    if (toggleButton && profileCard && profileDetails) {
        toggleButton.addEventListener('click', () => {
            profileCard.classList.toggle('expanded');
            profileDetails.classList.toggle('hidden');

            if (profileCard.classList.contains('expanded')) {
                toggleButton.textContent = 'Ver menos';
            } else {
                toggleButton.textContent = 'Ver todo';
            }
        });
    }
});