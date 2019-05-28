
let resultsDiv;

window.onload = function () {
    resultsDiv = document.getElementById("results");
    let searchBox = document.getElementById("search-box");
    let searchButton = document.getElementById("search-button");
    searchButton.addEventListener('click', () => {
        // console.log("Working");
        let searchTerm = searchBox.value;
        searchByCity(searchTerm);
        // console.log(searchTerm);
    });
    // searchByCity('chicago');
    //showAllCategories();
};


async function searchByCity(city) {


    myHeaders = new Headers({
        'Accept': 'application/json',
        'user-key': 'dd0bd5a709e94d4b8ebce601ad243771'
    });

    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    var myRequest = new Request(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, myInit);

    const response = await fetch(myRequest);
    const json = await response.json();
    let resultHTML = ``;
    console.log(json);
    json.location_suggestions.forEach(
        location => {
            console.log(location.name);
            // resultHTML = resultHTML + `<div>${location.name}</div>`;
        }
    );
    resultsDiv = resultHTML;
}


async function showAllCategories() {
    myHeaders = new Headers({
        'Accept': 'application/json',
        'user-key': 'dd0bd5a709e94d4b8ebce601ad243771'
    });

    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    var myRequest = new Request(`https://developers.zomato.com/api/v2.1/categories`, myInit);

    const response = await fetch(myRequest);
    const json = await response.json();


    // Output to the page as HTML

}


function renderAll() {

}

function renderNav(navId) {
    let navHTML = `
    
    `;
}