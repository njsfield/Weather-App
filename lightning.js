/** Lightning Maker

Initially switches the color/background color of HTML element (black/white)

Then at random intervals, flashes white

Arguments-

htmlElement = Id of element to manipulate
interval = frequency of 'chance of lightning', values between 300 - 2000 ms
speed = how long it takes the white flash to go black, values between 50 - 3000
amount = change of flash happening, values between 0 - 10


**/



// Repeats a string for a given amount

String.prototype.repeat = function(amount){

	return Array(amount).fill(this).join("");
};


function lightningMaker(htmlElement, interval, speed, amount) {

    interval = (interval >= 300 && interval <= 2000)? interval : 500;

    speed = (speed >= 50 && speed <= 3000)? speed : 200;

    amount = (amount >= 0 && amount <= 10)? amount : 5;

    var element = document.getElementById(htmlElement);


        // Initially sets background/color styles

        element.style.backgroundColor = "black";
        element.style.color = "white";


    // Interval of 'chance of lightning'

    setInterval(function(){

        var rand = Math.random();


        if (rand < amount / 10) {

            var count = 10;


            var fadeInterval = setInterval(function(){

                // Hex values to alternate between

                var hexes = "02468ABCDF";

                count--;

                element.style.backgroundColor = "#" + hexes[count].repeat(3);

                if (!count) {
                    clearInterval(fadeInterval);
                }


            }, speed / 10);

        }


    }, interval);


}
