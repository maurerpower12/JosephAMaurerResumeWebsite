import { drawResizerOutline, setCursorStyle, checkResize, selectionEnum }
    from './Resize.js';

//CIRCLE CLASS
class Circle {
    /**
     * Constructs a Circle object for display on a canvas.
     * @constructor
     */
    constructor(startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
        this.name = 'C';
        if (startX === undefined) {
            this.startX = 0;
            this.startY = 0;
            this.centerX = 0;
            this.centerY = 0;
            this.radius = 0;

            this.fillColor = null;
            this.outlineColor = null;
            this.outlineThickness = 0;
        }
        else {
            this.startX = startX;
            this.startY = startY;

            this.centerX = (endX + startX) / 2;
            this.centerY = (endY + startY) / 2;

            this.radius = (endX - startX) / 2;
            if (this.radius < 1) {
                this.radius *= -1;
            }

            this.fillColor = fillColor;
            this.outlineColor = outlineColor;
            this.outlineThickness = outlineThickness;
        }
    }
    /**
     * Sets circle's dimensions.
     * @SetDimensions
     */
    SetDimensions(centerX, centerY, radius, fillColor, outlineColor, outlineThickness) {
        this.centerX = parseFloat(centerX);
        this.centerY = parseFloat(centerY);
        this.radius = parseFloat(radius);

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
    /**
     * Draws Circle on canvas
     * @Draw
     */
    Draw(context) {
        context.beginPath();
        // Tip: To create a circle with arc(): Set start angle to 0 and end angle to 2*Math.PI.
        context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.fillColor;
        context.fill();
        context.lineWidth = this.outlineThickness;
        context.strokeStyle = this.outlineColor;
        context.stroke();
    }
    /**
     * Returns true if the x,y is within the shape.
     * @Contains
     */
    Contains(x, y) {
        var found = false;
        var radiusSquared = this.radius * this.radius;
        var temp = (x - this.centerX) * (x - this.centerX) + (y - this.centerY) * (y - this.centerY);
        //(x - center_x) ^ 2 + (y - center_y) ^ 2 < radius ^ 2
        if (temp <= radiusSquared) {
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
        var startX = this.centerX - this.radius - 15;
        var startY = this.centerY - this.radius - 15;
        var width = this.radius * 2 + 30;
        var height = width;
        drawResizerOutline(context, startX, startY, width, height);
    }
    /**
     * Moves the object around the canvas.
     * @Move
     */
    Move(x, y) {
        var oldx = this.centerX;
        var oldy = this.centerY;
        var foundIndex = checkResize(x, y);
        if (foundIndex >= 0) {
            if (foundIndex == selectionEnum.TopMiddle
                || foundIndex == selectionEnum.MiddleLeft
                || foundIndex == selectionEnum.MiddleRight
                || foundIndex == selectionEnum.BottomMiddle) {
                this.radius = distance(this.centerX, this.centerY, x, y);
            }
            else {
                var q = distance(this.centerX, this.centerY, x, y);
                console.log("distance: " + q);
                this.centerX = (x + this.startX) / 2;
                this.centerY = (y + this.startY) / 2;
                this.radius = q;
            }
            if (this.radius < 1) {
                this.radius *= -1;
            }
        }
        else { // We must be trying to reposition the shape.
            this.centerX = x - this.radius / 2;
            this.centerY = y - this.radius / 2;
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

/**
 * Uses the pythagreon theory to figure out the distance between two points.
 * @distance
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export { Circle };