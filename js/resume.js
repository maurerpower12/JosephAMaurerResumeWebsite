
// This is a list of the possible background images

var introArray = [
  "PugetSound.jpg",
  "Bird.mp4",
  "Zephyr.mp4",
  "SantaMonica.mp4",
  "River.mp4",
  "Sunrise.mp4",
  "FireLookout.mp4",
  "Fly.mp4",
  "Rainbow.jpg",
  "CraterLake.jpg"
];

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

$(document).ready(function() {
  // Load a random background image
  var randomBackground = './img/Lyfe/'+ random_item(introArray);
  if(randomBackground.endsWith('mp4')) {
    $('#mapBackground').css('display', 'none');
    var video = document.getElementById('backgroundVideo');
    var source = document.getElementById('backgroundVideoSource');
    source.src = randomBackground;
    video.load();
    video.play();
  }
  else {
    $('#backgroundVideo').css('display', 'none');
    $('#mapBackground').css('background-image', 'url('+ randomBackground +')');
  }
})

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];
}
