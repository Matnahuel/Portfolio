document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const toggleButton = document.getElementById("toggle-profile");
    const profileCard = document.getElementById("profile-card");
    const profileDetails = document.querySelector(".profile-details");
    const languageSelector = document.getElementById('language-selector');

    // --- LÓGICA DEL BOTÓN FLOTANTE FAB ---
    const fabContainer = document.getElementById("fab-container");
    const fabMain = document.getElementById("fab-main");
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    // Función para detectar la posición y ajustar la clase del menú
    function updateFabPosition() {
        if (!fabContainer) return;

        const rect = fabContainer.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Detectar posición horizontal: izquierda, centro o derecha
        const quarterWidth = viewportWidth / 4;
        const isLeft = rect.left < quarterWidth;
        const isRight = rect.left > viewportWidth - quarterWidth;
        const isHorizontalCenter = !isLeft && !isRight;

        // Detectar posición vertical
        const isTop = rect.top < viewportHeight / 2;
        const isBottom = !isTop;

        // Remover todas las clases de posición
        fabContainer.classList.remove("fab-bottom-right", "fab-bottom-left", "fab-top-right", "fab-top-left", "fab-top-center", "fab-bottom-center");

        // Agregar la clase según la posición
        if (isTop && isHorizontalCenter) {
            fabContainer.classList.add("fab-top-center");
        } else if (isBottom && isHorizontalCenter) {
            fabContainer.classList.add("fab-bottom-center");
        } else if (isTop && isLeft) {
            fabContainer.classList.add("fab-top-left");
        } else if (isTop && isRight) {
            fabContainer.classList.add("fab-top-right");
        } else if (isBottom && isLeft) {
            fabContainer.classList.add("fab-bottom-left");
        } else if (isBottom && isRight) {
            fabContainer.classList.add("fab-bottom-right");
        }

        // Chequear que todos los iconos se vean sin superposición
        checkFabItemsVisibility();
    }

    // Función para verificar si todos los items FAB son visibles sin superposición
    function checkFabItemsVisibility() {
        if (!fabContainer.classList.contains('active')) return;

        const items = fabContainer.querySelectorAll('.fab-item');
        const fabRect = fabContainer.getBoundingClientRect();
        let allVisible = true;
        let itemRects = [];

        // Obtener posiciones de todos los items
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            itemRects.push(itemRect);

            // Chequear si está dentro de la pantalla
            if (itemRect.left < 0 || itemRect.right > window.innerWidth ||
                itemRect.top < 0 || itemRect.bottom > window.innerHeight) {
                allVisible = false;
            }
        });

        // Chequear superposición entre items
        if (allVisible) {
            for (let i = 0; i < itemRects.length; i++) {
                for (let j = i + 1; j < itemRects.length; j++) {
                    if (rectsOverlap(itemRects[i], itemRects[j])) {
                        allVisible = false;
                        break;
                    }
                }
                if (!allVisible) break;
            }
        }

        // Si no están todos visibles o hay superposición, reorganizar
        if (!allVisible) {
            reorganizeMenuItems();
        }
    }

    // Función para verificar si dos rectángulos se superponen
    function rectsOverlap(rect1, rect2) {
        const padding = 10; // espaciado mínimo entre items
        return !(rect1.right + padding < rect2.left ||
                 rect2.right + padding < rect1.left ||
                 rect1.bottom + padding < rect2.top ||
                 rect2.bottom + padding < rect1.top);
    }

    if (fabMain && fabContainer) {
        // Actualizar posición al cargar
        updateFabPosition();

        // Toggle menú FAB
        fabMain.addEventListener("click", (e) => {
            e.stopPropagation();
            fabContainer.classList.toggle("active");
            // Chequear visibilidad cuando se abre el menú
            if (fabContainer.classList.contains("active")) {
                setTimeout(() => {
                    checkFabItemsVisibility();
                }, 50);
            }
        });

        // Cerrar menú al hacer click en otro lado
        document.addEventListener("click", () => {
            fabContainer.classList.remove("active");
        });

        // Hacer draggable el FAB
        fabMain.addEventListener("mousedown", (e) => {
            isDragging = true;
            fabMain.style.cursor = "grabbing";
            offset.x = e.clientX - fabContainer.getBoundingClientRect().left;
            offset.y = e.clientY - fabContainer.getBoundingClientRect().top;
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const containerWidth = fabContainer.offsetWidth;
            const containerHeight = fabContainer.offsetHeight;
            const margin = 80; // Margen de seguridad desde los bordes

            let x = e.clientX - offset.x;
            let y = e.clientY - offset.y;

            // Limitar los bordes con margen de seguridad
            x = Math.max(margin, Math.min(x, viewportWidth - containerWidth - margin));
            y = Math.max(margin, Math.min(y, viewportHeight - containerHeight - margin));

            fabContainer.style.left = x + "px";
            fabContainer.style.right = "auto";
            fabContainer.style.top = y + "px";
            fabContainer.style.bottom = "auto";

            // Actualizar posición del menú
            updateFabPosition();
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            fabMain.style.cursor = "grab";
        });

        // Soporte para touch en móviles
        fabMain.addEventListener("touchstart", (e) => {
            isDragging = true;
            const touch = e.touches[0];
            offset.x = touch.clientX - fabContainer.getBoundingClientRect().left;
            offset.y = touch.clientY - fabContainer.getBoundingClientRect().top;
        });

        document.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const containerWidth = fabContainer.offsetWidth;
            const containerHeight = fabContainer.offsetHeight;
            const margin = 80; // Margen de seguridad desde los bordes

            let x = touch.clientX - offset.x;
            let y = touch.clientY - offset.y;

            x = Math.max(margin, Math.min(x, viewportWidth - containerWidth - margin));
            y = Math.max(margin, Math.min(y, viewportHeight - containerHeight - margin));

            fabContainer.style.left = x + "px";
            fabContainer.style.right = "auto";
            fabContainer.style.top = y + "px";
            fabContainer.style.bottom = "auto";

            // Actualizar posición del menú
            updateFabPosition();
        });

        document.addEventListener("touchend", () => {
            isDragging = false;
        });
    }

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
            'hire-me': 'Enviar Propuesta',
            'schedule-interview': 'Agendar Entrevista',
            'footer-cta-title': '¿Interesado en trabajar juntos?',
            'about-me-title': 'Sobre Mí',
            'education-title': 'Educación',
            'what-im-doing-title': 'LO QUE ESTOY HACIENDO',
            'web-development-title': 'Desarrollo Web',
            'web-development-text': 'Brindar servicios de desarrollo web de alta calidad, creando soluciones Front-end y Back-end robustas y eficientes.',
            'responsive-design-title': 'Diseño Responsivo',
            'responsive-design-text': 'Crear interfaces de usuario que se adapten a cualquier dispositivo, utilizando tecnologías como CSS, Bootstrap y Tailwind.',
            'inta-internship-title': 'Pasantía en INTA',
            'inta-internship-text': 'Integrante del proyecto de reformulación de Frontend-Backend de la Red SIGA.',
            'app-development-title': 'Desarrollo de aplicación',
            'app-development-text': 'Proyecto final para terminar la Tecnicatura Universitaria en Programación, App administrativa para un centro de salud.',
            'my-services-title': 'Mis Servicios',
            'services-intro': 'Ofrecer soluciones profesionales adaptadas a tus necesidades. Ofrezco servicios integrales para dar vida a tus ideas.',
            'select-service-instruction': '(Selecciona el servicio que necesites)',
            'web-dev-service-title': 'Desarrollo Web',
            'web-dev-service-desc': 'Sitios web personalizados construidos con tecnologías modernas. Diseño responsivo, optimización y una experiencia de usuario fluida.',
            'web-dev-feature-1': 'Desarrollo Frontend',
            'web-dev-feature-2': 'Integración Backend',
            'web-dev-feature-3': 'Diseño Responsive',
            'web-dev-feature-4': 'Optimización del Rendimiento',
            'ui-ux-service-title': 'Diseño UI/UX',
            'ui-ux-service-desc': 'Crear interfaces de usuario intuitivas y atractivas que mejoren la experiencia de usuario.',
            'ui-ux-feature-1': 'Sistema de Diseño',
            'ui-ux-feature-2': 'Prototipado',
            'ui-ux-feature-3': 'Experiencia de Usuario',
            'ui-ux-feature-4': 'Diseño de Interfaces',
            'software-dev-service-title': 'Desarrollo de Software',
            'software-dev-service-desc': 'Soluciones de software personalizadas para satisfacer las necesidades específicas de tu negocio.',
            'software-dev-feature-1': 'Aplicaciones de Escritorio',
            'software-dev-feature-2': 'Integración de Sistemas',
            'software-dev-feature-3': 'Desarrollo de APIs',
            'software-dev-feature-4': 'Diseño de Bases de Datos',
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
            'back-to-top': 'Volver arriba',
            'siga-title': 'SIGA - Sistema de Información y Gestión Agrometeorológica',
            'siga-desc': 'Pasantía(PPS) en comunidad UNAHUR-INTA. Rediseño completo de la plataforma: Migración de BD (SQL Server → PostgreSQL con PostGIS), nueva API REST y nuevo frontend responsivo con mapas interactivos y reportes PDF.',
            'siga-credentials-label': 'Credenciales',
            'about-me-text': '<strong>Matías Nahuel Carabajal: Desarrollador Full Stack</strong><br><br>Técnico Universitario en Programación y estudiante de la Licenciatura en Informática en la Universidad Nacional de Hurlingham (UNAHUR). Cuento con una sólida base en desarrollo Full Stack, con una fuerte especialización tanto en el Front-end como en el Back-end.<br><br>Soy un profesional apasionado por la tecnología y el aprendizaje constante. Busco activamente mi primera experiencia laboral para aplicar mis conocimientos en desarrollo y contribuir a proyectos innovadores con código limpio, arquitecturas escalables y soluciones eficientes.<br><br><strong>Enfoque y Perfil Profesional</strong><br>Mi perfil, como Desarrollador. QA Tester y con una base en Análisis de Datos fundamentalmente autodidacta y proactivo, me permite adaptarme con facilidad a nuevos desafíos, lo que resulta en la creación de soluciones eficientes, la optimización de procesos de calidad (QA) y la interpretación de datos para una toma de decisiones informada. Este enfoque integral impulsa mi crecimiento continuo en cualquier entorno tecnológico dinámico.',
            'education-tech-title': 'Técnico Universitario en Programación',
            'education-bachelor-title': 'Licenciatura en Informática',
            'education-completed': 'Recibido',
            'education-in-progress': 'En curso',
            'education-advanced-student': 'Alumno avanzado',
            'featured-internship': 'Pasantía',
            'view-live': 'Ver en vivo',
            'siga-credentials-label': 'Credenciales:',
            'siga-username-label': 'Usuario:',
            'siga-password-label': 'Contraseña:',
            'siga-disclaimer': '(Repositorio no disponible por privacidad del instituto. Los datos que podemos mostrar son acotados y el formato de diseño UX/UI es el que pidieron desde el Instituto, cuando se pueda se mostrara la web del siga)',
            'featured-project-badge': 'Proyecto Destacado',
            'app-medicos-desc': 'Proyecto final propuesto por los profesores de la materia Desarrollo de Aplicaciones.',
            'app-medicos-assignment': 'Consigna:',
            'ciudeam-desc': 'Es el desarrollo del proyecto final de la materia Construcción de interfaces de la Tecnicatura Universitaria en Programación. Una red social con interfaz moderna y funcionalidades completas para interacción de usuarios.',
            'walmart-desc1': 'WalMat es una solución de comercio electrónico totalmente funcional, desarrollada como proyecto final del curso de React de TalentoTech. Este proyecto demuestra dominio en el desarrollo frontend moderno y la gestión de estados complejos.',
            'walmart-desc2': 'Un e-commerce completamente funcional con catálogo dinámico, gestión integral de carrito de compras y diseño responsive para una experiencia de usuario óptima en cualquier dispositivo.',
            'feedback-heading': 'Si llegaste hasta acá, me interesa tu devolución para poder seguir mejorando.',
            'feedback-email-label': 'Correo electrónico',
            'feedback-email-placeholder': 'Ingresar correo',
            'feedback-message-label': 'Sugerencia',
            'feedback-message-placeholder': 'Me interesa tu opinion...',
            'feedback-submit': 'Enviar'
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
            'hire-me': 'Send Proposal',
            'schedule-interview': 'Schedule Interview',
            'footer-cta-title': 'Interested in working together?',
            'about-me-title': 'About Me',
            'education-title': 'Education',
            'what-im-doing-title': 'WHAT I AM DOING',
            'web-development-title': 'Web Development',
            'web-development-text': 'Providing high-quality web development services, creating robust and efficient Front-end and Back-end solutions.',
            'responsive-design-title': 'Responsive Design',
            'responsive-design-text': 'Creating user interfaces that adapt to any device, using technologies like CSS, Bootstrap, and Tailwind.',
            'inta-internship-title': 'Internship at INTA',
            'inta-internship-text': 'Member of the Frontend-Backend reformulation project for the SIGA Network.',
            'app-development-title': 'Application Development',
            'app-development-text': 'Final project to complete the University Technicature in Programming, an administrative App for a health center.',
            'my-services-title': 'My Services',
            'services-intro': 'Offering professional solutions tailored to your needs. I offer comprehensive services to bring your ideas to life.',
            'select-service-instruction': '(Select the service you need)',
            'web-dev-service-title': 'Web Development',
            'web-dev-service-desc': 'Custom websites built with modern technologies. Responsive design, optimization and a smooth user experience.',
            'web-dev-feature-1': 'Frontend Development',
            'web-dev-feature-2': 'Backend Integration',
            'web-dev-feature-3': 'Responsive Design',
            'web-dev-feature-4': 'Performance Optimization',
            'ui-ux-service-title': 'UI/UX Design',
            'ui-ux-service-desc': 'Creating intuitive and attractive user interfaces that improve the user experience.',
            'ui-ux-feature-1': 'Design System',
            'ui-ux-feature-2': 'Prototyping',
            'ui-ux-feature-3': 'User Experience',
            'ui-ux-feature-4': 'Interface Design',
            'software-dev-service-title': 'Software Development',
            'software-dev-service-desc': 'Custom software solutions to meet your specific business needs.',
            'software-dev-feature-1': 'Desktop Applications',
            'software-dev-feature-2': 'Systems Integration',
            'software-dev-feature-3': 'API Development',
            'software-dev-feature-4': 'Database Design',
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
            'back-to-top': 'Back to top',
            'siga-title': 'SIGA - Agrometeorological Information and Management System',
            'siga-desc': 'Internship(PPS) UNAHUR-INTA. Complete platform redesign: Database migration (SQL Server → PostgreSQL with PostGIS), new REST API, and new responsive frontend with interactive maps and PDF reports.',
            'siga-credentials-label': 'Credentials',
            'about-me-text': '<strong>Matías Nahuel Carabajal: Full Stack Developer</strong><br><br>University Technician in Programming and student of the Bachelor\'s degree in Computer Science at the National University of Hurlingham (UNAHUR). I have a solid foundation in Full Stack development, with strong specialization in both Front-end and Back-end.<br><br>I am a professional passionate about technology and continuous learning. I actively seek my first work experience to apply my knowledge in development and contribute to innovative projects with clean code, scalable architectures, and efficient solutions.<br><br><strong>Approach and Professional Profile</strong><br>My profile, as a Developer, QA Tester, and with a foundation in Data Analysis, is fundamentally self-taught and proactive, allowing me to adapt easily to new challenges, resulting in the creation of efficient solutions, optimization of quality processes (QA), and interpretation of data for informed decision-making. This comprehensive approach drives my continuous growth in any dynamic technological environment.',
            'education-tech-title': 'University Technician in Programming',
            'education-bachelor-title': 'Bachelor\'s Degree in Computer Science',
            'education-completed': 'Completed',
            'education-in-progress': 'In Progress',
            'education-advanced-student': 'Advanced Student',
            'featured-internship': 'Internship',
            'view-live': 'View Live',
            'siga-credentials-label': 'Credentials:',
            'siga-username-label': 'Username:',
            'siga-password-label': 'Password:',
            'siga-disclaimer': '(Repository not available due to institute privacy. The data we can display is limited and the UX/UI design format is what they requested from the Institute, when possible the SIGA website will be shown)',
            'featured-project-badge': 'Featured Project',
            'app-medicos-desc': 'Final project proposed by the teachers of the Application Development course.',
            'app-medicos-assignment': 'Assignment:',
            'ciudeam-desc': 'It is the development of the final project of the Interface Construction course of the University Technician in Programming. A social network with a modern interface and complete features for user interaction.',
            'walmart-desc1': 'WalMat is a fully functional e-commerce solution, developed as the final project of the React course from TalentoTech. This project demonstrates mastery in modern frontend development and complex state management.',
            'walmart-desc2': 'A fully functional e-commerce with dynamic catalog, comprehensive shopping cart management, and responsive design for an optimal user experience on any device.',
            'feedback-heading': 'If you\'ve made it this far, I\'d appreciate your feedback to keep improving.',
            'feedback-email-label': 'Email',
            'feedback-email-placeholder': 'Enter email',
            'feedback-message-label': 'Suggestion',
            'feedback-message-placeholder': 'I\'d like to hear your opinion...',
            'feedback-submit': 'Send'
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
        
        // Actualizar placeholders de inputs y textareas
        document.querySelectorAll('[data-placeholder-key]').forEach(element => {
            const key = element.getAttribute('data-placeholder-key');
            const translation = translations[language][key];
            if (translation !== undefined) {
                element.placeholder = translation;
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
        modal.classList.remove("single-image");
        body.style.overflow = "auto";
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
            modal.classList.remove("single-image");
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
                modal.classList.remove("single-image");
                body.style.overflow = "auto";
            }
        }
    });

    // --- Modal para Certificaciones ---
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

    // --- LÓGICA DEL MODAL DE SERVICIOS ---
    const servicesTrigger = document.getElementById('services-trigger');
    const servicesModal = document.getElementById('services-modal');
    const servicesModalClose = document.getElementById('services-modal-close');
    const servicesModalOverlay = document.querySelector('.services-modal-overlay');

    const openServicesModal = () => {
        servicesModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        servicesModal.setAttribute('aria-hidden', 'false');
        document.querySelector('header').classList.add('header-hidden');
        // Scroll al inicio del modal
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const closeServicesModal = () => {
        servicesModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        servicesModal.setAttribute('aria-hidden', 'true');
        document.querySelector('header').classList.remove('header-hidden');
    };

    if (servicesTrigger) {
        servicesTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openServicesModal();
        });
    }

    // Agregar evento al botón de servicios en el footer
    const servicesBtnFooter = document.getElementById('services-btn-footer');
    if (servicesBtnFooter) {
        servicesBtnFooter.addEventListener('click', openServicesModal);
    }

    if (servicesModalClose) {
        servicesModalClose.addEventListener('click', closeServicesModal);
    }

    if (servicesModalOverlay) {
        servicesModalOverlay.addEventListener('click', closeServicesModal);
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && servicesModal.classList.contains('active')) {
            closeServicesModal();
        }
    });

    // --- LÓGICA DE CLICK EN TARJETAS DE SERVICIOS ---
    const serviceBoxes = document.querySelectorAll('.services-modal-content .service-box');
    const myEmail = 'matias.carabajal@estudiantes.unahur.edu.ar';

    serviceBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const serviceName = box.getAttribute('data-service');
            const subject = encodeURIComponent(`Interés en servicio: ${serviceName}`);
            const body = encodeURIComponent(
                `Hola Matías,\n\nEstoy interesado en el servicio de ${serviceName}.\n\nSoy...\n\n(Por favor completa tu información aquí)\n\nSaludos.`
            );
            
            window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
        });
    });

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

    // Featured Project Preview - Click to open in new tab
    const featuredOverlays = document.querySelectorAll('.featured-overlay');
    featuredOverlays.forEach(featuredOverlay => {
        featuredOverlay.addEventListener('click', function () {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });

        // Keyboard accessibility for the overlay
        featuredOverlay.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const url = this.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            }
        });
    });

    // Feedback form: validación y envío usando Formspree (o endpoint configurado en el atributo action)
    const form = document.getElementById('feedback-form');
    if (!form) return;

    const email = document.getElementById('feedback-email');
    const message = document.getElementById('feedback-message');
    const status = document.getElementById('feedback-status');

    const validText = (el) => {
        return el && el.value && /\S/.test(el.value) && el.value.trim().length >= 5;
    };

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        status.textContent = '';

        // Validación nativa de email
        if (!email.checkValidity()) {
            email.reportValidity();
            return;
        }

        // Validación de texto: no solo espacios y longitud mínima
        if (!validText(message)) {
            message.setCustomValidity('Por favor ingresa un texto válido de al menos 5 caracteres.');
            message.reportValidity();
            message.setCustomValidity('');
            return;
        }

        // Enviar datos
        const formData = new FormData(form);
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                status.textContent = 'Mensaje enviado. ¡Gracias!';
                form.reset();
            } else {
                let data;
                try { data = await res.json(); } catch (err) { }
                status.textContent = (data && data.error) ? data.error : 'Error al enviar el mensaje. Intenta nuevamente.';
            }
        } catch (err) {
            status.textContent = 'Error de red al enviar el mensaje.';
        }
    });
});