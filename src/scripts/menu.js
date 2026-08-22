const menu = document.querySelector('.menu');
const navLinks = document.querySelector('#main-menu');

menu?.addEventListener('click', () => {
    const isExpanded = menu.getAttribute('aria-expanded') === 'true';
    const nextState = `${!isExpanded}`;

    menu.setAttribute('aria-expanded', nextState);
    navLinks?.classList.toggle('is-open', !isExpanded);
});
