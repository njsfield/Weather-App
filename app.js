/*** data object to hold temp, location, and weather description ***/

var dataObject = {
    updateToDom: function(...args) {
        updateToDom.apply(this, args);
    }
}

dataObject.updateToDom("location", "temp", "desc", "units-button");

// coldWeather("text-canvas", 'rain', 24, 8, 10, 60);

 cloudMaker("text-canvas", 24, 8, 60);
//
// sunMaker("text-canvas", 24, 8, 200);



