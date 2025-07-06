let currentLanguage = 'en'; // Default language

// Function to load content based on selected language
function loadLanguage(language) {
  console.log(`Changing language to: ${language}`);
  currentLanguage = language;

  // Determine current page name
  const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';

  // Build full URL for JSON file
  const jsonUrl = `${window.location.origin}/locales/${currentPage}_${language}.json`;
  console.log(`Fetching: ${jsonUrl}`);

  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${currentPage}_${language}.json (HTTP ${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Loaded language data:", data);

      if (currentPage === 'index') {
        updateElementInnerHTML('home-text', data['home-text']);
      } else if (currentPage === 'located') {
        updateLocatedPageContent(data['located']);
      }
      // Add more pages if needed
    })
    .catch(error => {
      console.error("Error loading language data:", error);
      updateElementInnerHTML('home-text', "Failed to load language content.");
    });
}

// Helper to update DOM elements safely
function updateElementInnerHTML(id, content) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = content || '';
  } else {
    console.warn(`Element with ID '${id}' not found.`);
  }
}

// Helper to update 'located' page content
function updateLocatedPageContent(locatedData) {
  if (!locatedData) {
    console.warn("No 'located' data found in JSON.");
    return;
  }

  updateElementInnerHTML('located-title', locatedData['located-title']);
  updateElementInnerHTML('located-intro', locatedData['located-intro']);
  updateElementInnerHTML('train-title', locatedData['train-title']);
  updateElementInnerHTML('train-info', locatedData['train-info']);
}
