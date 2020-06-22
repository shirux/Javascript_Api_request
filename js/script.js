// ------------------------------------------
// FETCH FUNCTIONS
// ------------------------------------------
/**
 * Parse a promise from a fetch to a json format
 * @param {string} url URL to fetch
 */
const getJSON = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw error;
    }
}

/**
 * Grab random users from the url passed as argument
 * @param {string} url endpoint of the randomUsers API
 */
const getRandomUsers = async(url) => {
    randomUsers = await getJSON(url);
    return randomUsers.results;
}


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
/**
 * Customized method to create a new HTML Element with all its attributes and text content
 * @param {string} tag HTML Tag
 * @param {Object} values Object representing attributes to be set
 * @param {string} textContent Text content of the HTML element
 */
const createHTMLElement = (tag, values = {}, textContent = '') => {
    const element = document.createElement(tag);
    for (const property in values) {
        element.setAttribute(property, values[property]);
    }
    if(textContent) {
        element.textContent = textContent;
    }
    return element;
}

// ------------------------------------------
// SELECTORS
// ------------------------------------------
const gallery = document.querySelector('#gallery');
const search = document.querySelector('#search-submit');


// ------------------------------------------
// EVENT LISTENERS
// ------------------------------------------
/**
 * Filters every employee according to the search value
 */
search.addEventListener('click', e => {
    e.preventDefault();
    const filter = document.querySelector('#search-input').value.toLowerCase();
    directory.filterEmployees(filter);
});


// ------------------------------------------
// GET DATA
// ------------------------------------------
// starts the app
let directory = new Directory();
directory.init();
