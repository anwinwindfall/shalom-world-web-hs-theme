const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeIcon = document.getElementById('closeIcon');

const logo = document.querySelector('.header-box .logo')
const userIconSpan = document.querySelector('.user-icon span');
const signInBtn = document.querySelector(".sign-in-btn")
const userIcon = document.querySelector(".user-icon")
// Open mobile nav
menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active'); // Slide down and become visible
});

// Close mobile nav
closeIcon.addEventListener('click', () => {
    mobileNav.classList.remove('active'); // Slide up and hide
});

logo.addEventListener('click', () => {
    window.location.href = 'https://prayer.shalomworld.org/prayer-campaign';
})



let user = localStorage.getItem('sw_election_campaign_user_name_avatar');


if (user) {

    userIconSpan.innerHTML = user;

    signInBtn.style.display = "none"
} else {

    // userIconSpan.innerHTML = '&#xf2bd;';
    signInBtn.style.display = "block"
    userIcon.style.display = "none"
    // userIconSpan.computedStyleMap.color = '#FFFF';
}
