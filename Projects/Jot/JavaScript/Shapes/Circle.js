//CIRCLE CLASS
var Circle = function (startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
    this.name = 'C';
    if (startX === undefined) {
        this.centerX = 0;
        this.centerY = 0;
        this.radius = 0;

        this.fillColor = null;
        this.outlineColor = null;
        this.outlineThickness = 0;
    }
    else {
        this.centerX = (endX + startX) / 2;
        this.centerY = (endY + startY) / 2;

        this.radius = (endX - startX) / 2;
        if (this.radius < 1)
            this.radius *= -1;

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
}

//sets circle's dimensions
Circle.prototype.SetDimensions = function (centerX, centerY, radius, fillColor, outlineColor, outlineThickness) {
    this.centerX = parseFloat( centerX);
    this.centerY = parseFloat( centerY);
    this.radius = parseFloat( radius);

    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outlineThickness = outlineThickness;
}

//Draws Circle on canvas
Circle.prototype.Draw = function (context) {
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.fillColor;
    context.fill();
    context.lineWidth = this.outlineThickness;
    context.strokeStyle = this.outlineColor;
    context.stroke();
}

//(x - center_x) ^ 2 + (y - center_y) ^ 2 < radius ^ 2


Circle.prototype.Contains = function (x, y) {
    var found = false;
    var radiusSquared = this.radius * this.radius;
    var temp = (x - this.centerX) * (x - this.centerX) + (y - this.centerY) * (y - this.centerY)

    if (temp <= radiusSquared)
        found = true;

    return found;
}

Circle.prototype.DrawBox = function (context) {
    context.beginPath();
    context.rect(this.centerX - this.radius - 15, this.centerY - this.radius - 15, this.radius * 2 + 30, this.radius * 2 + 30);
    context.lineWidth = 5;
    context.strokeStyle = "DeepSkyBlue";
    context.stroke();
}

Circle.prototype.Move = function (x, y) {
    this.centerX = x - this.radius / 2;
    this.centerY = y - this.radius / 2;
}
