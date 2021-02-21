/* Copyright (C) 2020 Joseph Maurer - All Rights Reserved */

var numberOfBackgroundEffects = 5;

$(document).ready(function() {
  var rand = random_Number(numberOfBackgroundEffects);
  if(rand == 0) {
    VANTA.TRUNK({
      el: "#home",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      spacing: 1.50,
      chaos: 5.50
    })
  }
  else if(rand == 1) {
    VANTA.GLOBE({
      el: "#home",
      mouseControls: true,
      touchControls: false,
      gyroControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x9e0404,
      color2: 0xe4b861,
      size: 1.20,
      backgroundColor: 0x100f14
    })
  }
  else if(rand == 2) {
    VANTA.NET({
      el: "#home",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xe4b861,
      backgroundColor: 0x222222,
      points: 9.00,
      maxDistance: 33.00,
      spacing: 20.00
    })
  }
  else if(rand == 3) {
    VANTA.DOTS({
      el: "#home",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      size: 4.70,
      spacing: 37.00,
      color2: 0x9e0404,
      color: 0xe4b861,
      backgroundColor: 0x222222,
    })
  }
  else {
    VANTA.TOPOLOGY({
      el: "#home",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x89964e,
      backgroundColor: 0x222222,
    })
  }
})

function random_Number(max) {
  return Math.floor(Math.random()*max);
}