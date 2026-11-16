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

// Helper function to scale numbers and fractions in strings
function scaleQuantity(text, multiplier) {
    // Regular expression to catch leading numbers, mixed numbers (e.g., "1 1/2"), or simple fractions (e.g., "1/4")
    const regex = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)/;
    
    return text.replace(regex, (match) => {
        let value = 0;
        
        if (match.includes(' ')) {
            // Handle mixed numbers like "1 1/2"
            let parts = match.split(/\s+/);
            let whole = parseFloat(parts[0]);
            let fracParts = parts[1].split('/');
            value = whole + (parseFloat(fracParts[0]) / parseFloat(fracParts[1]));
        } else if (match.includes('/')) {
            // Handle simple fractions like "1/4"
            let fracParts = match.split('/');
            value = parseFloat(fracParts[0]) / parseFloat(fracParts[1]);
        } else {
            // Handle regular numbers like "2" or "28"
            value = parseFloat(match);
        }
        
        let multiplied = value * multiplier;
        
        // Convert back to a clean fraction string if it equals common fractions, otherwise keep decimal/whole
        return formatNumber(multiplied);
    });
}

// Convert numbers back into clean fractions if applicable
function formatNumber(num) {
    if (num === 0.5) return '1/2';
    if (num === 0.25) return '1/4';
    if (num === 0.75) return '3/4';
    if (num === 1.5) return '1 1/2';
    if (num === 2.5) return '2 1/2';
    // Remove trailing .0 if it's a whole number
    return Number.isInteger(num) ? num : num.toFixed(1).replace(/\.0$/, '');
}

// Button click handlers
buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const value = this.getAttribute('data-value');
        
        if (value === '4x') {
            segmentedControl.classList.add('slide-right');
            // Double the quantities (2x base * 2 = 4x total)
            ingredientTexts.forEach(el => {
                let original = el.getAttribute('data-original');
                el.textContent = scaleQuantity(original, 2);
            });
        } else {
            segmentedControl.classList.remove('slide-right');
            // Revert back to original baseline quantities
            ingredientTexts.forEach(el => {
                el.textContent = el.getAttribute('data-original');
            });
        }
    });
});