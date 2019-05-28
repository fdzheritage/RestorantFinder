let categorySelect;
let searchButton;
let searchBox;
let detailsButton;

window.onload = async function () {
    categorySelect = document.getElementById('categories');
    searchBox = document.getElementById('searchBox');
    searchButton = document.getElementById('searchButton');
    detailsButton = document.getElementById('detailsButton');

    // Check if categories are stored in client
    let categoriesJSON = localStorage.getItem('categories');
    if (!categoriesJSON) {
        categoriesJSON = await fetchCategories();
        localStorage.setItem('categories', JSON.stringify(categoriesJSON));
    } else {
        categoriesJSON = JSON.parse(categoriesJSON);
        //console.log('categories loaded from local storage');
    }

    // loadCategories(categorySelect, categoriesJSON);


    searchButton.addEventListener('click', async () => {
        let container = document.getElementById("list-of-restaurants");
        
        let dataJSON = {
            name: "Bastardo Tacos",
            address: "123 rue"
        }


        let query = searchBox.value.trim();
        let locationJSON = await searchLocation(query);
        loadRestaurantList(container, dataJSON );
    });

    detailsButton.addEventListener('click', async () => {
        let restaurantID = 3700835; // Just for testing, will delete later
        let dataJSON = fetchRestaurantDetails(restaurantID);
        let restaurantDetails = document.getElementById('reataurant-details');
        loadRestaurantList( restaurantDetails, dataJSON);
    });
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


function loadRestaurantList(container, dataJSON ) {
    // To be completed by Krasimir


    container.innerHTML = `
        <div>
            <h2>${dataJSON.name}</h2>
        </div>
    `;
}

function showRestaurantDetails(container, dataJSON) {
    // To be completed by Anna
    container.innerHTML = `
        <div>
            <pre>
                ${JSON.stringify(dataJSON)}
            </pre>
        </div>
    `;
}

