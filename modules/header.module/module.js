const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeIcon = document.getElementById('closeIcon');

// Open mobile nav
menuToggle.addEventListener('click', () => {
    mobileNav.classList.add('active'); // Slide down and become visible
});

// Close mobile nav
closeIcon.addEventListener('click', () => {
    mobileNav.classList.remove('active'); // Slide up and hide
});