function changeTheme(theme) {
    // remove only theme-related classes to avoid wiping other HTML classes
    document.documentElement.classList.remove('theme-light', 'theme-dark');

    if (theme === 'auto') {
        // leave no theme class so that prefers-color-scheme applies
        localStorage.setItem('theme', 'auto');
        return;
    }

    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
}

(function initTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
        changeTheme(theme);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeButtons = document.querySelectorAll('.theme-menu__button, .theme-switcher__button');

    function setDisabled(theme) {
        themeButtons.forEach((item) => {
            if (item.getAttribute('data-theme') === theme) {
                item.setAttribute('disabled', true);
            } else {
                item.removeAttribute('disabled');
            }
        });
    }

    if ([...root.classList].includes('theme-light')) {
        setDisabled('light');
    } else if ([...root.classList].includes('theme-dark')) {
        setDisabled('dark');
    } else {
        setDisabled('auto');
    }

    themeButtons.forEach((button) => {
        button.onclick = () => {
            const t = button.getAttribute('data-theme');
            changeTheme(t);
            setDisabled(t);
        };
    });
});