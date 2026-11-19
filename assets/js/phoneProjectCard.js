import { translations } from './translations.js';

export class PhoneProjectCard extends HTMLElement {
    connectedCallback() {
        const lang = localStorage.getItem('language') || 'esp';
        this.render(lang);
    }

    render(language = 'esp') {
        const dict = translations[language] || translations.esp;

        const titleKey = this.getAttribute('title-key');
        const problemKey = this.getAttribute('problem-key');
        const techWhyKey = this.getAttribute('tech-why-key');
        const roleKey = this.getAttribute('role-key');

        const title = (titleKey && dict[titleKey]) || this.getAttribute('title') || '';
        const problem = (problemKey && dict[problemKey]) || this.getAttribute('problem') || '';
        const techWhy = (techWhyKey && dict[techWhyKey]) || this.getAttribute('tech-why') || '';
        const role = (roleKey && dict[roleKey]) || this.getAttribute('role-desc') || '';

        const previewUrl = this.getAttribute('preview-url') || '';
        const demo = this.getAttribute('demo') || '';
        const liveUrl = this.getAttribute('live-url') || '#';
        const repoUrl = this.getAttribute('repo-url') || '';
        const instagramUrl = this.getAttribute('instagram-url') || '';

        this.classList.add('phone-slide');

        this.innerHTML = `
            <div class="laptop-wrapper">
                <div class="laptop-mockup">
                    <div class="laptop-camera" aria-hidden="true"></div>
                    <div class="laptop-screen">
                        <div class="laptop-viewport">
                            <iframe src="${previewUrl}"
                                title="Vista previa de escritorio de ${title}"
                                sandbox="allow-same-origin allow-scripts allow-popups" loading="lazy">
                            </iframe>
                        </div>
                        <a href="${liveUrl}" target="_blank"
                            rel="noopener noreferrer" class="screen-overlay-btn">
                            <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${dict['card-open-site']}
                        </a>
                    </div>
                </div>
                <div class="laptop-base" aria-hidden="true">
                    <div class="laptop-notch"></div>
                </div>
            </div>

            <div class="slide-case-study">
                <h3>${title}</h3>

                <div class="case-study-grid">
                    <div class="case-item">
                        <h4><i class="fas fa-bullseye" aria-hidden="true"></i> ${dict['card-problem-label']}</h4>
                        <p>${problem}</p>
                    </div>
                    <div class="case-item">
                        <h4><i class="fas fa-layer-group" aria-hidden="true"></i> ${dict['card-tech-label']}</h4>
                        <p>${techWhy}</p>
                    </div>
                    <div class="case-item">
                        <h4><i class="fas fa-user-cog" aria-hidden="true"></i> ${dict['card-role-label']}</h4>
                        <p>${role}</p>
                    </div>
                </div>

                ${demo ? `<div class="slide-credentials"><span><strong>Demo:</strong> ${demo}</span></div>` : ''}

                <div class="featured-links">
                    ${repoUrl ? `
                        <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-featured btn-repo">
                            <i class="fab fa-github" aria-hidden="true"></i> ${dict['card-repo-btn']}
                        </a>
                    ` : ''}
                    <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-featured btn-live">
                        <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${dict['card-live-btn']}
                    </a>
                    ${instagramUrl ? `
                        <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer"
                            class="btn-featured btn-repo btn-ig"
                            aria-label="Instagram de ${title}" title="Instagram">
                            <i class="fab fa-instagram" aria-hidden="true"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }
}

if (!customElements.get('phone-project-card')) {
    customElements.define('phone-project-card', PhoneProjectCard);
}