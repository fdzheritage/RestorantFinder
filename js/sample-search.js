let selectCityModal;
let citySelector;
let tableRows;

window.onload = function () {
    selectCityModal = document.getElementById('serachButton');
    citySelector = document.getElementById('citySelector');
    tableRows = document.querySelectorAll('#rest-list tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('click', rowClicked);
    });

    selectCityModal.addEventListener('click', searchButtonPressed);
    citySelector.addEventListener('click', function () {
        $('#selectCityModal').modal('hide');
    });

    $('#selectCityModal').on('hide.bs.modal', citySelected);

    renderRestCity(document.getElementById('rest-city'), 'Ottawa');
    renderRestCountry(document.getElementById('rest-country'), 'Canada');
}

function searchButtonPressed() {
    $('#selectCityModal').modal('show');
}

function citySelected() {
    let selectedIndex = citySelector.selectedIndex;
    console.log(citySelector.value, citySelector.options[selectedIndex].text);
}

function rowClicked() {
    document.querySelector("#rest-list tbody tr.table-active").classList.remove("table-active");
    console.log(this.classList.add("table-active"));
}

function renderRestCity(container, city) {
    container.innerHTML = city;
}

function renderRestCountry(container, country) {
    container.innerHTML = country;
}