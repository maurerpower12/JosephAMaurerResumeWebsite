//TRIANGLE CLASS
var Triangle = function (startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
    this.name = 'T';
    if (startX === undefined) {
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;

        this.fillColor = null;
        this.outlineColor = null;
        this.outlineThickness = 0;
    }
    else {
        this.startX = startX;
        this.startY = startY;

        this.endX = endX;
        this.endY = endY;

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
}

Triangle.prototype.SetDimensions = function (startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
    this.startX = parseFloat( startX);
    this.startY = parseFloat( startY);
    this.endX = parseFloat( endX);
    this.endY = parseFloat( endY);

    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outlineThickness = outlineThickness;
}

//Draws triangle on canvas
Triangle.prototype.Draw = function (context) {
    context.beginPath();

    context.moveTo(this.startX, this.startY);
    context.lineTo(this.startX, this.endY);

    context.lineTo(this.endX, this.startY);

    context.lineTo(this.startX, this.startY);

    context.lineWidth = this.outlineThickness;
    context.strokeStyle = this.outlineColor;
    context.stroke();

    context.fillStyle = this.fillColor;
    context.fill();
}