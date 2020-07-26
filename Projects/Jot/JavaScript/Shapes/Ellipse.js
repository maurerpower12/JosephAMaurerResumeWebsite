//ELLIPSE CLASS
class Ellipse {
    constructor(startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
        this.name = 'E';
        if (startX === undefined) {
            this.centerX = 0;
            this.centerY = 0;
            this.radiusx = 0;
            this.radiusy = 0;

            this.fillColor = null;
            this.outlineColor = null;
            this.outlineThickness = 0;
        }
        else {
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
        if (temp <= 1)
            found = true;

        return found;
    }
    DrawBox(context) {
        context.beginPath();
        context.rect(this.centerX - this.radiusx - 15, this.centerY - this.radiusy - 15, this.radiusx * 2 + 30, this.radiusy * 2 + 30);
        context.lineWidth = 5;
        context.strokeStyle = "DeepSkyBlue";
        context.stroke();
    }
    Move(x, y) {
        this.centerX = x - this.radiusx / 2;
        this.centerY = y - this.radiusy / 2;
    }

    /**
     * Called everytime the mouse moves over the canvas.
     * @MouseMove
     */
    MouseMove(x, y) {
        //setCursorStyle(x, y, this.startX, this.startY, this.width, this.height);
    }
}

export { Ellipse };