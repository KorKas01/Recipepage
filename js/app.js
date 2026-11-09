const  navigation = document.querySelector ('.navigation');

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu')
    const mobileMenu = document.querySelector('.mobile-menu')

    hamburgerMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('open')
    })
})

const buttons = document.querySelectorAll('.segmented-control .segment');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});