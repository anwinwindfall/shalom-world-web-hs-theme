const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeIcon = document.getElementById('closeIcon');

const logo = document.querySelector('.header-box .logo')

// Open mobile nav
menuToggle.addEventListener('click', () => {
    mobileNav.classList.add('active'); // Slide down and become visible
});

// Close mobile nav
closeIcon.addEventListener('click', () => {
    mobileNav.classList.remove('active'); // Slide up and hide
});

logo.addEventListener('click', () => {
    window.location.href = 'https://swprayer.org/'
})
