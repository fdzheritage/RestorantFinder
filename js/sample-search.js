let selectCityModal;
let citySelector;

window.onload = function () {
    selectCityModal = document.getElementById('serachButton');
    citySelector = document.getElementById('citySelector');

    selectCityModal.addEventListener('click', searchButtonPressed);
    citySelector.addEventListener('click', function () {
        $('#selectCityModal').modal('hide');
    });

    $('#selectCityModal').on('hide.bs.modal', citySelected);
}

function searchButtonPressed() {
    $('#selectCityModal').modal('show');
}

function citySelected() {
    let selectedIndex = citySelector.selectedIndex;
    console.log(citySelector.value, citySelector.options[selectedIndex].text);
}