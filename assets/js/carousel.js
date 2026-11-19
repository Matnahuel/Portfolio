export function initProjectsCarousel() {
    const track = document.getElementById('phone-carousel-track');
    const prevBtn = document.getElementById('proj-prev');
    const nextBtn = document.getElementById('proj-next');
    const elevatorEl = document.getElementById('proj-elevator');

    if (!track || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.querySelectorAll('.phone-slide'));
    if (!slides.length) return;

    let currentIndex = 0;

    const getStep = () => {
        const firstSlide = slides[0];
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return firstSlide ? firstSlide.getBoundingClientRect().width + gap : track.clientWidth;
    };

    const setActiveFloor = (index) => {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        if (!elevatorEl) return;

        Array.from(elevatorEl.children).forEach((btn, idx) => {
            const isActive = idx === currentIndex;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', String(isActive));
        });
    };

    const goToSlide = (index) => {
        const targetIndex = ((index % slides.length) + slides.length) % slides.length;
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        const targetLeft = Math.min(targetIndex * getStep(), maxScroll);

        track.scrollTo({
            left: targetLeft,
            behavior: 'smooth'
        });
        setActiveFloor(targetIndex);
    };

    if (elevatorEl) {
        elevatorEl.innerHTML = '';
        slides.forEach((slide, idx) => {
            const floorBtn = document.createElement('button');
            floorBtn.type = 'button';
            floorBtn.className = `elevator-step${idx === 0 ? ' active' : ''}`;
            floorBtn.textContent = String(idx + 1);
            floorBtn.setAttribute('role', 'tab');
            floorBtn.setAttribute('aria-selected', String(idx === 0));
            floorBtn.setAttribute('aria-label', `Proyecto ${idx + 1}: ${slide.getAttribute('title') || ''}`);
            floorBtn.addEventListener('click', () => goToSlide(idx));
            elevatorEl.appendChild(floorBtn);
        });
    }

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex + 1);
    });

    track.addEventListener('scroll', () => {
        const step = getStep();
        if (!step) return;
        const approxIndex = Math.round(track.scrollLeft / step);
        if (approxIndex !== currentIndex) {
            setActiveFloor(approxIndex);
        }
    }, { passive: true });

    setActiveFloor(0);
}