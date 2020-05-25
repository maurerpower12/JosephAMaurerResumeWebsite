//LINE CLASS
var Line = function (startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
    this.name = 'L';
    if (startX === undefined) {
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;

        this.fillColor = null;

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

Line.prototype.SetDimensions = function (startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
    this.startX = parseFloat( startX);
    this.startY = parseFloat( startY);
    this.endX = parseFloat( endX);
    this.endY = parseFloat( endY);

    this.fillColor = fillColor;

    this.outlineColor = outlineColor;

    this.outlineThickness = outlineThickness;
}

//Draws line on Canvas
Line.prototype.Draw = function (context) {
    context.beginPath();
    context.lineWidth = this.outlineThickness;
    context.strokeStyle = this.fillColor;
    context.lineCap = 'butt';
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.stroke();
}