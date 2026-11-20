/* MOBILE VIEW HAMBURGER MENU */


const  navigation = document.querySelector ('.navigation');

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu')
    const mobileMenu = document.querySelector('.mobile-menu')

    hamburgerMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('open')
    })
})

const segmentedControl = document.getElementById('toggle-switch');
const buttons = segmentedControl.querySelectorAll('.segment');
const ingredientTexts = document.querySelectorAll('.ingredient-text');





/* FOOD PORTION MULTIPLIER 2X/4X */


function scaleQuantity(text, multiplier) {
    
    const regex = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)/;
    
    return text.replace(regex, (match) => {
        let value = 0;
        
        if (match.includes(' ')) {
           
            let parts = match.split(/\s+/);
            let whole = parseFloat(parts[0]);
            let fracParts = parts[1].split('/');
            value = whole + (parseFloat(fracParts[0]) / parseFloat(fracParts[1]));
        } else if (match.includes('/')) {
            
            let fracParts = match.split('/');
            value = parseFloat(fracParts[0]) / parseFloat(fracParts[1]);
        } else {
            
            value = parseFloat(match);
        }
        
        let multiplied = value * multiplier;
        
        
        return formatNumber(multiplied);
    });
}

function formatNumber(num) {
    if (num === 0.5) return '1/2';
    if (num === 0.25) return '1/4';
    if (num === 0.75) return '3/4';
    if (num === 1.5) return '1 1/2';
    if (num === 2.5) return '2 1/2';

    return Number.isInteger(num) ? num : num.toFixed(1).replace(/\.0$/, '');
}


buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const value = this.getAttribute('data-value');
        
        if (value === '4x') {
            segmentedControl.classList.add('slide-right');
           
            ingredientTexts.forEach(el => {
                let original = el.getAttribute('data-original');
                el.textContent = scaleQuantity(original, 2);
            });
        } else {
            segmentedControl.classList.remove('slide-right');
            
            ingredientTexts.forEach(el => {
                el.textContent = el.getAttribute('data-original');
            });
        }
    });
});