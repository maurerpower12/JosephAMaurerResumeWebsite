import {selectionHandles, drawResize, setCursorStyle, checkResize, drawResizerOutline} 
                from './Resize.js';

//RECTANGLE CLASS
class Rectangle {
    /**
     * Constructs a Rectangle object for display on a canvas.
     * @constructor
     */
    constructor(startX, startY, endX, endY, fillColor, outlineColor, outlinethickness, rotation) {
        this.name = 'R';
        if (startX === undefined) {
            this.startX = 0;
            this.startY = 0;
            this.width = 0;
            this.height = 0;

            this.fillColor = null;
            this.outlineColor = null;
            this.outlineThickness = 0;
            this.rotation = 0;
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

            this.rotation = rotation;
        }
    }
    /**
     * Returns true if the x,y is within the shape.
     * @Contains
     */
    Contains(x, y) {
        var found = false;
        // Did we click inside the rectange?
        if (x > this.startX && x < (this.startX + this.width) &&
            y > this.startY && y < (this.startY + this.height)) {
            found = true;
        }
        else {
            found = (checkResize(x, y) >= 0);
        }
        return found;
    }
    /**
     * Sets circle's dimensions.
     * @SetDimensions
     */
    SetDimensions(startX, startY, width, length, fillColor, outlineColor, outlineThickness) {
        this.startX = parseFloat(startX);
        this.startY = parseFloat(startY);
        this.width = parseFloat(width);
        this.height = parseFloat(length);

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
    /**
     * Draws Rectangle on canvas.
     * @Draw
     */
    Draw(context) {
        context.beginPath();
        context.rect(this.startX, this.startY, this.width, this.height);
        context.rotate(this.rotation * Math.PI / 180);
        context.fillStyle = this.fillColor;
        context.fill();
        context.lineWidth = this.outlineThickness;
        context.strokeStyle = this.outlineColor;
        context.setLineDash([]);
        context.stroke();
    }
    /**
     * Draws the selection box aroud the shape.
     * @DrawBox
     */
    DrawBox(context) {
        var startX = this.startX - 15;
        var startY = this.startY - 15;
        var width = this.width + 30;
        var height = this.height + 30;

        drawResizerOutline(context, startX, startY, width, height);
    }
    /**
     * Moves the object around the canvas.
     * @Move
     */
    Move(x, y) {
        // time ro resize!
        var oldx = this.startX;
        var oldy = this.startY;

        var foundIndex = checkResize(x, y);

        if (foundIndex >= 0) {
            switch (foundIndex) {
                case 0:
                    this.width += this.startX - x;
                    this.height += this.startY - y;
                    this.startX = x;
                    this.startY = y;
                    break;
                case 1:
                    this.height += this.startY - y;
                    this.startY = y;
                    break;
                case 2:
                    this.width = Math.abs(this.startX - x);
                    this.height += this.startY - y;
                    this.startY = y;
                    break;
                case 3:
                    this.startX = x;
                    this.width += (oldx - x);
                    break;
                case 4:
                    this.width = x - this.startX;
                    break;
                case 5:
                    this.width += this.startX - x;
                    this.height = Math.abs(this.startY - y);
                    this.startX = x;
                    break;
                case 6:
                    this.height = Math.abs(this.startY - y);
                    break;
                case 7:
                    this.width = Math.abs(this.startX - x);
                    this.height = Math.abs(this.startY - y);
                    break;
                default:
                    console.log("out of bounds");
                    break;
            }
        }
        else { // We must be trying to reposition the shape.
            this.startX = x - this.width / 2;
            this.startY = y - this.height / 2;
            //this.startX = Math.round((x - this.width / 2) / grid) * grid;
            //this.startY = Math.round((y - this.height / 2) / grid) * grid;
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

export {Rectangle};