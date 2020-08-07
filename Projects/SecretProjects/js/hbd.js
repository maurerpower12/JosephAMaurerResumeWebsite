import {loop} from "./fireworks.js";

const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
let CountDownDateElement = document.getElementById('CountDownDate');
let countDownDate = new Date('August 7, 2020 15:00:00 GMT-7');
let isBirthday = false;
let bdaySurpriseShowing = false;
let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    isBirthday = (distance <= 0);

    if (!isBirthday) {
        document.getElementById('days').innerText = Math.floor(distance / (day));
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour));
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

        if(CountDownDateElement.innerHTML == "") {
            CountDownDateElement.innerHTML = countDownDate;
        }
    }
    else if(!bdaySurpriseShowing) {
        showBirthdayScreen();
    }
}, second);

(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    isBirthday = (distance <= 0);

    if (isBirthday) {
        showBirthdayScreen();
    }
    else {
        document.getElementById('countdown').style.visibility = "visible";
        document.getElementById('birthday').style.visibility = "hidden";
    }

    $('.carousel').carousel({
        interval: 2000
      })
})();

function showBirthdayScreen() {
    if (!bdaySurpriseShowing) {
        bdaySurpriseShowing = true;
        //document.getElementById('age').innerText = 29;

        document.getElementById('countdown').style.visibility = "hidden";
        document.getElementById('birthday').style.visibility = "visible";

        // Start the fireworks baby!!
        loop();
    }
}

$("#msgBtn").click(function () { 
    $('#birthdayCard').modal('show');
});