let currentLanguage = 'en'; // Default language

// Function to load content based on selected language
function loadLanguage(language) {
  console.log(`Changing language to: ${language}`);
  currentLanguage = language;

  // Determine the current page name from URL
  const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
  const jsonPath = `/locales/${currentPage}_${language}.json`;

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${currentPage}_${language}.json (HTTP ${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Loaded language data:", data);

      if (currentPage === 'index') {
        const homeTextElem = document.getElementById('home-text');
        if (homeTextElem) {
          homeTextElem.innerHTML = data['home-text'] || "Content not available.";
        }
      } else if (currentPage === 'located') {
        updateLocatedPageContent(data['located']);
      }
      // Add more page handlers here if needed
    })
    .catch(error => {
      console.error("Error loading language data:", error);
      const homeTextElem = document.getElementById('home-text');
      if (homeTextElem) {
        homeTextElem.innerHTML = "Failed to load language content.";
      }
    });
}

// Helper to update content for the 'located' page
function updateLocatedPageContent(locatedData) {
  if (!locatedData) {
    console.warn("No data for 'located' page.");
    return;
  }

  setInnerHTMLById('located-title', locatedData['located-title']);
  setInnerHTMLById('located-intro', locatedData['located-intro']);
  setInnerHTMLById('train-title', locatedData['train-title']);
  setInnerHTMLById('train-info', locatedData['train-info']);
}

// Utility function to set innerHTML safely
function setInnerHTMLById(id, content) {
  const elem = document.getElementById(id);
  if (elem) {
    elem.innerHTML = content || '';
  } else {
    console.warn(`Element with ID '${id}' not found.`);
  }
}
