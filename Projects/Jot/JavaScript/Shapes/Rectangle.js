// Global Vars
var closeEnough = 30;
var resizeHandleRadius = 15;

//RECTANGLE CLASS
var Rectangle = function (startX, startY, endX, endY, fillColor, outlineColor, outlinethickness) {
    this.name = 'R';
    if (startX === undefined) {
        this.startX = 0;
        this.startY = 0;
        this.width = 0;
        this.height = 0;

        this.fillColor = null;
        this.outlineColor = null;
        this.outlineThickness = 0;
    }
    else {
        this.startX = startX;
        this.startY = startY;

        this.width = (endX - startX);
        if (this.width < 0) {
            this.startX += this.width;
            this.width *= -1;
        }

        this.height = (endY - startY);
        if (this.height < 0) {
            this.startY += this.height;
            this.height *= -1;
        }

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlinethickness;
    }
}

Rectangle.prototype.Contains = function (x, y) {
    var found = false;
    // Did we click inside the rectange?
    if (x > this.startX && x < (this.startX + this.width) &&
        y > this.startY && y < (this.startY + this.height)) {
        found = true;
    }
    // Did we click near one of the resize handles?
    else if((checkCloseEnough(x, this.startX) && checkCloseEnough(y, this.startY)) ||
        (checkCloseEnough(x, this.startX + this.width) && checkCloseEnough(y, this.startY)) ||
        (checkCloseEnough(x, this.startX) && checkCloseEnough(y, this.startY + this.height)) ||
        (checkCloseEnough(x, this.startX + this.width) && checkCloseEnough(y, this.startY + this.height))) {
            found = true;
    }
    return found;
}

Rectangle.prototype.SetDimensions = function (startX, startY, width, length, fillColor, outlineColor, outlineThickness) {
    this.startX = parseFloat( startX);
    this.startY = parseFloat( startY);
    this.width = parseFloat( width);
    this.height = parseFloat( length);

    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outlineThickness = outlineThickness;
}

//Draws Rectangle on canvas
Rectangle.prototype.Draw = function (context) {
    context.beginPath();
    context.rect(this.startX, this.startY, this.width, this.height);
    context.fillStyle = this.fillColor;
    context.fill();
    context.lineWidth = this.outlineThickness;
    context.strokeStyle = this.outlineColor;
    context.setLineDash([]);
    context.stroke();
}

Rectangle.prototype.DrawBox = function (context) {
    context.beginPath();
    context.rect(this.startX - 15, this.startY - 15, this.width + 30, this.height + 30);
    context.lineWidth = 5;
    context.setLineDash([10, 10]);
    context.strokeStyle = "DeepSkyBlue";
    context.stroke();
    drawResize(context, this.startX, this.startY, this.width, this.height);
}

Rectangle.prototype.Move = function (x, y) {
    // What resize action are we trying to do?
    // 1. top left
    if (checkCloseEnough(x, this.startX) && checkCloseEnough(y, this.startY)) {
        this.width += this.startX - x;
        this.height += this.startY - y;
        this.startX = x;
        this.startY = y;
    }
    // 2. top right
    else if (checkCloseEnough(x, this.startX + this.width) && 
             checkCloseEnough(y, this.startY)) {
        this.width = Math.abs(this.startX - x);
        this.height += this.startY - y;
        this.startY = y;
    }
    // 3. bottom left
    else if (checkCloseEnough(x, this.startX) &&
             checkCloseEnough(y, this.startY + this.height)) {
        this.width += this.startX - x;
        this.height = Math.abs(this.startY - y);
        this.startX = x;
    }
    // 4. bottom right
    else if (checkCloseEnough(x, this.startX + this.width) &&
             checkCloseEnough(y, this.startY + this.height)) {
        this.width = Math.abs(this.startX - x);
        this.height = Math.abs(this.startY - y);
    }
    else { // We must be trying to reposition the shape.
        this.startX = x - this.width / 2;
        this.startY = y - this.height / 2;
    }
}

// Draws the resize window.
function drawResize(context, startX, startY, width, height) {
    context.fillStyle = "#00000000";
    context.fillRect(startX, startY, width, height);
    drawHandles(context, startX, startY, width, height);
}

// Draw a circle for resizing.
function drawCircle(context, x, y, radius) {
    context.fillStyle = "DeepSkyBlue";
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}

// This draws the resizeable handles.
function drawHandles(context, startX, startY, width, height) {
    drawCircle(context, startX, startY, resizeHandleRadius);
    drawCircle(context, startX + width, startY, resizeHandleRadius);
    drawCircle(context, startX + width, startY + height, resizeHandleRadius);
    drawCircle(context, startX, startY + height, resizeHandleRadius);
}

// Are we close to the resize handles?
function checkCloseEnough(p1, p2) {
    return Math.abs(p1 - p2) < closeEnough;
}