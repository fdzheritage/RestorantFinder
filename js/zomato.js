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

async function searchLocation(query) {
    let resource = `${zomato.endPoint}/locations?query=${query}`;
    response = await fetch(resource, zomato.init);
    json = await response.json();
    return json;
}


async function fetchRestaurantsByCity(zomatoCityId){
    let resource = `${zomato.endPoint}/search?entity_id=${zomatoCityId}&entity_type=city`;
    response = await fetch(resource, zomato.init);
    json = await response.json();
    return json;
}

