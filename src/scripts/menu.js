const menu = document.querySelector('.menu');
const navLinks = document.querySelector('#main-menu');
const desktopQuery = window.matchMedia('(min-width: 636px)');

const closeMenu = () => {
    menu?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('is-open');
};

menu?.addEventListener('click', () => {
    const isExpanded = menu.getAttribute('aria-expanded') === 'true';
    const nextState = `${!isExpanded}`;

    menu.setAttribute('aria-expanded', nextState);
    navLinks?.classList.toggle('is-open', !isExpanded);
});

desktopQuery.addEventListener('change', ({ matches }) => {
    if (matches) {
        closeMenu();
    }
});
