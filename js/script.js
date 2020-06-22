// ------------------------------------------
// FETCH FUNCTIONS
// ------------------------------------------
const getJSON = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw error;
    }
}

const getRandomUsers = async(url) => {
    randomUsers = await getJSON(url);
    return randomUsers.results;
}


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
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
// GET DATA
// ------------------------------------------
let directory = new Directory();
directory.init();


// ------------------------------------------
// SELECTORS
// ------------------------------------------
const gallery = document.querySelector('#gallery');
const search = document.querySelector('#search-submit');

// ------------------------------------------
// EVENT LISTENERS
// ------------------------------------------
search.addEventListener('click', e => {
    e.preventDefault();
    const filter = document.querySelector('#search-input').value.toLowerCase();
    directory.filterUsers(filter);
});

