const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
let CountDownDateElement = document.getElementById('CountDownDate');
let countDownDate = new Date('August 7, 2020 15:00:00 GMT-7');
//let countDownDate = new Date('August 4, 2020 23:49:00 GMT-7');
let isBirthday = false;
let bdaySurpriseShowing = false;
let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    if(CountDownDateElement.innerHTML == "") {
        CountDownDateElement.innerHTML = countDownDate;
    }
    isBirthday = (distance <= 0);

    if (!isBirthday) {
        document.getElementById('days').innerText = Math.floor(distance / (day));
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour));
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
    }
    else if(!bdaySurpriseShowing) {
        showBirthdayScreen();
    }
}, second);

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;


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
})();

function showBirthdayScreen() {
    bdaySurpriseShowing = true;
    document.getElementById('age').innerText = 29;

    document.getElementById('countdown').style.visibility = "hidden";
    document.getElementById('birthday').style.visibility = "visible";
}

// Terrain stuff.
var background = document.getElementById("nightSkyCanvas"),
    bgCtx = background.getContext("2d"),
    width = window.innerWidth,
    height = window.innerHeight;

(height < 400) ? height = 400 : height;

background.width = width;
background.height = height;

function Terrain(options) {
    options = options || {};
    this.terrain = document.createElement("canvas");
    this.terCtx = this.terrain.getContext("2d");
    this.scrollDelay = options.scrollDelay || 90;
    this.lastScroll = new Date().getTime();

    this.terrain.width = width;
    this.terrain.height = height;
    this.fillStyle = options.fillStyle || "#191D4C";
    this.mHeight = options.mHeight || height;

    // generate
    this.points = [];

    var displacement = options.displacement || 140,
        power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2))));

    // set the start height and end height for the terrain
    this.points[0] = this.mHeight;
    this.points[power] = this.points[0];

    // create the rest of the points
    for (var i = 1; i < power; i *= 2) {
        for (var j = (power / i) / 2; j < power; j += power / i) {
            this.points[j] = ((this.points[j - (power / i) / 2] + this.points[j + (power / i) / 2]) / 2) + Math.floor(Math.random() * -displacement + displacement);
        }
        displacement *= 0.6;
    }

    document.body.appendChild(this.terrain);
}

Terrain.prototype.update = function () {
    // draw the terrain
    this.terCtx.clearRect(0, 0, width, height);
    this.terCtx.fillStyle = this.fillStyle;
    
    if (new Date().getTime() > this.lastScroll + this.scrollDelay) {
        this.lastScroll = new Date().getTime();
        this.points.push(this.points.shift());
    }

    this.terCtx.beginPath();
    for (var i = 0; i <= width; i++) {
        if (i === 0) {
            this.terCtx.moveTo(0, this.points[0]);
        } else if (this.points[i] !== undefined) {
            this.terCtx.lineTo(i, this.points[i]);
        }
    }

    this.terCtx.lineTo(width, this.terrain.height);
    this.terCtx.lineTo(0, this.terrain.height);
    this.terCtx.lineTo(0, this.points[0]);
    this.terCtx.fill();
}

Terrain.prototype.resize = function (newWidth, newHeight) {
    this.terrain.width = newWidth;
    this.terrain.height = newHeight;
}


// Second canvas used for the stars
bgCtx.fillStyle = '#05004c';
bgCtx.fillRect(0, 0, width, height);

// stars
function Star(options) {
    this.size = Math.random() * 2;
    this.speed = Math.random() * .05;
    this.x = options.x;
    this.y = options.y;
}

Star.prototype.reset = function () {
    this.size = Math.random() * 2;
    this.speed = Math.random() * .05;
    this.x = width;
    this.y = Math.random() * height;
}

Star.prototype.update = function () {
    this.x -= this.speed;
    if (this.x < 0) {
        this.reset();
    } else {
        bgCtx.fillRect(this.x, this.y, this.size, this.size);
    }
}

function ShootingStar() {
    this.reset();
}

ShootingStar.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = 0;
    this.len = (Math.random() * 80) + 10;
    this.speed = (Math.random() * 10) + 6;
    this.size = (Math.random() * 1) + 0.1;
    // this is used so the shooting stars arent constant
    this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
    this.active = false;
}

ShootingStar.prototype.update = function () {
    if (this.active) {
        this.x -= this.speed;
        this.y += this.speed;
        if (this.x < 0 || this.y >= height) {
            this.reset();
        } else {
            bgCtx.lineWidth = this.size;
            bgCtx.beginPath();
            bgCtx.moveTo(this.x, this.y);
            bgCtx.lineTo(this.x + this.len, this.y - this.len);
            bgCtx.stroke();
        }
    } else {
        if (this.waitTime < new Date().getTime()) {
            this.active = true;
        }
    }
}


var entities = [];

// init the stars
for (var i = 0; i < height; i++) {
    entities.push(new Star({
        x: Math.random() * width,
        y: Math.random() * height
    }));
}

// Add 2 shooting stars that just cycle.
entities.push(new ShootingStar());
entities.push(new ShootingStar());
entities.push(new Terrain({mHeight : (height/2)-120, 
    fillStyle: "rgb(33, 34, 44)"}));
entities.push(new Terrain({displacement : 120, scrollDelay : 50, 
    fillStyle : "rgb(17,20,40)", mHeight : (height/2)-60}));
entities.push(new Terrain({displacement : 100, scrollDelay : 20, 
    fillStyle : "rgb(10,10,5)", mHeight : height/2}));

//animate background
function animate() {
    // Create radial gradient.
    var grd = bgCtx.createRadialGradient(0, 0, width/3, 50, 50, width/2);
    grd.addColorStop(0, "#110E19");
    grd.addColorStop(1, "#1f1d27");

    // Fill with gradient
    bgCtx.fillStyle = grd;
    bgCtx.fillRect(0, 0, width, height);

    bgCtx.fillStyle = '#ffffff';
    bgCtx.strokeStyle = '#ffffff';

    var entLen = entities.length;

    while (entLen--) {
        entities[entLen].update();
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener( "resize", function() {
    width = window.innerWidth;
    height = window.innerHeight;
    background.width = window.innerWidth;
    background.height = window.innerHeight;

    // entities[2].mHeight = (height/2)-120;
    // entities[3].mHeight = (height/2)-60;
    // entities[4].mHeight = (height/2);

}, false );