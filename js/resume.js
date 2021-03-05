/* Copyright (C) 2020 Joseph Maurer - All Rights Reserved */

import { type } from "./TerminalBoot/terminal.js";

var numberOfBackgroundEffects = 4;
var defaultBackgroundColor = 0x222222;
var goldAccentColor = 0xe4b861;
var redAccentColor = 9979487;

$(document).ready(function () {
  var rand = random_Number(numberOfBackgroundEffects);
  if (rand == 0) {
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
  else if (rand == 1) {
    VANTA.NET({
      el: "#home",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: redAccentColor,
      backgroundColor: defaultBackgroundColor,
      points: 20.00,
      maxDistance: 14.00,
      spacing: 10.00
    })
  }
  else if (rand == 2) {
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
      color: redAccentColor,
      backgroundColor: defaultBackgroundColor,
    })
  }

  type("Software Engineer — Reno, Nevada");
})

function random_Number(max) {
  return Math.floor(Math.random() * max);
}