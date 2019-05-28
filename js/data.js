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


