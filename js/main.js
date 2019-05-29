// Global Variables

// Components
let searchButton;
let searchBox;
let detailsButton;
let citySelector;
let restList;
let selectCityModal
let tableRows;
let restaurantDetails;
let pagination;
let title;
let loader;


// Data
let cityId;
let cityName;
let countryName;
let listJSON;
let cities;

// Tokens and API Keys
mapboxgl.accessToken = 'pk.eyJ1IjoiZmR6aGVyaXRhZ2UiLCJhIjoiY2p2eHphNDMzMGFncTRhbXFjMng2Z3phNyJ9.1dI5Wg2gw_JHsA85nzldUA';

// Setup elements and event listeners
window.onload = async function () {
    // Get components
    searchBox = document.getElementById('searchBox');
    searchButton = document.getElementById('searchButton');
    detailsButton = document.getElementById('detailsButton');
    citySelector = document.getElementById('citySelector');
    restList = document.getElementById('rest-list');
    restaurantDetails = document.getElementById('restaurantDetails');
    pagination = document.getElementById('pagination');
    title = document.getElementById('title');
    loader = document.getElementById('wait-icon');


    // Add Event Listeners
    searchButton.addEventListener('click', searchButtonPressed);
    $('#selectCityModal').on('hide.bs.modal', citySelectionCanceled);
    citySelector.addEventListener('click', citySelectorClicked);

}


// Functions that handle events from event listeners
function addTableEventListeners() {
    tableRows = document.querySelectorAll('#rest-list tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', rowClicked);
    });
}

async function searchButtonPressed() {
    let query = searchBox.value.trim();
    if (query == "") {
        alert("Please enter the name of a city on the search box");
    } else {
        showLoader();
        let citiesJSON = await searchCity(query);
        cities = citiesJSON.location_suggestions;
        let results = cities.length;
        if (results < 1) {
            // If no results, inform the user that no cities were found

            // TODO write message on the page results instead of alert
            alert(`No city found with the name "${query}"`);

        } else if (results == 1) {
            // If there is only one city, don't ask the user
            cityId = cities[0].id;
            cityName = cities[0].name;
            countryName = cities[0].countryName;
            renderTitle(title, cityName, countryName);

            listJSON = await fetchRestaurantsByCity(cityId);
            loadRestaurantList(restList, listJSON);
        } else {
            // If more than one city, ask user to select one
            loadCitySelector(citySelector, citiesJSON);
            $('#selectCityModal').modal('show');
        }
        hideLoader();
    }
}

function citySelectionCanceled() {
    citySelected();
}

function citySelectorClicked() {
    citySelected();
    $('#selectCityModal').modal('hide');
}

async function citySelected() {
    cityId = citySelector.value;
    cityName = cities[citySelector.selectedIndex].name;
    countryName = cities[citySelector.selectedIndex].country_name;
    listJSON = await fetchRestaurantsByCity(cityId);
    renderTitle(title, cityName, countryName);
    loadRestaurantList(restList, listJSON);
}

function rowClicked() {
    let index = this.dataset.index;
    // Make sure the data is loaded and data exists
    if (listJSON) {
        if (listJSON.restaurants.length > index) {
            renderRestaurantDetails(restaurantDetails, listJSON.restaurants[index].restaurant);
        }
    }
}



// Functions that render elements on the page using data from web services
function showLoader() {
    loader.classList.add("show");
}

function hideLoader() {
    loader.classList.remove("show");
}


function loadCitySelector(container, dataJSON) {
    // To be completed by Krasimir
    container.innerHTML = `<option value="295">Your Options Go Here</option>`;
    // console.log(dataJSON);
}

function loadRestaurantList(container, dataJSON) {
    // To be completed by Krasimir
    container.innerHTML = `<tr><td>Your table body goes here</td><td>and here</td></tr>`;

    // Don't remove the following lines
    addTableEventListeners();
    renderPagination(pagination, dataJSON);
}

function renderRestaurantDetails(container, dataJSON) {
    // To be completed by Krasimir 
    container.innerHTML = `YOUR RESTAURANT DETAILS HERE`;
}


function renderPagination(container, dataJSON) {
    console.log(container);
    // To be completed by Krasimir
    container.innerHTML = `YOUR PAGINATION GOES HERE`;
}

function renderTitle(container, city, country) {
    // To be completed by Anna
    console.log(city, country);
    container.innerHTML = `YOUR TITLE HERE`;
}

function renderMap(container, longitud, latitud) {
    // To be completed by Anna
    // Use code from mabbox
}


