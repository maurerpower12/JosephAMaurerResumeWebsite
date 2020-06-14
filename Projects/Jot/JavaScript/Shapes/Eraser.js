//ERASER LINE CLASS
var Eraser = function (thickness) {
    this.name = 'Z';    // for reasons (parsing reasons)
    this.xPoints = [];
    this.yPoints = [];
    this.lineThickness = thickness;
}

//Adds point to eraser
Eraser.prototype.AddPoints = function (pointx, pointy) {
    this.xPoints.push(pointx);
    this.yPoints.push(pointy);
}

//Erases on canvas
Eraser.prototype.Draw = function (context) {

    context.strokeStyle = "white";
    context.lineJoin = "round";
    context.lineWidth = this.lineThickness;

    for (var i = 0; i < this.xPoints.length; i++) { //loops through each point in line
        context.beginPath();
        context.globalCompositeOperation = "destination-out";

        if (i)
            context.moveTo(this.xPoints[i - 1], this.yPoints[i - 1]);
        else
            context.moveTo(this.xPoints[i] - 1, this.yPoints[i]);

        context.lineTo(this.xPoints[i], this.yPoints[i]);

        context.closePath();
        context.stroke();
    }

    context.globalCompositeOperation = "source-over";
}