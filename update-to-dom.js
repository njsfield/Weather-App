/**

Takes four arguments -
1 The 'location' Id, which is the ID of the DOM element where the location will be injected
2 The 'temp' Id, which is the ID of the DOM element where the temperature will be injected
3 The 'desc' Id, which is the ID of the DOM element where the weather description be will injected
4 The 'units' button Id, which is the ID of the DOM element where the user can click to toggle between fahrenheit/celsius
5 The 'text canvas' Id, which is the ID of the DOM element where animation will occur


**/

function updateToDom(locationId, tempId, descId, unitsButton, textCanvas) {

    var that = this;


    locationId = document.getElementById(locationId);
    tempId = document.getElementById(tempId);
    descId = document.getElementById(descId);
    unitsButton = document.getElementById(unitsButton);


    // Retrieve JSON data

    function getJSON(url, callback) {

        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = function(){

            if (xhr.status >= 200 && xhr.status < 400) {
                var data = JSON.parse(xhr.responseText);
                callback(data);

            } else {
                callback("error");
            }
        };
        xhr.onerror = function() {
            callback("error");
        };
        xhr.send();
    }


    // Promise, to first retrieve location data

    var jsonPromise = new Promise(function(resolve,reject){

        getJSON('http://ipinfo.io/json', function(data) {

            if (data != "error") {
                that.city = data.city;
                that.country = data.country;
                resolve();

            } else {
                reject(Error("Unsuccessful"));
            }
        }
    )}).then(function(){

            var URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
            var APPID = '&APPID=9b9d29dd1bd49a8456bdd3d33021da80';
            var UNITS = '&units=imperial';
            var weatherUrl = URL + that.city + that.country + APPID + UNITS;

            getJSON(weatherUrl, function(data) {

                if (data != "error") {
                    that.temp = data.main.temp;
                    that.desc = data.weather[0].main;
                    updateDom("celcius");

                // Call dataObjects choodAnimation method

                that.chooseAnimation(that.desc, textCanvas);

                } else {
                    console.log('error');
                }
            });
        });


    // After complete, update element's inner HTML

    function updateDom(units){

            var temp;

            if (units == 'fahrenheit') {
                temp = `${(that.temp).toFixed(0)}°`;

            } else {
                temp = `${((that.temp - 32) * 0.5555).toFixed(0)}°`;
            }

            locationId.innerHTML = `${that.city}, ${that.country}`;
            tempId.innerHTML = temp;
            descId.innerHTML = `'${that.desc}'`;

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
    });


}
