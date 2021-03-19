/* Copyright (C) 2020 Joseph Maurer - All Rights Reserved */

import { type } from "./TerminalBoot/terminal.js";

var numberOfBackgroundEffects = 5;
var defaultBackgroundColor = 0x222222;
var goldAccentColor = 0xe4b861;
var redAccentColor = 9979487;
var backgroundElementId = "#home";

$(document).ready(function () {
  var rand = random_Number(numberOfBackgroundEffects);
  if (rand == 0) {
    VANTA.GLOBE({
      el: backgroundElementId,
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
  else if (rand == 1) {
    VANTA.NET({
      el: backgroundElementId,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 0.5,
      color: 0x5c5c5c,
      backgroundColor: defaultBackgroundColor,
      points: 20.00,
      maxDistance: 14.00,
      spacing: 10.00,
      showDots: false
    })
  }
  else if (rand == 2) {
    VANTA.DOTS({
      el: backgroundElementId,
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
  else if (rand == 3) {
    VANTA.WAVES({
      el: backgroundElementId,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: defaultBackgroundColor,
      shininess: 40.00,
      waveHeight: 15.00,
      waveSpeed: 1.00,
      zoom: 1.00
    })
  }
  else { // Default Option
    VANTA.TOPOLOGY({
      el: backgroundElementId,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xacaca9,
      backgroundColor: defaultBackgroundColor,
    })
  }

  type("Software Engineer — Reno, Nevada");
})

function random_Number(max) {
  return Math.floor(Math.random() * max);
}