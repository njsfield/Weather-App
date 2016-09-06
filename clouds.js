/** Clouds

Makes a cloud with asci characters, then uses setInterval to place front item of array to back,
then outputs middle section

**/

function cloudMaker(htmlElement, width, height, interval) {

    var element = document.getElementById(htmlElement);

    var width = (width < 8 && width > 30)? width : 24;
    var height = (height < 8 && width > 10)? width : 8;
    var interval = (interval < 100 && interval > 1500)? interval : 200;

    var cloudArray = [
        '     ____  ____                             ___',
        '\\___/    \\/    \\___               _       _/   ',
        ' /                 \\_   __       / \\__   |     ',
        '|                   _|_/  \\__   /     \\   \\____',
        ' \\_              __/         \\__\\_____/        ',
        '   \\__          /               \\__     __     ',
        '      \\________/                   \\    \\/     ',
        '               \\___________________/           '
    ];



    // Push/unshift depending on height

    for (var i = 8; i < height; i++) {

        var dotArray = Array(47).fill(".");

        if (i % 2 == 0) {

            cloudArray.push(dotArray);

        } else {

            cloudArray.unshift(dotArray);

        }
    }


    setInterval(function(){

        var resultStr = "";
        var snippedArr = [];

        cloudArray = cloudArray.map(c => c.slice(1).concat(c[0]));

        for (row of cloudArray) {

            snippedArr.push(row.slice(0, width));

        }

        resultStr = snippedArr.join("<br>")

        element.innerHTML = resultStr;

    }, interval);


}
