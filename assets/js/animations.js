const REVEAL_CLASS_MAP = {
    'fade-up': 'scroll-reveal',
    'slide-left': 'scroll-reveal-left',
    'slide-right': 'scroll-reveal-right',
    'slide-left-massive': 'scroll-reveal-left-massive',
    'slide-right-massive': 'scroll-reveal-right-massive',
    'slide-left-scale': 'scroll-reveal-left-scale',
    'slide-right-scale': 'scroll-reveal-right-scale',
    'stagger': 'scroll-reveal-stagger'
};

export function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const revealType = entry.target.getAttribute('data-scroll-reveal') || 'fade-up';
            const baseClass = REVEAL_CLASS_MAP[revealType];

            if (baseClass) {
                entry.target.classList.add(baseClass);
            }

            entry.target.classList.toggle('active', entry.isIntersecting);
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}