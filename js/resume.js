/* Copyright (C) 2020 Joseph Maurer - All Rights Reserved */

import {type} from "./TerminalBoot/terminal.js";

var numberOfBackgroundEffects = 5;
var defaultBackgroundColor = 0x222222;
var goldAccentColor = 0xe4b861;
var redAccentColor = 9979487;
var greenAccentColor = 0x89964e;
var greyAccentColor = 0xafafaf;

$(document).ready(function() {
  var rand = random_Number(numberOfBackgroundEffects);
  if(rand == 0) {
    VANTA.TRUNK({
      el: "#home",
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      spacing: 1.50,
      chaos: 5.50,
      backgroundColor: defaultBackgroundColor,
      color: redAccentColor
    })
  }
  else if(rand == 1) {
    VANTA.GLOBE({
      el: "#home",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: redAccentColor,
      color2: goldAccentColor,
      size: 1.20,
      backgroundColor: defaultBackgroundColor
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
      color: greyAccentColor,
      backgroundColor: defaultBackgroundColor,
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
      color2: redAccentColor,
      color: goldAccentColor,
      backgroundColor: defaultBackgroundColor,
    })
  }
  else { // Default Option
    VANTA.TOPOLOGY({
      el: "#home",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: greenAccentColor,
      backgroundColor: defaultBackgroundColor,
    })
  }

  type("Software Engineer — Reno, Nevada");
})

function random_Number(max) {
  return Math.floor(Math.random()*max);
}