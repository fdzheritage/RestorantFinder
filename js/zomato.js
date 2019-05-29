/*   START ZOMATO API SETTINGS */
let zomato = {};
zomato.endPoint = "https://developers.zomato.com/api/v2.1/";
zomato.init = {
	method: "GET",
	mode: "cors",
	cache: "default",
	headers: {
		Accept: "application/json",
		"user-key": "dd0bd5a709e94d4b8ebce601ad243771"
	}
};
/*   END ZOMATO API SETTINGS */

// Return json
async function fetchCategories() {
	let uri = `${zomato.endPoint}/categories`;
	response = await fetch(uri, zomato.init);
	json = await response.json();
	return json;
}

async function searchLocation(query) {
	let uri = `${zomato.endPoint}/locations?query=${query}`;
	response = await fetch(uri, zomato.init);
	json = await response.json();
	return json;
}

async function fetchRestaurantsByCity(zomatoCityId) {
	let uri = `${
		zomato.endPoint
	}/search?entity_id=${zomatoCityId}&entity_type=city`;
	response = await fetch(uri, zomato.init);
	json = await response.json();
	return json;
}
