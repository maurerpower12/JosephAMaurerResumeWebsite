/* 
 * Derived from https://tlijm.csb.app with heavy modifications 
 * Licensed under MIT
*/

import {type, poweroff} from "./terminal.js";

window.onload = function () {
    var introArray = [[
        "> whoami",
        "Joseph Maurer's Portfolio",
        " ",
        "> BOOT Portfolio ",
        "Initiating boot sequence..........",
        " ",
        "WE HAVE LIFT OFF",
    ], [
        "> BOOT Joseph Maurer's Portfolio -fast",
        " ",
        "Finding missing semicolon.............FOUND IT!",
        " ",
        "WE HAVE LIFT OFF",
    ]];

    type(random_item(introArray));
};

function random_item(items)
{
   return items[Math.floor(Math.random()*items.length)];
}

$('.loader').click(function(event){
    poweroff();
});