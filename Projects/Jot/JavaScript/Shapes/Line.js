//LINE CLASS
class Line {
    constructor(startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
        this.name = 'L';
        this.startX = startX;
        this.startY = startY;

        this.endX = endX;
        this.endY = endY;

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
    SetDimensions(startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
        this.startX = parseFloat(startX);
        this.startY = parseFloat(startY);
        this.endX = parseFloat(endX);
        this.endY = parseFloat(endY);

        this.fillColor = fillColor;

        this.outlineColor = outlineColor;

        this.outlineThickness = outlineThickness;
    }
    //Draws line on Canvas
    Draw(context) {
        context.beginPath();
        context.lineWidth = this.outlineThickness;
        context.strokeStyle = this.fillColor;
        context.lineCap = 'butt';
        context.moveTo(this.startX, this.startY);
        context.lineTo(this.endX, this.endY);
        context.stroke();
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

export { Line };