// Global Variables

// Components
let searchButton;
let searchBox;
let detailsButton;
let citySelector;
let restList;
let selectCityModal;
let tableRows;
let restaurantDetails;
let pagination;
let title;
let loader;
let map;

// Data
let cityId;
let cityName;
let countryName;
let listJSON;
let cities;

// Tokens and API Keys
mapboxgl.accessToken =
	"pk.eyJ1IjoiZmR6aGVyaXRhZ2UiLCJhIjoiY2p2eHphNDMzMGFncTRhbXFjMng2Z3phNyJ9.1dI5Wg2gw_JHsA85nzldUA";

// Setup elements and event listeners
window.onload = async function() {
	// Get components
	searchBox = document.getElementById("searchBox");
	searchButton = document.getElementById("searchButton");
	detailsButton = document.getElementById("detailsButton");
	citySelector = document.getElementById("citySelector");
	restList = document.getElementById("rest-list");
	restaurantDetails = document.getElementById("restaurantDetails");
	pagination = document.getElementById("pagination");
	title = document.getElementById("title");
	loader = document.getElementById("wait-icon");
	map = document.getElementById("map");

	// Add Event Listeners
	searchButton.addEventListener("click", searchButtonPressed);
	searchBox.addEventListener("keyup", searchBoxKeyPressed);
	$("#selectCityModal").on("hide.bs.modal", citySelectionCanceled);
	// citySelector.addEventListener("click", citySelectorClicked);

	// Testing, remove following line from production
	addTableEventListeners();
};

// Functions that handle events from event listeners
function addTableEventListeners() {
	tableRows = document.querySelectorAll("#rest-list tr");
	tableRows.forEach(row => {
		row.addEventListener("click", rowClicked);
	});
}

function searchBoxKeyPressed(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		searchButton.click();
	}
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
			$("#selectCityModal").modal("show");
		}
		hideLoader();
	}
}

function citySelectionCanceled() {
	citySelected();
}

function citySelectorClicked() {
	citySelected();
	$("#selectCityModal").modal("hide");
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

	// Set the active row
	let activeRows = document.querySelectorAll(
		'#rest-list tr[class="table-active"]'
	);
	activeRows.forEach(row => {
		row.classList.remove("table-active");
	});
	this.classList.add("table-active");

	// Make sure the data is loaded and data exists
	if (listJSON) {
		if (listJSON.restaurants.length > index) {
			let selectRest = listJSON.restaurants[index].restaurant;
			renderRestaurantDetails(restaurantDetails, selectRest);
			renderMap(
				map,
				selectRest.location.longitude,
				selectRest.location.latitude
			);
		}
	}
}

// Functions that render elements on the page using data from web services

// Show loading spinner
function showLoader() {
	loader.classList.add("show");
}

// Hide loading spinner
function hideLoader() {
	loader.classList.remove("show");
}

// Populate dropdown with sugested cities
function loadCitySelector(container, dataJSON) {
	// console.log(dataJSON);
	// TODO
	// To be completed by Krasimir
	let listCities = dataJSON.location_suggestions;
	// console.log(listCities);
	let html = "";
	listCities.forEach(city => {
		html += `<option value=${city.id}>${city.name}</option>`;
	});
	container.innerHTML = html;
	// container.innerHTML = `<option value="295">Your Options Go Here</option>`;
	//console.log(dataJSON);
}

// Populate table with a list of restaurants
function loadRestaurantList(container, dataJSON) {
	// TODO
	// To be completed by Krasimir
	//container.innerHTML = `<tr><td>Your table body goes here</td><td>and here</td></tr>`;
	// console.log(dataJSON);

	// Don't remove the following lines
	addTableEventListeners();
	renderPagination(pagination, dataJSON);
}

// Add information to the Restaurant Details component
function renderRestaurantDetails(container, dataJSON) {
	// TODO
	// To be completed by Krasimir
	container.innerHTML = `YOUR RESTAURANT DETAILS HERE`;
	// console.log(dataJSON);
}

// Create pagination according to total number of results nad results shown
function renderPagination(container, dataJSON) {
	// TODO
	// To be completed by Krasimir
	container.innerHTML = `YOUR PAGINATION GOES HERE`;
	// console.log(dataJSON);
}

// Table title with city and country
function renderTitle(container, city, country) {
	// TODO
	// To be completed by Anna
	container.innerHTML = `YOUR TITLE HERE`;
	// console.log(city, country);
}

// Show map using mapbox api
function renderMap(container, longitud, latitud) {
	// TODO
	// To be completed by Anna
	// Use code from mabbox
	// console.log(longitud, latitud);
}
