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

// Returns a list of cities that match the query
async function searchCity(query) {
    query = query.toLowerCase();
    // First verify if this info is already stored in client
    let jsonString = localStorage.getItem(query);

    if (jsonString) {
        return JSON.parse(jsonString);
    } else {
        let resource = `${zomato.endPoint}/cities?q=${query}`;
        response = await fetch(resource, zomato.init);
        json = await response.json();
        localStorage.setItem(query, JSON.stringify(json));
        return json;
    }
}

// Needs to be called after searchCity because
// the city id is needed to find restaurants 
// Returns a list of restaurants in a specific city (provide city id)
async function fetchRestaurantsByCity(cityId) {
    // First verify if this info is already stored in client
    let jsonString = localStorage.getItem(cityId);

    if (jsonString) {
        return JSON.parse(jsonString);
    } else {
        // Fetch data not in localsorage
        let resource = `${zomato.endPoint}/search?entity_id=${cityId}&entity_type=city`;
        response = await fetch(resource, zomato.init);
        json = await response.json();
        localStorage.setItem(cityId, JSON.stringify(json));
        return json;
    }
}

