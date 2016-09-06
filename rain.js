/** Rain Maker

Generates an array of rain pattern strings,
then uses setInterval to iterate through the frames,
updating the html elements inner HTML


htmlElement = ID of element provided
width = number of characters in a column
height = number of characters in a column
frames = number of visual frames in loop
ms = update rate of cycling through frames

**/


function rainMaker(htmlElement, width, height, frames, ms) {

 var canvas = document.getElementById(htmlElement);

   var rainArr = [], frameOne = [];



    // Generates array of random mix  of " " and "/" characters

    function rainRowMaker() {
        var rainRow = "";

        for (var j = 0; j < width; j++) {

            var rand = Math.random();

            if (rand < .2 && rainRow[j-1] != "/" && rainRow[j-2] != "/") {
                rainRow += "/";
            } else {
                rainRow += " ";
            }
        }
        return rainRow;
    }


    // Generates array of " " characters

    function spaceRowMaker() {
        return Array(width).fill(" ").join("");
    }


    //  Creates initial two-dimensional array
    //  which alternates between space and rain rows

    for (var i = 0; i < height; i++) {
        if (i % 2 == 0) {

            frameOne.push(rainRowMaker())

        } else {

            frameOne.push(spaceRowMaker());

        }
    }
    rainArr.push(frameOne);


    //  Create additional frames
    //  by copying previous frame, then
    //  placing first nested array at end of it
    //  then repeating for each nested column

    for (var i = 0; i < frames; i++) {


        var nextFrame = Array.from(rainArr[i]);

        if (i % 2 == 0) {

            nextFrame.unshift(spaceRowMaker());
            nextFrame.pop()
        }

        else {

            nextFrame.unshift(rainRowMaker());
            nextFrame.pop()
        }

        nextFrame = nextFrame.map(c => c.slice(1).concat(c[0]))

        rainArr.push(nextFrame);
    }


    // Joins nested arrays with break element

    rainArr = rainArr.map(c => c.join("<br>"))


    // Sets interval to cycle through frames

    var index = 0;
    setInterval(function(){

        index == frames? index = 0: index ++;

        canvas.innerHTML = rainArr[index];

    }, ms)
}
