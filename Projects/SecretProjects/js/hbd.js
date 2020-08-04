const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
let CountDownDateElement = document.getElementById('CountDownDate');
let countDownDate = new Date('August 7, 2020 15:00:00 GMT-7');
let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    if(CountDownDateElement.innerHTML == "") {
        CountDownDateElement.innerHTML = countDownDate;
    }

    if (distance > 0) {
        document.getElementById('days').innerText = Math.floor(distance / (day)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour));
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    }
    else {

    }

    //do something later when date is reached
    //if (distance < 0) {
    //  clearInterval(x);
    //  'IT'S MY BIRTHDAY!;
    //}

}, second)

window.odometerOptions = {
    format: 'dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
    duration: 1000, // Change how long the javascript expects the CSS animation to take
  };
  