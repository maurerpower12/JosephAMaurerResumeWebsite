/* Copyright (C) 2020 Joseph Maurer - All Rights Reserved */

// This is a list of the possible background images

var introArray = [
  "Fountain.mp4",
  "Zephyr.mp4",
  "SantaMonica.mp4",
  "Sunrise.mp4",
  "FireLookout.mp4",
  "Fly.mp4"
];

$(document).ready(function() {
  // Load a random background image
  var randomBackground = './img/Lyfe/'+ random_item(introArray);
  if(randomBackground.endsWith('mp4')) {
    console.log("Playing background video: " + randomBackground);
    var video = document.getElementById('backgroundVideo');
    var source = document.getElementById('backgroundVideoSource');
    source.src = randomBackground;
    video.load();
    video.play();
  }
  else {
    $('#backgroundVideo').css('display', 'none');
  }
})

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];
}