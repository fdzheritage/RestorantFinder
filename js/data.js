let categorySelect;
let searchButton;
let searchBox;

window.onload = async function () {
    categorySelect = document.getElementById('categories');
    searchBox = document.getElementById('searchBox');
    searchButton = document.getElementById('searchButton');

    // Check if categories are stored in client
    let categoriesJSON = localStorage.getItem('categories');
    if (!categoriesJSON) {
        categoriesJSON = await fetchCategories();
        localStorage.setItem('categories', JSON.stringify(categoriesJSON));
    } else {
        categoriesJSON = JSON.parse(categoriesJSON);
        //console.log('categories loaded from local storage');
    }

    loadCategories(categorySelect, categoriesJSON);


    searchButton.addEventListener('click', async () => {
        let query = searchBox.value.trim();
        let locationJSON = await searchLocation(query);
        console.log(locationJSON);
    });
}


/*   START ZOMATO API SETTINGS */
let zomato = {};
zomato.endPoint = 'https://developers.zomato.com/api/v2.1/';
zomato.init = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
        'Accept': 'application/json',
        'user-key': 'dd0bd5a709e94d4b8ebce601ad243771'
    }
};
/*   END ZOMATO API SETTINGS */


// Return json 
async function fetchCategories() {
    let resource = `${zomato.endPoint}/categories`;
    response = await fetch(resource, zomato.init);
    json = await response.json();
    return json;
}


function loadCategories(element, dataJSON) {
    categoriesHTML = ``;
    let { categories } = dataJSON;
    categories.forEach(category => {
        let { id, name } = category.categories;
        categoriesHTML +=
            `<option value="${id}">${name}</option>`;
    });
    element.innerHTML = categoriesHTML;
}


async function searchLocation(query) {
    let resource = `${zomato.endPoint}/locations?query=${query}`;
    response = await fetch(resource, zomato.init);
    json = await response.json();
    return json;
}