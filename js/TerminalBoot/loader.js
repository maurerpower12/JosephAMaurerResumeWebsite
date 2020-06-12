/* Derived from https://tlijm.csb.app with heavy modifications */

import {type} from "./terminal.js";

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
        "Finding missing semi-colon.............FOUND IT!",
        " ",
        "WE HAVE LIFT OFF",
    ]];

    type(random_item(introArray));
};

function random_item(items)
{
   return items[Math.floor(Math.random()*items.length)];
}