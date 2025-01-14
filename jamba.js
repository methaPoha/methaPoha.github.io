// Footer Year Updater Script
// This script automatically updates elements with class 'footer-date' 
// to show the current year across all pages

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Updates all footer date elements with the current year
     * @returns {void}
     */
    function updateFooterYear() {
        // Get current year
        const currentYear = new Date().getFullYear();
        
        // Find all elements with class 'footer-date'
        const footerElements = document.getElementsByClassName('footer-date');
        
        // Convert HTMLCollection to Array for easier logging
        const elementsArray = Array.from(footerElements);
        
        if (elementsArray.length === 0) {
            console.warn('No elements with class "footer-date" found on the page');
            return;
        }
        
        // Update each footer element
        elementsArray.forEach((element, index) => {
            try {
                element.textContent = currentYear.toString();
                // console.log(`Successfully updated footer date element ${index + 1}`);
            } catch (error) {
                console.error(`Error updating footer date element ${index + 1}:`, error);
            }
        });
        
        // console.log(`Updated ${elementsArray.length} footer date elements to year ${currentYear}`);
    }
    
    // Call the function when the DOM is ready
    try {
        updateFooterYear();
    } catch (error) {
        console.error('Failed to update footer year:', error);
    }
});