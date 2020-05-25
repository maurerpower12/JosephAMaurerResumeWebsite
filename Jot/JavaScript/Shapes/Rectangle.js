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
    if (x > this.startX && x < (this.startX + this.width) &&
        y > this.startY && y < (this.startY + this.height)) {

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
    context.stroke();
}

Rectangle.prototype.DrawBox = function (context) {
    context.beginPath();
    context.rect(this.startX - 15, this.startY - 15, this.width + 30, this.height + 30);
    context.lineWidth = 5;
    context.strokeStyle = "DeepSkyBlue";
    context.stroke();
}

Rectangle.prototype.Move = function (x, y) {
    this.startX = x - this.width / 2;
    this.startY = y - this.height / 2;
}