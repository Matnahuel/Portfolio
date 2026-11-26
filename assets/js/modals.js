export function initModals() {
    const body = document.body;

    // --- Lightbox para imágenes de proyectos y certificaciones ---
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <button class="modal-carousel-button prev-button" aria-label="Imagen anterior">
                <i class="fas fa-chevron-left"></i>
            </button>
            <img class="modal-image" src="" alt="Imagen ampliada">
            <button class="modal-carousel-button next-button" aria-label="Imagen siguiente">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    const prevModalButton = modal.querySelector('.modal-carousel-button.prev-button');
    const nextModalButton = modal.querySelector('.modal-carousel-button.next-button');
    const modalImage = modal.querySelector('.modal-image');

    let currentProjectImages = [];
    let currentImageIndex = 0;

    const closeLightbox = () => {
        modal.classList.remove('show');
        modal.classList.remove('single-image');
        body.style.overflow = 'auto';
    };

    const navigateModal = (direction) => {
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex < currentProjectImages.length - 1) ? currentImageIndex + 1 : 0;
        } else if (direction === 'prev') {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentProjectImages.length - 1;
        }
        modalImage.src = currentProjectImages[currentImageIndex];
    };

    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.addEventListener('click', (event) => {
            const target = event.target;
            if (target.matches('.carousel-image-wrapper img, .expand-overlay')) {
                const projectCard = target.closest('.project-card');
                const allImages = Array.from(projectCard.querySelectorAll('.carousel-images img'));
                currentProjectImages = allImages.map(img => img.src);

                const clickedImageSrc = target.matches('img') ? target.src : target.previousElementSibling.src;
                currentImageIndex = currentProjectImages.indexOf(clickedImageSrc);

                modalImage.src = clickedImageSrc;
                modal.classList.add('show');
                body.style.overflow = 'hidden';
            }
        });
    }

    const certificationsSection = document.getElementById('certifications');
    if (certificationsSection) {
        certificationsSection.addEventListener('click', (e) => {
            const btn = e.target.closest('.cert-btn');
            if (!btn) return;
            const imgSrc = btn.getAttribute('data-image');
            if (!imgSrc) return;
            currentProjectImages = [imgSrc];
            currentImageIndex = 0;
            modalImage.src = imgSrc;
            modal.classList.add('show');
            modal.classList.add('single-image');
            body.style.overflow = 'hidden';
        });
    }

    closeButton.addEventListener('click', closeLightbox);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeLightbox();
    });
    prevModalButton.addEventListener('click', () => navigateModal('prev'));
    nextModalButton.addEventListener('click', () => navigateModal('next'));

    // Vista previa de proyectos destacados
    document.querySelectorAll('.featured-overlay').forEach(overlay => {
        const openLive = () => {
            const url = overlay.getAttribute('data-url');
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
        };

        overlay.addEventListener('click', openLive);
        overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLive();
            }
        });
    });
}