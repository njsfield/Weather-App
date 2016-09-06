/** Cold Weather

Generates an array of rain/snow pattern strings,
then uses setInterval to iterate through the frames,
updating the html elements inner HTML


htmlElement = ID of element provided
type = 'rain' or 'snow', which uses either '/' character or 'o' character
width = number of characters in a column
height = number of characters in a column
frames = number of visual frames in loop
ms = update rate of cycling through frames

**/


function coldWeather(htmlElement, type, width, height, frames, ms) {

 var canvas = document.getElementById(htmlElement);

 var element = (type == "rain")? '/' : 'o';

   var elemArr = [], frameOne = [];



    // Generates array of random mix  of " " and "/" characters

    function elemRowMaker() {
        var elemRow = "";

        for (var j = 0; j < width; j++) {

            var rand = Math.random();

            if (rand < 0.2 && elemRow[j-1] != element && elemRow[j-2] != element) {
                elemRow += element;
            } else {
                elemRow += " ";
            }
        }
        return elemRow;
    }


    // Generates array of " " characters

    function spaceRowMaker() {
        return Array(width).fill(" ").join("");
    }


    //  Creates initial two-dimensional array
    //  which alternates between space and elem rows

    for (var i = 0; i < height; i++) {
        if (i % 2 === 0) {

            frameOne.push(elemRowMaker());

        } else {

            frameOne.push(spaceRowMaker());

        }
    }
    elemArr.push(frameOne);


    //  Create additional frames
    //  by copying previous frame, then
    //  placing first nested array at end of it
    //  then repeating for each nested column

    for (let i = 0; i < frames; i++) {


        var nextFrame = Array.from(elemArr[i]);

        if (i % 2 === 0) {

            nextFrame.unshift(spaceRowMaker());
            nextFrame.pop();
        }

        else {

            nextFrame.unshift(elemRowMaker());
            nextFrame.pop();
        }

        nextFrame = nextFrame.map(c => c.slice(1).concat(c[0]));

        elemArr.push(nextFrame);
    }


    // Joins nested arrays with break element

    elemArr = elemArr.map(c => c.join("<br>"));


    // Sets interval to cycle through frames

    var index = 0;
    setInterval(function(){

        index == frames? index = 0: index ++;

        canvas.innerHTML = elemArr[index];

    }, ms);
}
