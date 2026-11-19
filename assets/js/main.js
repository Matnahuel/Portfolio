import { initTheme } from './theme.js';
import { initLanguage } from './translations.js';
import { initNavigation } from './navigation.js';
import { initModals } from './modals.js';
import { initChatbot } from './chatbot.js';
import { initScrollReveal } from './animations.js';
import { initContactForm } from './contact.js';
import './phoneProjectCard.js';
import { initProjectsCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initNavigation();
    initModals();
    initChatbot();
    initScrollReveal();
    initContactForm();
    initProjectsCarousel();
});