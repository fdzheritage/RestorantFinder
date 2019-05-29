let categorySelect;
let searchButton;
let searchBox;
let detailsButton;

window.onload = async function() {
	categorySelect = document.getElementById("categories");
	searchBox = document.getElementById("searchBox");
	searchButton = document.getElementById("searchButton");
	detailsButton = document.getElementById("detailsButton");

	// Check if categories are stored in client
	let categoriesJSON = localStorage.getItem("categories");
	if (!categoriesJSON) {
		categoriesJSON = await fetchCategories();
		localStorage.setItem("categories", JSON.stringify(categoriesJSON));
	} else {
		categoriesJSON = JSON.parse(categoriesJSON);
		//console.log('categories loaded from local storage');
	}

	// loadCategories(categorySelect, categoriesJSON);

	searchButton.addEventListener("click", async () => {
		let container = document.getElementById("list-of-restaurants");
		let query = searchBox.value.trim();

		let locationJSON = await searchLocation(query);
		//console.log(locationJSON.location_suggestions[0].city_id);
		let cityId = locationJSON.location_suggestions[0].city_id;
		let countryName = locationJSON.location_suggestions[0].country_name;
		let dataJSON = await fetchRestaurantsByCity(cityId);
		// let dataCountryJSON = await fetchRestai                              //New code thi line Krasimir
		loadRestaurantList(container, dataJSON, countryName);
	});
};

function loadCategories(element, dataJSON) {
	categoriesHTML = ``;
	let { categories } = dataJSON;
	categories.forEach(category => {
		let { id, name } = category.categories;
		categoriesHTML += `<option value="${id}">${name}</option>`;
	});
	element.innerHTML = categoriesHTML;
}

function loadRestaurantList(container, dataJSON, countryName) {
	console.log(dataJSON);
	// To be completed by Krasimir
	let list = dataJSON.restaurants;
	let restaurantsHTML = `<table class="table">
        <thead>
            <tr>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">Country</th>
            </tr>
        </thead>
        <tbody>
	`;

	list.forEach(item => {
		// console.log(restaurant.restaurants);
		restaurantsHTML += `
                <tr>
                    <td>${item.restaurant.name}</td>
                    <td>${item.restaurant.location.address}</td>
					<td>${item.restaurant.location.city}</td>
					<td>${countryName}</td>
				</tr>`;
	});

	restaurantsHTML += `</tbody></table>`;
	container.innerHTML = restaurantsHTML;
}
