/**

Takes four arguments -
1 The 'location' Id, which is the ID of the DOM element where the location will be injected
2 The 'temp' Id, which is the ID of the DOM element where the temperature will be injected
3 The 'desc' Id, which is the ID of the DOM element where the weather description be will injected
4 The 'units' button Id, which is the ID of the DOM element where the user can click to toggle between fahrenheit/celsius


**/

function updateToDom(locationId, tempId, descId, unitsButton) {


    var locationId = document.getElementById(locationId);
    var tempId = document.getElementById(tempId);
    var descId = document.getElementById(descId);
    var unitsButton = document.getElementById(unitsButton);


    // Retrieve JSON data

    function getJSON(url, callback) {

        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = function(){

            if (xhr.status >= 200 && xhr.status < 400) {
                var data = JSON.parse(xhr.responseText);
                callback(data);

            } else {
                callback("error")
            }
        }
        xhr.onerror = function() {
            callback("error");
        }
        xhr.send();
    }


    // Promise, to first retrieve location data

    var jsonPromise = new Promise(function(resolve,reject){

        getJSON('http://ipinfo.io/json', function(data) {

            if (data != "error") {
                this.city = data.city;
                this.country = data.country;
                resolve();

            } else {
                reject(Error("Unsuccessful"));
            }
        }
    )})

        // then use that data to request weather data

        .then(function(){

            var URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
            var APPID = '&APPID=9b9d29dd1bd49a8456bdd3d33021da80';
            var UNITS = '&units=imperial'
            var weatherUrl =
                URL
                + this.city
                + this.country
                + APPID
                + UNITS;

            getJSON(weatherUrl, function(data) {

                if (data != "error") {
                    this.temp = data.main.temp;
                    this.desc = data.weather[0].main;
                    updateDom("celcius");

                } else {
                    console.log('error');
                }
            })
        })


    // After complete, update element's inner HTML

    function updateDom(units){

            var temp;

            if (units == 'fahrenheit') {
                temp = `${(this.temp).toFixed(0)}°`;

            } else {
                temp = `${((this.temp - 32) * 0.5555).toFixed(0)}°`;
            }

            locationId.innerHTML = `${this.city}, ${this.country}`;
            tempId.innerHTML = temp;
            descId.innerHTML = `'${this.desc}'`;
    }


    // Add event listener to button

    unitsButton.addEventListener("click", function(){

        if (unitsButton.innerHTML == "C") {

            unitsButton.innerHTML = "F";
            updateDom("fahrenheit");

        } else {

            unitsButton.innerHTML = "C";
            updateDom("celcius");
        }
    })


}
