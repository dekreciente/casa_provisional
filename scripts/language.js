let currentLanguage = 'en'; // Default language

// Function to load content based on selected language
function loadLanguage(language) {
    console.log(`Changing language to: ${language}`); // Log language switch
    currentLanguage = language;

    // Determine the current page based on the URL (you can adjust this if needed)
    const currentPage = window.location.pathname.split('/').pop().split('.')[0]; // Extract the page name from URL

    // Fetch the correct JSON file based on the selected language and page
    fetch(`/locales/${currentPage}_${language}.json`)  // <-- FIXED: use absolute path from domain root
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load the ${currentPage}_${language}.json file`);
            }
            return response.json();  // Parse the JSON response
        })
        .then(data => {
            console.log(data); // Log the data to see if the correct content is being fetched

            // Update content dynamically based on the page
            if (currentPage === 'index') {
                document.getElementById('home-text').innerHTML = data['home-text'];
            } else if (currentPage === 'located') {
                document.getElementById('located-title').innerHTML = data['located']['located-title'];
                document.getElementById('located-intro').innerHTML = data['located']['located-intro'];
                document.getElementById('train-title').innerHTML = data['located']['train-title'];
                document.getElementById('train-info').innerHTML = data['located']['train-info'];
                // Update other sections similarly for 'located' page
            }
            // Add more conditions for other pages (if applicable)
        })
        .catch(error => {
            console.error("Error loading language data:", error); // Log any error
            document.getElementById('home-text').innerHTML = "Failed to load language content.";
        });
}

// Call the loadLanguage function on page load with the default language (EN)
document.addEventListener('DOMContentLoaded', function() {
    loadLanguage(currentLanguage);
});
