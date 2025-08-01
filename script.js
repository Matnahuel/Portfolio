//seccion conoceme
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-profile');
    const profileCard = document.getElementById('profile-card');
    const profileDetails = document.querySelector('.profile-details');

    toggleButton.addEventListener('click', () => {
        profileCard.classList.toggle('expanded');
        profileDetails.classList.toggle('hidden');

        if (profileCard.classList.contains('expanded')) {
            toggleButton.textContent = 'Ver menos';
        } else {
            toggleButton.textContent = 'Ver todo';
        }
    });
});
//fin seccion conoceme