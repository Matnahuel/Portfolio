export function initTheme() {
    const themeToggleButton = document.getElementById('theme-toggle');
    if (!themeToggleButton) return;

    const themeIcon = themeToggleButton.querySelector('i');

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        themeIcon.classList.toggle('fa-sun', isDark);
        themeIcon.classList.toggle('fa-moon', !isDark);
        themeToggleButton.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
}