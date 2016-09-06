var dataObject = {};
var locationElement = document.getElementById("location");
var tempElement = document.getElementById("temp");
var descElement = document.getElementById("desc");
var unitsButton = document.getElementById("units-button");
var textCanvas = document.getElementById("text-canvas");


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


var jsonPromise = new Promise(function(resolve,reject){
    getJSON('http://ipinfo.io/json', function(data) {
        if (data != "error") {
            dataObject.city = data.city;
            dataObject.country = data.country;
            resolve();
        } else {
            reject(Error("Unsuccessful"));
        }
    }
)})

    .then(function(){
        var openWeatherMapUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
        var APPID = '9b9d29dd1bd49a8456bdd3d33021da80';
        var weatherUrl = openWeatherMapUrl + dataObject.city + ',' + dataObject.country + '&APPID=' + APPID + '&units=imperial';
        getJSON(weatherUrl, function(data) {
            if (data != "error") {
                dataObject.temp = data.main.temp;
                dataObject.desc = data.weather[0].main;
                updateDom("celcius");
            } else {
                console.log('error');
            }
        })
    })

function updateDom(units){
        var temp;
        if (units == 'fahrenheit') {
            temp = `${(dataObject.temp).toFixed(0)}°`;
        } else {
            temp = `${((dataObject.temp - 32) * 0.5555).toFixed(0)}°`;
        }
        locationElement.innerHTML = `${dataObject.city}, ${dataObject.country}`;
        tempElement.innerHTML = temp;
        descElement.innerHTML = `'${dataObject.desc}'`;
}


unitsButton.addEventListener("click",function(){
    if (unitsButton.innerHTML == "C") {
        unitsButton.innerHTML = "F";
        updateDom("fahrenheit");
    } else {
        unitsButton.innerHTML = "C";
        updateDom("celcius");
    }
})



var rainArr = [];
var frameOne = [];


function rainRowMaker() {
    var rainRow = "";
        for (var j = 0; j < 24; j++) {

            var rand = Math.random();

            if (rand < .2 && rainRow[j-1] != "/" && rainRow[j-2] != "/") {
                rainRow += "/";
            } else {
                rainRow += ".";
            }
     }
    return rainRow;
}


function dotRowMaker() {
    return Array(24).fill(".").join("");
}



for (var i = 0; i < 8; i++) {
    if (i % 2 == 0) {

        frameOne.push(rainRowMaker())

    } else {

        frameOne.push(dotRowMaker());

    }
}

rainArr.push(frameOne);

for (var i = 0; i < 4; i++) {


    var nextFrame = Array.from(rainArr[i]);

    if (i % 2 == 0) {

        nextFrame.unshift(dotRowMaker());
        nextFrame.pop()
    }

    else {

        nextFrame.unshift(rainRowMaker());
        nextFrame.pop()
    }

    nextFrame = nextFrame.map(c => c.slice(1).concat(c[0]))

    rainArr.push(nextFrame);
}

rainArr = rainArr.map(c => c.join("<br>"))

var index = 0;
setInterval(function(){

    index == 4? index = 0: index ++;

    textCanvas.innerHTML = rainArr[index];

}, 100)




