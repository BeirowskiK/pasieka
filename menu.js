const mobileMenuIcon = document.querySelector('#mobile-menu-icon');
const menu = document.querySelector('nav ul');

mobileMenuIcon.addEventListener('click', () => {
    console.log('KLIK');
    menu.classList.toggle('visible');
    menu.classList.toggle('invisible');
});