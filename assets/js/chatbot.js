export function initChatbot() {
    const fabContainer = document.getElementById('fab-container');
    const fabMain = document.getElementById('fab-main');
    const chatContainer = document.getElementById('chat-container');
    const chatClose = document.getElementById('chat-close');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const servicesChatBtn = document.getElementById('services-chat-btn');
    const downloadCvChatBtn = document.getElementById('download-cv-chat-btn');

    if (!fabMain || !fabContainer || !chatContainer) return;

    const adjustChatPosition = () => {
        if (!fabContainer.classList.contains('active')) return;

        const chatRect = chatContainer.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const padding = 10;

        if (chatRect.left < padding) {
            chatContainer.style.left = '0';
            chatContainer.style.right = 'auto';
        } else if (chatRect.right > viewportWidth - padding) {
            chatContainer.style.right = '0';
            chatContainer.style.left = 'auto';
        } else {
            chatContainer.style.left = '';
            chatContainer.style.right = '0';
        }
    };

    const closeChat = () => {
        fabContainer.classList.remove('active');
        fabMain.setAttribute('aria-expanded', 'false');
    };

    fabMain.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = fabContainer.classList.toggle('active');
        fabMain.setAttribute('aria-expanded', String(isActive));

        if (isActive) {
            setTimeout(adjustChatPosition, 50);
        }
    });

    chatClose?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeChat();
    });

    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            closeChat();
        }
    });

    chatContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    window.addEventListener('resize', () => {
        if (fabContainer.classList.contains('active')) {
            adjustChatPosition();
        }
    });

    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target && target !== '#') {
                closeChat();
                setTimeout(() => {
                    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        });
    });

    servicesChatBtn?.addEventListener('click', () => {
        closeChat();
        const servicesLink = document.getElementById('services-trigger');
        if (servicesLink) {
            setTimeout(() => servicesLink.click(), 300);
        }
    });

    downloadCvChatBtn?.addEventListener('click', () => {
        closeChat();
        const link = document.createElement('a');
        link.href = './assets/cv/Matias_Carabajal_SoftwareDev.pdf';
        link.download = 'Matias_Carabajal_SoftwareDev.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}