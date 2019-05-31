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
let currentPage = 1;

// Data
let cityId;
let cityName;
let countryName;
let listJSON;
let cities;

// Tokens and API Keys
mapboxgl.accessToken =
	"pk.eyJ1IjoiYW5ua2FsaXphIiwiYSI6ImNqdnh6YXJnZDBhaTQzeWxzeTJuamEzdW0ifQ.bJwGt5e7mf5ntMZHzwkAjQ";
const mapboxStyle = "mapbox://styles/annkaliza/cjvxzfghg38wm1cmuz3q2l2u7";

// Setup elements and event listeners
window.onload = async function() {
	// Get components
	searchBox = document.getElementById("searchBox");
	searchBox.value = await getUserLocation();
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
	citySelector.addEventListener("change", citySelectorClicked);
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

			listJSON = await fetchRestaurantsByCity(cityId, currentPage);
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
	showLoader();
	listJSON = await fetchRestaurantsByCity(cityId, currentPage);
	hideLoader();
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
	let listCities = dataJSON.location_suggestions;

	let html = "";
	listCities.forEach(city => {
		html += `<option value=${city.id}>${city.name}</option>`;
	});
	container.innerHTML = html;
}

// Populate table with a list of restaurants
function loadRestaurantList(container, dataJSON) {
	if (dataJSON.results_shown > 0) {
		let list = dataJSON.restaurants;
		let restaurantsHTML = "";
		list.forEach((item, index) => {
			// console.log(restaurant.restaurants);
			restaurantsHTML += `
						<tr data-index="${index}">
							<td>${item.restaurant.name}</td>
							<td>${item.restaurant.location.address}</td>
						</tr>`;
		});

		container.innerHTML = restaurantsHTML;

		// Don't remove the following lines
		addTableEventListeners();
	} else {
		container.innerHTML = "No more results.";
	}
	renderPagination(pagination, dataJSON);
}

// Add information to the Restaurant Details component
function renderRestaurantDetails(container, dataJSON) {
	let imageUrl = dataJSON.featured_image;

	if (imageUrl == "unknown" || imageUrl == "") {
		imageUrl = "./img/noimage.png";
	}

	let restaurantDetailsHTML = `
    <div class="card" style="width: 18rem;">
    	<img
            class="card-img-top"
            src="${imageUrl}"
            alt="Card image cap"
        />
        <div class="card-body">
            <h5 class="card-title">${dataJSON.name}</h5>
            <ul class="restaurant-info">
                <li>
                    <span class="info-label">Cuisines: </span>
                    <span class="info-text">${dataJSON.cuisines}</span>
                </li>
                <li>
                    <span class="info-label">Avg price for 2: </span>
                    <span class="info-text">${
											dataJSON.average_cost_for_two
										}</span>
                </li>
                <div class="row rating">
                    <div class="col stars">
                    ${createStar(dataJSON.user_rating.aggregate_rating)}
                    </div>
                    <div class="col votes">
                        <span class="badge badge-primary">${
													dataJSON.user_rating.votes
												}</span>
                    </div>
                </div>
            </ul>
		</div>
		<div class="card-footer text-muted">
			<div class="row">
				<div class="col text-center">
					<a
						href="${dataJSON.url}"
						target="_blank"
						class="card-link"
						><i class="fas fa-globe"></i
					></a>
				</div>
				<div class="col text-center">
					<a
						href="${dataJSON.menu_url}"
						target="_blank"
						class="card-link"
						><i class="fas fa-utensils"></i
					></a>
				</div>
			</div>
		</div>
	</div>`;
	container.innerHTML = restaurantDetailsHTML;
	// console.log(dataJSON);
}

// Create pagination according to total number of results nad results shown
function renderPagination(container, dataJSON) {
	// console.log(dataJSON);
	let shown = dataJSON.results_shown;
	let count = 20;
	let results = dataJSON.results_found;
	let numPages = Math.ceil(results / count);
	if (shown <= 0) {
		numPages = currentPage;
	}
	if (numPages > 1) {
		let startPageLink = Math.floor((currentPage - 1) / 5) + 1;

		let paginationHTML = `<li class="page-item ${
			currentPage <= 1 ? "disabled" : ""
		}"><span class="page-link">Previous</span></li>`;

		let page;
		for (
			page = startPageLink;
			page < startPageLink + Math.min(5, numPages);
			page++
		) {
			paginationHTML += `<li class="page-item ${
				page === currentPage ? "active" : ""
			}"><span class="page-link">${page}</span></li>`;
		}

		paginationHTML += `<li class="page-item ${
			page < numPages ? "" : "disabled"
		}"><span class="page-link">Next</span></li>`;

		container.innerHTML = paginationHTML;
	}

	let pageLinks = document.querySelectorAll("#pagination span.page-link");

	pageLinks.forEach(link => {
		let text = link.innerText;
		let pageNumber = 1;
		if (Number.isInteger(parseInt(text))) {
			pageNumber = parseInt(text);
		} else if (text == "Previous") {
			pageNumber = currentPage - 1;
		} else if (text == "Next") {
			pageNumber = currentPage + 1;
		}
		link.addEventListener("click", () => {
			loadPage(pageNumber);
		});
	});
}

async function loadPage(pageNumber) {
	currentPage = pageNumber;
	showLoader();
	listJSON = await fetchRestaurantsByCity(cityId, currentPage);
	hideLoader();
	loadRestaurantList(restList, listJSON);
}

// Table title with city and country
function renderTitle(container, city, country) {
	container.innerHTML = `<h2>Restaurants in <span id="rest-city">${city}</span>, <span id="rest-country">${country}</span></h2>`;
}

// Show map using mapbox api
function renderMap(map, longitude, latitude) {
	map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/annkaliza/cjvxzfghg38wm1cmuz3q2l2u7",
		center: [-75.765, 45.4553],
		zoom: 16
	});

	map.jumpTo({ center: [longitude, latitude] });

	new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
}

function createStar(rating) {
	console.log(rating);
	let starHtml = "";
	let fullStar = `<i class="fas fa-star"></i>`;
	let halfStar = `<i class="fas fa-star-half-alt"></i>`;
	let emptyStar = `<i class="far fa-star"></i>`;

	for (i = 1; i <= 5; i++) {
		if (i <= rating) {
			starHtml += fullStar;
		} else if (i > rating && rating < i + 1) {
			starHtml += halfStar;
		} else {
			starHtml += emptyStar;
		}
	}
	return starHtml;
}
