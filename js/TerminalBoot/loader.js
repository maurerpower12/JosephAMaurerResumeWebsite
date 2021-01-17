/* 
 * Copyright (C) 2020 Joseph Maurer - All Rights Reserved
 * Derived from https://tlijm.csb.app with heavy modifications 
 * Licensed under MIT
*/

import {type, poweroff} from "./terminal.js";

var introArray = [
    "> LOADING....."
];

$(document).ready(function() {
    type(random_item(introArray));
})

function random_item(items) {
   return items[Math.floor(Math.random()*items.length)];
}

$('.loader').click(function(event){
    poweroff();
});