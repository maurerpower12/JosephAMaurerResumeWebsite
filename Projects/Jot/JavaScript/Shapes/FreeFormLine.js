//FREE-FORM LINE CLASS
class FreeFormLine {
    constructor(color, thickness) {
        this.name = 'F';
        this.xPoints = [];
        this.yPoints = [];

        this.fillColor = color;
        this.lineThickness = thickness;
    }
    //Adds point to free form line
    AddPoints(pointx, pointy) {
        this.xPoints.push(pointx);
        this.yPoints.push(pointy);
    }
    //Draws free form line on canvas
    Draw(context) {

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

export { FreeFormLine };