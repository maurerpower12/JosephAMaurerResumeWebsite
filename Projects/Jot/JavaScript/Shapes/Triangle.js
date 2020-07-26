import { drawResizerOutline, setCursorStyle, checkResize, selectionEnum }
    from './Resize.js';

//TRIANGLE CLASS
class Triangle {
    /**
     * Constructs a Triangle object for display on a canvas.
     * @constructor
     */
    constructor(startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
        this.name = 'T';
        if (startX === undefined) {
            this.startX = 0;
            this.startY = 0;
            this.endX = 0;
            this.endY = 0;

            this.width = 0;
            this.height = 0;

            this.fillColor = null;
            this.outlineColor = null;
            this.outlineThickness = 0;
        }
        else {
            this.startX = startX;
            this.startY = startY;

            this.endX = endX;
            this.endY = endY;

            this.width = 0;
            this.height = 0;

            this.fillColor = fillColor;
            this.outlineColor = outlineColor;
            this.outlineThickness = outlineThickness;
        }
    }
    /**
     * Sets circle's dimensions.
     * @SetDimensions
     */
    SetDimensions(startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
        this.startX = parseFloat(startX);
        this.startY = parseFloat(startY);
        this.endX = parseFloat(endX);
        this.endY = parseFloat(endY);

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
    /**
     * Draws triangle on canvas
     * @Draw
     */
    Draw(context) {
        context.beginPath();

        context.moveTo(this.startX, this.startY);
        // height
        //this.height = this.startX - this.endX;
        this.height = this.endX - this.startX;
        context.lineTo(this.startX, this.endY);

        // hypotenuse
        context.lineTo(this.endX, this.startY);

        // width
        //this.width = this.startX -this.endY;
        this.width = this.endY - this.startY;
        context.closePath();
        context.lineWidth = this.outlineThickness;
        context.strokeStyle = this.outlineColor;
        context.stroke();

        context.fillStyle = this.fillColor;
        context.fill();
    }
    /**
     * Returns true if the x,y is within the shape.
     * @Contains
     */
    Contains(x, y) {
        var found = false;
        // Did we click inside the rectange?
        if (x > this.startX && x < (this.startX + this.endX) &&
            y > this.startY && y < (this.startY + this.endY)) {
            found = true;
        }
        else {
            found = (checkResize(x, y) >= 0);
        }
        return found;
    }
    /**
     * Draws the selection box aroud the shape.
     * @DrawBox
     */
    DrawBox(context) {
        var startX = this.startX - 15;
        var startY = this.startY - 15;
        var width = this.width;//(this.startX + this.endX) + 30;
        var height = this.height;//(this.startY + this.endY) + 30;

        drawResizerOutline(context, startX, startY, width, height);
    }
    /**
     * Moves the object around the canvas.
     * @Move
     */
    Move(x, y) {
        var foundIndex = checkResize(x, y);
        if (foundIndex >= 0) {

        }
        else { // We must be trying to reposition the shape.
            this.startX = x - this.width / 2;
            this.startY = y - this.height / 2;
        }
    }
    /**
     * Called everytime the mouse moves over the canvas.
     * @MouseMove
     */
    MouseMove(x, y) {
        setCursorStyle(x, y, this.startX, this.startY, this.width, this.height);
    }
}

export { Triangle };