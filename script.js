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
            'hire-me': 'Enviar Propuesta',
            'schedule-interview': 'Agendar Entrevista',
            'footer-cta-title': '¿Interesado en trabajar juntos?',
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
            'hire-me': 'Send Proposal',
            'schedule-interview': 'Schedule Interview',
            'footer-cta-title': 'Interested in working together?',
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

});

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});

// Featured Project Preview - Click to open in new tab
document.addEventListener('DOMContentLoaded', function () {
    const featuredOverlay = document.querySelector('.featured-overlay');
    if (featuredOverlay) {
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
    }
});

// Feedback form: validación y envío usando Formspree (o endpoint configurado en el atributo action)
document.addEventListener('DOMContentLoaded', function () {
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