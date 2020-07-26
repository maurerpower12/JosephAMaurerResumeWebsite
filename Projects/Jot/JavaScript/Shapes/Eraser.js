//ERASER LINE CLASS
class Eraser {
    constructor(thickness) {
        this.name = 'Z'; // for reasons (parsing reasons)
        this.xPoints = [];
        this.yPoints = [];
        this.lineThickness = thickness;
    }
    //Adds point to eraser
    AddPoints(pointx, pointy) {
        this.xPoints.push(pointx);
        this.yPoints.push(pointy);
    }
    //Erases on canvas
    Draw(context) {
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
    /**
     * Returns true if the x,y is within the shape.
     * @Contains
     */
    Contains(x, y) {
        return false;
    }
    /**
     * Draws the selection box aroud the shape.
     * @DrawBox
     */
    DrawBox(context) {
    }
    /**
     * Moves the object around the canvas.
     * @Move
     */
    Move(x, y) {
    }
    /**
     * Called everytime the mouse moves over the canvas.
     * @MouseMove
     */
    MouseMove(x, y) {
    }
}

export { Eraser };