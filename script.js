document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const toggleButton = document.getElementById("toggle-profile");
    const profileCard = document.getElementById("profile-card");
    const profileDetails = document.querySelector(".profile-details");

    //el menú de hamburguesa
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", !isExpanded);
            navLinks.classList.toggle("active");
            // Cierra el menú si se hace clic en un enlace
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.setAttribute("aria-expanded", "false");
                });
            });
        });
    }

    //mostrar/ocultar los detalles del perfil
    if (toggleButton && profileCard && profileDetails) {
        toggleButton.addEventListener('click', () => {
            const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
            profileDetails.classList.toggle('hidden');
            toggleButton.setAttribute("aria-expanded", !isExpanded);

            if (profileDetails.classList.contains('hidden')) {
                toggleButton.textContent = 'Ver todo';
            } else {
                toggleButton.textContent = 'Ver menos';
            }
        });
    }

    //proyectos con carrusel de imágenes ---
    const projects = [
        {
            title: "CIUTEAM-Anti-Social-Net",
            description: "Es el desarrollo del proyecto final de la materia Construcción de interfaces de la Tecnicatura Universitaria en Programación con unos agregados extras para subirla a github.",
            screenshots: [
                "./assets/img/Carrusel/AntiSocial/1.png",
                "./assets/img/Carrusel/AntiSocial/2.png",
                "./assets/img/Carrusel/AntiSocial/3.png",
                "./assets/img/Carrusel/AntiSocial/4.png"
            ],
            repoUrl: "https://github.com/Matnahuel/CIUTEAM-Anti-Social-Net"
        },
        {
            title: "WalMat---Tienda-Oficial",
            description: "WalMat es una tienda e-commerce, es parte de mi proyecto final para la certificacion en mi curso de React en TalentoTech.",
            screenshots: [
                "./assets/img/Carrusel/WalMAt/1.png",
                "./assets/img/Carrusel/WalMAt/2.png",
                "./assets/img/Carrusel/WalMAt/3.png",
                "./assets/img/Carrusel/WalMAt/4.png",
                "./assets/img/Carrusel/WalMAt/5.png",
                "./assets/img/Carrusel/WalMAt/6.png"
            ],
            repoUrl: "https://github.com/Matnahuel/WalMat---Tienda-Oficial"
        },
        {
            title: "App-notas",
            description: "Es un proyecto personal de un anotador.",
            screenshots: [
                "./assets/img/proyecto.jpg"
            ],
            repoUrl: "https://github.com/Matnahuel/app-notas"
        }
    ];

    //cargar los proyectos
    const projectsContainer = document.querySelector(".projects-container");

    projects.forEach((project, index) => {
        // Crea la tarjeta del proyecto
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        //carrusel de imágenes y la capa de Ampliar
        let carouselHtml = '';
        project.screenshots.forEach((screenshot, imgIndex) => {
            carouselHtml += `
                <div class="carousel-image-wrapper" role="listitem">
                    <img src="${screenshot}" alt="Captura de pantalla ${imgIndex + 1} del proyecto ${project.title}" loading="lazy">
                    <div class="expand-overlay" aria-hidden="true">Ampliar</div>
                </div>
            `;
        });
        
        //tarjeta de proyecto
        const projectHTML = `
            <div class="carousel-container" role="region" aria-label="Galería de imágenes del proyecto ${project.title}">
                <div class="carousel-images" role="list">
                    ${carouselHtml}
                </div>
                ${project.screenshots.length > 1 ? `
                    <button class="carousel-button prev-button" aria-label="Ver imagen anterior del proyecto ${project.title}">
                        <i class="fas fa-chevron-left" aria-hidden="true"></i>
                    </button>
                    <button class="carousel-button next-button" aria-label="Ver imagen siguiente del proyecto ${project.title}">
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </button>
                ` : ''}
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Ver repositorio de ${project.title} en GitHub">Repositorio</a>
            </div>
        `;

        projectCard.innerHTML = projectHTML;
        projectsContainer.appendChild(projectCard);

        if (index < projects.length - 1) {
            const hr = document.createElement("hr");
            projectsContainer.appendChild(hr);
        }

        // Lógica del carrusel para cada proyecto
        const carouselContainer = projectCard.querySelector('.carousel-container');
        if (carouselContainer) {
            const carouselImages = carouselContainer.querySelector('.carousel-images');
            const prevButton = carouselContainer.querySelector('.prev-button');
            const nextButton = carouselContainer.querySelector('.next-button');
            const images = carouselImages.querySelectorAll('img');
            let currentIndex = 0;

            const updateCarousel = () => {
                carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
            };

            if (prevButton && nextButton) {
                prevButton.addEventListener('click', () => {
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                    updateCarousel();
                });

                nextButton.addEventListener('click', () => {
                    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                    updateCarousel();
                });
            }
        }
    });

    // carrusel ---
    const body = document.body;
    const projectsSection = document.getElementById("projects");
    const modal = document.createElement("div");
    modal.classList.add("modal");
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

    const closeButton = modal.querySelector(".close-button");
    const prevModalButton = modal.querySelector(".modal-carousel-button.prev-button");
    const nextModalButton = modal.querySelector(".modal-carousel-button.next-button");
    const modalImage = modal.querySelector(".modal-image");
    
    let currentProjectImages = [];
    let currentImageIndex = 0;

    const navigateModal = (direction) => {
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex < currentProjectImages.length - 1) ? currentImageIndex + 1 : 0;
        } else if (direction === 'prev') {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentProjectImages.length - 1;
        }
        modalImage.src = currentProjectImages[currentImageIndex];
    };

    projectsSection.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".carousel-image-wrapper img, .expand-overlay")) {
            const projectCard = target.closest(".project-card");
            const allImages = Array.from(projectCard.querySelectorAll(".carousel-images img"));
            currentProjectImages = allImages.map(img => img.src);

            const clickedImageSrc = target.matches("img") ? target.src : target.previousElementSibling.src;
            currentImageIndex = currentProjectImages.indexOf(clickedImageSrc);

            modalImage.src = clickedImageSrc;
            modal.classList.add("show");
            body.style.overflow = "hidden";
        }
    });

    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
        body.style.overflow = "auto";
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
            body.style.overflow = "auto";
        }
    });

    prevModalButton.addEventListener("click", () => navigateModal('prev'));
    nextModalButton.addEventListener("click", () => navigateModal('next'));

    //funcionalidad para las flechas del teclado
    document.addEventListener("keydown", (event) => {
        if (modal.classList.contains("show")) {
            if (event.key === "ArrowLeft") {
                navigateModal('prev');
            } else if (event.key === "ArrowRight") {
                navigateModal('next');
            } else if (event.key === "Escape") {
                modal.classList.remove("show");
                body.style.overflow = "auto";
            }
        }
    });

    // Botón Volver Arriba
    const backToTopButton = document.getElementById("back-to-top");
    
    if (backToTopButton) {
        // Mostrar/ocultar botón según el scroll
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        });

        // Scroll suave al hacer clic
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});