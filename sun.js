/** Sun Maker

Makes a sun with asci characters, with optional weight/height given

**/

function sunMaker(htmlElement, width, height, interval) {

    var element = document.getElementById(htmlElement);

    width = (width < 30 && width > 16)? width : 24;

    height = (height < 25 && height > 10)? height : 10;

    interval = (interval < 1500 && interval > 49)? interval : 1000;

    var frames = [
        [
            '    \\       |       /    ',
            '     \\    @@@@     /     ',
            '       @@@@@@@@@@ /      ',
            '      @@@@@@@@@@@@       ',
            '_____ @@@@@@@@@@@@ ______',
            '       @@@@@@@@@@        ',
            '      /   @@@@    \\      ',
            '     /      |      \\     '
        ],
        [   '       \\        /        ',
            '        \\ @@@@ /         ',
            '------ @@@@@@@@@@ -------',
            '      @@@@@@@@@@@@       ',
            '      @@@@@@@@@@@@       ',
            '------ @@@@@@@@@@ -------',
            '        / @@@@ \\         ',
            '       /        \\        ',
        ]
        ];


    // Push/unshift depending on height

    for (let i = 8; i < height; i++) {

        var spaceArray = Array(24).fill(" ").join("");

        if (i % 2 === 0) {

            frames[0].push(spaceArray);
            frames[1].push(spaceArray);

        } else {

            frames[0].unshift(spaceArray);
            frames[1].unshift(spaceArray);

        }
    }

    // Add extra space depending on width

    for (let i = 24; i < width; i++) {

        if (i % 2 === 0) {

            frames[0] = frames[0].map(c => " " + c);
            frames[1] = frames[1].map(c => " " + c);

        } else {

            frames[0] = frames[0].map(c => c + " ");
            frames[1] = frames[1].map(c => c + " ");

        }
    }

    // Join nested arrays together with <br>

    frames = frames.map(c => c.join("<br>"));

    // At every interval, alternate between the two frames

    var index = 0;

    setInterval(function(){

        (index == 1)? index = 0: index ++;

        element.innerHTML = frames[index];

    }, interval);


}
