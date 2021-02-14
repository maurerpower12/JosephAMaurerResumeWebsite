import { drawResizerOutline, setCursorStyle, checkResize, selectionEnum }
    from './Resize.js';

//ELLIPSE CLASS
class Ellipse {
    constructor(startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
        this.name = 'E';

        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;

        this.centerX = (endX + startX) / 2;
        this.centerY = (endY + startY) / 2;

        this.radiusx = (endX - startX) / 2;
        if (this.radiusx < 0)
            this.radiusx *= -1;

        this.radiusy = (endY - startY) / 2;
        if (this.radiusy < 0)
            this.radiusy *= -1;

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
    SetDimensions(centerX, centerY, radiusx, radiusy, fillColor, outlineColor, outlineThickness) {
        this.centerX = parseFloat(centerX);
        this.centerY = parseFloat(centerY);
        this.radiusx = parseFloat(radiusx);
        this.radiusy = parseFloat(radiusy);

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
    //Draws Ellipse on canvas
    Draw(context) {
        context.beginPath();
        context.ellipse(this.centerX, this.centerY, this.radiusx, this.radiusy, 0, 0, 2 * Math.PI);
        context.fillStyle = this.fillColor;
        context.fill();
        context.lineWidth = this.outlineThickness;
        context.strokeStyle = this.outlineColor;
        context.stroke();
    }
    Contains(x, y) {
        var found = false;

        var temp = ((Math.pow((x - this.centerX), 2) / Math.pow(this.radiusx, 2)) +
            (Math.pow((y - this.centerY), 2) / Math.pow(this.radiusy, 2)));
        //var radiusSquared = this.radius * this.radius;
        //var temp = (x - this.centerX) * (x - this.centerX) + (y - this.centerY) * (y - this.centerY)
        if (temp <= 1) {
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
        var startX = this.centerX - this.radiusx - 15;
        var startY = this.centerY - this.radiusy - 15;
        var width = this.radiusx * 2 + 30;
        var height = this.radiusy * 2 + 30;

        drawResizerOutline(context, startX, startY, width, height);
    }
    Move(x, y) {
        var oldx = this.startX;
        var oldy = this.startY;
        var foundIndex = checkResize(x, y);
        if (foundIndex >= 0) {
            switch (foundIndex) {
                case 0:
                    this.radiusx += this.startX - x;
                    this.radiusy += this.startY - y;
                    this.startX = x;
                    this.startY = y;
                    break;
                case 1:
                    this.radiusy += this.startY - y;
                    this.startY = y;
                    break;
                case 2:
                    this.radiusx += Math.abs(this.startX - x);
                    this.radiusy += this.startY - y;
                    this.startY = y;
                    break;
                case 3:
                    this.startX = x;
                    this.radiusx += this.startX - x;
                    break;
                case 4:
                    this.radiusx += this.startX - x;
                    break;
                case 5:
                    this.radiusx += this.startX - x;
                    this.radiusy += this.startY - y;
                    this.startX = x;
                    break;
                case 6:
                    this.radiusy = this.startY - y;
                    break;
                case 7:
                    this.radiusx = this.startX - x;
                    this.radiusy = this.startY - y;
                    this.endX = x;
                    this.endY = y;
                    break;
                default:
                    console.log("out of bounds");
                    break;
            }
        }
        else {
            this.centerX = x - this.radiusx / 2;
            this.centerY = y - this.radiusy / 2;
        }

        if (this.radiusx < 0)
            this.radiusx *= -1;

        if (this.radiusy < 0)
            this.radiusy *= -1;
    }
    /**
     * Called everytime the mouse moves over the canvas.
     * @MouseMove
     */
    MouseMove(x, y) {
        var startX = this.centerX - this.radiusx - 15;
        var startY = this.centerY - this.radiusy - 15;
        var width = this.radiusx * 2 + 30;
        var height = this.radiusy * 2 + 30;
        setCursorStyle(x, y, startX, startY, width, height);
    }
}

export { Ellipse };