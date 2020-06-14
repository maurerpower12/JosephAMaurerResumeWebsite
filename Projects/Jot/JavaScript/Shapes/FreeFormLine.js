//FREE-FORM LINE CLASS
var FreeFormLine = function (color, thickness) {
    this.name = 'F';
    this.xPoints = [];
    this.yPoints = [];

    this.fillColor = color;
    this.lineThickness = thickness;
}

//Adds point to free form line
FreeFormLine.prototype.AddPoints = function (pointx, pointy) {
    this.xPoints.push(pointx);
    this.yPoints.push(pointy);
}

//Draws free form line on canvas
FreeFormLine.prototype.Draw = function (context) {

    context.lineJoin = "round";
    context.lineWidth = this.lineThickness;
    
    context.strokeStyle = this.fillColor;

    for (var i = 0; i < this.xPoints.length; i++) { //loops through each point in line
        context.beginPath();

        if (i) 
            context.moveTo(this.xPoints[i - 1], this.yPoints[i - 1]);
        else
            context.moveTo(this.xPoints[i] - 1, this.yPoints[i]);

        context.lineTo(this.xPoints[i], this.yPoints[i]);

        context.closePath();
        context.stroke();
    }
}