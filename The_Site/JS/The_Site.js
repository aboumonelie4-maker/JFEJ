document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('appContainer');
    const btnToggleSidebar = document.getElementById('btnToggleSidebar');
    const btnSearch = document.getElementById('btnSearch');
    const searchPanel = document.getElementById('searchPanel');
    const btnMore = document.getElementById('btnMore');
    const morePopup = document.getElementById('morePopup');
    const btnTheme = document.getElementById('btnTheme');
    const themeLabel = document.getElementById('themeLabel');
    const currentUserRaw = sessionStorage.getItem('jfej_current_user');
    const savedTheme = localStorage.getItem('JFEJ-theme') || 'light';

    const setTheme = (theme) => {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('light-mode', !isDark);
        if (btnTheme) {
            btnTheme.setAttribute('aria-pressed', String(isDark));
            const icon = btnTheme.querySelector('.JFEJ-link-icon');
            if (icon) icon.textContent = isDark ? '☀️' : '🌙';
        }
        if (themeLabel) themeLabel.textContent = isDark ? 'Passer au mode clair' : 'Passer au mode sombre';
    };

    setTheme(savedTheme);

    if (currentUserRaw) {
        const currentUser = JSON.parse(currentUserRaw);
        const firstName = currentUser.prenom || 'Élève';
        const lastName = currentUser.nom || '';
        const avatar = document.querySelector('.JFEJ-user .JFEJ-avatar');
        const username = document.querySelector('.JFEJ-user .JFEJ-username');
        const userRole = document.querySelector('.JFEJ-user .JFEJ-userrole');

        if (avatar) avatar.textContent = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        if (username) username.textContent = `${firstName} ${lastName}`.trim();
        if (userRole) userRole.textContent = currentUser.classe || 'Élève';
    }

    // Réduire / Agrandir le menu
    if (btnToggleSidebar) {
        btnToggleSidebar.addEventListener('click', () => {
            appContainer.classList.toggle('is-collapsed');
            btnToggleSidebar.textContent = appContainer.classList.contains('is-collapsed') ? '▶' : '◀';
        });
    }

    // Ouvrir / Fermer le panneau de recherche
    if (btnSearch && searchPanel) {
        btnSearch.addEventListener('click', (e) => {
            e.preventDefault();
            searchPanel.classList.toggle('is-open');
        });
    }

    // Pop-up "Plus"
    if (btnMore && morePopup) {
        btnMore.addEventListener('click', (e) => {
            e.preventDefault();
            const isVisible = morePopup.classList.toggle('is-visible');
            btnMore.setAttribute('aria-expanded', String(isVisible));
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.JFEJ-more-wrapper')) {
                morePopup.classList.remove('is-visible');
                btnMore.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                morePopup.classList.remove('is-visible');
                btnMore.setAttribute('aria-expanded', 'false');
                btnMore.focus();
            }
        });
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('JFEJ-theme', nextTheme);
            setTheme(nextTheme);
        });
    }
});