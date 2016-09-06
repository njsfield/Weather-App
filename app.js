/*** data object to hold temp, location, and weather description ***/

var dataObject = {
    updateToDom: function(...args) {

        updateToDom.apply(this, args);

    },
    chooseAnimation: function(setting, location) {

        var setting = setting.toLowerCase();

        switch(setting) {

            case "clouds":
                cloudMaker(location, 24, 8, 50);
                break;

            case "drizzle":
            case "rain":
                coldWeather(location, 'rain', 24, 8, 10, 120);
                break;

            case "snow":
                coldWeather(location, 'snow', 24, 8, 10, 120);
                break;

            case "sunny":
            case "sun":
            case "clear":
                sunMaker(location, 24, 8, 200);
                break;

            case "thunderstorm":
                cloudMaker(location, 24, 8, 50);
                coldWeather(location, 'rain', 24, 8, 10, 120);
                lightningMaker(location, 300, 200, 5);
                break;

            default:
                cloudMaker(location, 24, 8, 50);
                break;

        }

    }

}

//Initialize

dataObject.updateToDom("location", "temp", "desc", "units-button", "text-canvas");




