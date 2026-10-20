document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('appContainer');
    const btnToggleSidebar = document.getElementById('btnToggleSidebar');
    const btnSearch = document.getElementById('btnSearch');
    const searchPanel = document.getElementById('searchPanel');
    const btnMore = document.getElementById('btnMore');
    const morePopup = document.getElementById('morePopup');

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
            morePopup.classList.toggle('is-visible');
        });
    }
});