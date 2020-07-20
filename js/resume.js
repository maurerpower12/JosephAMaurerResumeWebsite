
// This is a list of the possible background images

var introArray = [
  "PugetSound.jpg",
  "Bird.mov",
  "Zephyr.mov",
  "SantaMonica.mov",
  "River.mov",
  "Sunrise.mov",
  "FireLookout.mov",
  "Fly.mov",
  "Rose.jpg",
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
  $('#mapBackground').css('background-image', 'url(./img/Lyfe/'+ random_item(introArray) +')');
})

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];
}
