document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const toggleButton = document.getElementById("toggle-profile");
    const profileCard = document.getElementById("profile-card");
    const profileDetails = document.querySelector(".profile-details");
    const languageSelector = document.getElementById('language-selector');

    // --- LÓGICA DE TRADUCCIÓN ---
    const translations = {
        esp: {
            'see-all': 'Ver todo',
            'see-less': 'Ver menos',
            'university-technician': 'Técnico Universitario en Programación',
            'full-stack-developer': 'Desarrollador Full Stack',
            'email-label': 'EMAIL',
            'phone-label': 'TELÉFONO',
            'location-label': 'UBICACIÓN',
            'additional-info-title': 'Info adicional',
            'driving-license': 'Licencia de conducir clase B2.',
            'own-vehicle': 'Vehículo propio.',
            'download-cv': 'Descargar CV',
            'about-me-title': 'Sobre Mí',
            'about-me-text': `¡Hola! Soy <strong>Matías Nahuel Carabajal, Desarrollador Full Stack</strong> con experiencia en tecnologías modernas de frontend y backend. Me apasiona crear soluciones digitales innovadoras y escribir código limpio, siguiendo buenas prácticas para lograr proyectos que combinan funcionalidad, diseño y rendimiento.<br><br><strong>Soy Técnico Universitario en Programación y actualmente curso la Licenciatura en Informática en la Universidad Nacional de Hurlingham.</strong> A lo largo de mi formación adquirí competencias en JavaScript, Python, React, bases de datos relacionales y no relacionales, además de metodologías ágiles de desarrollo.<br><br>Me especializo en el desarrollo de software escalable y responsive, desde la arquitectura hasta la implementación. Tengo experiencia práctica en proyectos full stack, trabajando con APIs REST, testing automatizado y herramientas de control de versiones como Git.<br><br>Busco oportunidades para aplicar mis conocimientos en un entorno profesional, contribuyendo a equipos dinámicos donde pueda seguir aprendiendo y aportar valor mediante soluciones técnicas de calidad. Mi enfoque proactivo, la rápida capacidad de aprendizaje y la atención al detalle me permiten adaptarme con facilidad a nuevos desafíos tecnológicos.`,
            'what-im-doing-title': 'LO QUE ESTOY HACIENDO',
            'web-development-title': 'Desarrollo Web',
            'web-development-text': 'Brindar servicios de desarrollo web de alta calidad, creando soluciones Front-end y Back-end robustas y eficientes.',
            'responsive-design-title': 'Diseño Responsivo',
            'responsive-design-text': 'Crear interfaces de usuario que se adapten a cualquier dispositivo, utilizando tecnologías como CSS, Bootstrap y Tailwind.',
            'inta-internship-title': 'Pasantía en INTA',
            'inta-internship-text': 'Integrante del proyecto de reformulación de Frontend-Backend de la Red SIGA.',
            'app-development-title': 'Desarrollo de aplicación',
            'app-development-text': 'Proyecto final para terminar la Tecnicatura Universitaria en Programación, App administrativa para un centro de salud.',
            'technical-skills-title': 'Mis habilidades técnicas',
            'languages-category': 'Lenguajes',
            'frameworks-category': 'Frameworks',
            'databases-category': 'Bases de Datos',
            'tools-category': 'Herramientas',
            'learning-more': 'Y puedo aprender más...',
            'certifications-title': 'Certificaciones',
            'see-certifications': 'Ver certificaciones',
            'cert-python-data-processing': '<strong>Procesamiento de datos con Python.</strong> ProgramAR/Ticmas, Certificado.',
            'cert-javascript': '<strong>JavaScript.</strong> CEIT/UNAHUR, Certificado.',
            'cert-frontend-dev': '<strong>Desarrollador Front-end.</strong> ProgramAR/Ticmas, Certificado.',
            'cert-project-management': '<strong>Project Management.</strong> CEIT/UNAHUR, Certificado.',
            'cert-reactjs': '<strong>ReactJS.</strong> TalentoTech, Certificado.',
            'cert-python-intro': '<strong>Introducción a Python.</strong> UNAHUR/CTTP, Certificado.',
            'cert-automated-testing': '<strong>Testing 2 (Automatizado).</strong> UNAHUR/CTTP, Certificado.',
            'languages-title': 'Idiomas',
            'language-spanish': 'Español',
            'language-spanish-level': 'Nativo',
            'language-english': 'Inglés',
            'language-english-level': 'A2 Pre-Intermedio',
            'language-portuguese': 'Portugués',
            'language-portuguese-level': 'A1 Básico',
            'projects-title': 'Proyectos',
            'footer-job-title': 'Desarrollador Web Full Stack',
            'footer-contact-title': 'Contacto',
            'footer-social-title': 'Redes Sociales',
            'footer-rights-reserved': '© 2025 Matias Nahuel Carabajal. Todos los derechos reservados.',
            'back-to-top': 'Volver arriba'
        },
        eng: {
            'see-all': 'View all',
            'see-less': 'View less',
            'university-technician': 'University Technician in Programming',
            'full-stack-developer': 'Full Stack Developer',
            'email-label': 'EMAIL',
            'phone-label': 'PHONE',
            'location-label': 'LOCATION',
            'additional-info-title': 'Additional Info',
            'driving-license': 'Driver\'s license class B2.',
            'own-vehicle': 'Own vehicle.',
            'download-cv': 'Download CV',
            'about-me-title': 'About Me',
            'about-me-text': `Hello! I'm <strong>Matías Nahuel Carabajal, a Full Stack Developer</strong> with experience in modern frontend and backend technologies. I am passionate about creating innovative digital solutions and writing clean code, following best practices to build projects that combine functionality, design, and performance.<br><br><strong>I am a University Technician in Programming and am currently pursuing a a Degree in Computer Science at the National University of Hurlingham.</strong> Throughout my education, I have acquired skills in JavaScript, Python, React, relational and non-relational databases, as well as agile development methodologies.<br><br>I specialize in developing scalable and responsive software, from architecture to implementation. I have hands-on experience in full-stack projects, working with REST APIs, automated testing, and version control tools like Git.<br><br>I am looking for opportunities to apply my knowledge in a professional environment, contributing to dynamic teams where I can continue to learn and add value through high-quality technical solutions. My proactive approach, quick learning ability, and attention to detail allow me to easily adapt to new technological challenges.`,
            'what-im-doing-title': 'WHAT I AM DOING',
            'web-development-title': 'Web Development',
            'web-development-text': 'Providing high-quality web development services, creating robust and efficient Front-end and Back-end solutions.',
            'responsive-design-title': 'Responsive Design',
            'responsive-design-text': 'Creating user interfaces that adapt to any device, using technologies like CSS, Bootstrap, and Tailwind.',
            'inta-internship-title': 'Internship at INTA',
            'inta-internship-text': 'Member of the Frontend-Backend reformulation project for the SIGA Network.',
            'app-development-title': 'Application Development',
            'app-development-text': 'Final project to complete the University Technicature in Programming, an administrative App for a health center.',
            'technical-skills-title': 'My Technical Skills',
            'languages-category': 'Languages',
            'frameworks-category': 'Frameworks',
            'databases-category': 'Databases',
            'tools-category': 'Tools',
            'learning-more': 'And I can learn more...',
            'certifications-title': 'Certifications',
            'see-certifications': 'See certifications',
            'cert-python-data-processing': '<strong>Data Processing with Python.</strong> ProgramAR/Ticmas, Certificate.',
            'cert-javascript': '<strong>JavaScript.</strong> CEIT/UNAHUR, Certificate.',
            'cert-frontend-dev': '<strong>Front-end Developer.</strong> ProgramAR/Ticmas, Certificate.',
            'cert-project-management': '<strong>Project Management.</strong> CEIT/UNAHUR, Certificate.',
            'cert-reactjs': '<strong>ReactJS.</strong> TalentoTech, Certificate.',
            'cert-python-intro': '<strong>Introduction to Python.</strong> UNAHUR/CTTP, Certificate.',
            'cert-automated-testing': '<strong>Testing 2 (Automated).</strong> UNAHUR/CTTP, Certificate.',
            'languages-title': 'Languages',
            'language-spanish': 'Spanish',
            'language-spanish-level': 'Native',
            'language-english': 'English',
            'language-english-level': 'A2 Pre-Intermediate',
            'language-portuguese': 'Portuguese',
            'language-portuguese-level': 'A1 Basic',
            'projects-title': 'Projects',
            'footer-job-title': 'Full Stack Web Developer',
            'footer-contact-title': 'Contact',
            'footer-social-title': 'Social Media',
            'footer-rights-reserved': '© 2025 Matias Nahuel Carabajal. All rights reserved.',
            'back-to-top': 'Back to top'
        }
    };

    const setLanguage = (language) => {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            const translation = translations[language][key];
            if (translation !== undefined) {
                // Si el elemento tiene hijos (como strong, br), usamos innerHTML
                if (element.children.length > 0) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        // Actualiza el texto del botón de perfil explícitamente
        if (toggleButton) {
            const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
            toggleButton.textContent = isExpanded ? translations[language]['see-less'] : translations[language]['see-all'];
        }
        localStorage.setItem('language', language);
        languageSelector.value = language;
    };

    if (languageSelector) {
        languageSelector.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    // Cargar idioma al inicio
    const savedLang = localStorage.getItem('language') || 'esp';
    setLanguage(savedLang);


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

            const currentLang = localStorage.getItem('language') || 'esp';
            if (profileDetails.classList.contains('hidden')) {
                toggleButton.textContent = translations[currentLang]['see-all'];
            } else {
                toggleButton.textContent = translations[currentLang]['see-less'];
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

    // --- LÓGICA PARA EL MODO OSCURO/CLARO ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = themeToggleButton.querySelector('i');

    // Función para aplicar el tema y guardar la preferencia
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeToggleButton.setAttribute('aria-label', 'Activar modo claro');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeToggleButton.setAttribute('aria-label', 'Activar modo oscuro');
            localStorage.setItem('theme', 'light');
        }
    };

    // Al cargar la página, comprobar la preferencia guardada o la del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark'); // Por defecto, si el sistema es oscuro, aplicamos el modo oscuro
    } else {
        applyTheme('light'); // Por defecto, modo claro
    }

    // Event listener para el botón
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(currentTheme);
    });

});

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});