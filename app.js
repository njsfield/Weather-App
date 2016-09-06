/*** data object to hold temp, location, and weather description ***/

var dataObject = {
    updateToDom: function(...args) {
        updateToDom.apply(this, args);
    }
}

dataObject.updateToDom("location", "temp", "desc", "units-button")

rainMaker("text-canvas", 24, 8, 10, 300);

//cloudMaker("text-canvas", 24, 8, 100);





