
window.onload = function() {

  // searchByCity('chicago');
    showAllCategories();
};


async function searchByCity( city ) {
   

    myHeaders = new Headers({
        'Accept': 'application/json',
        'user-key': 'dd0bd5a709e94d4b8ebce601ad243771'
      });

    var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

    var myRequest = new Request(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, myInit);

    const response = await fetch(myRequest);
    const json = await response.json();
    console.log(json);


}


async function showAllCategories() {
    myHeaders = new Headers({
        'Accept': 'application/json',
        'user-key': 'dd0bd5a709e94d4b8ebce601ad243771'
      });

    var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

    var myRequest = new Request(`https://developers.zomato.com/api/v2.1/categories`, myInit);

    const response = await fetch(myRequest);
    const json = await response.json();
    console.log(json);
} 