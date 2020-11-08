/* 
 * Copyright (C) 2020 Joseph Maurer - All Rights Reserved
 * Derived from https://tlijm.csb.app with heavy modifications 
 * Licensed under MIT
*/

import {type, poweroff} from "./terminal.js";

var introArray = [[
    "> whoami",
    "Joseph Maurer's Portfolio",
    "",
    "> BOOT Portfolio ",
    "Initiating boot sequence..........",
], [
    "> BOOT Joseph Maurer's Portfolio",
    "Verifying oit.dll.....",
    "Applying unr.exe.....",
    "Launching prospect.app.....",
], [
    "> SUDO g++ joe.cpp",
    "int main()",
    "{",
    "      cout << \"Hello, world!\";",
    "}"
]];

$(document).ready(function() {
    type(random_item(introArray));
})

function random_item(items) {
   return items[Math.floor(Math.random()*items.length)];
}

$('.loader').click(function(event){
    poweroff();
});