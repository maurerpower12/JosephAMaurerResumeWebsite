//SQUARE CLASS
class Square {
    constructor(startX, startY, endX, endY, fillColor, outlineColor, outlineThickness) {
        this.name = 'S';
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;

        this.width = (endX - startX);
        if (this.width < 0) {
            this.startX += this.width;
            this.width *= -1;
        }

        this.height = Math.abs(this.width);
        if ((endY - startY) < 0) {
            this.startY -= this.height;
            //this.height *= -1;
        }

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
    Contains(x, y) {
        var found = false;
        if (x > this.startX && x < (this.startX + this.width) &&
            y > this.startY && y < (this.startY + this.height)) {

            found = true;

        }
        return found;
    }
    SetDimensions(startX, startY, width, height, fillColor, outlineColor, outlineThickness) {
        this.startX = parseFloat(startX);
        this.startY = parseFloat(startY);
        this.width = parseFloat(width);
        this.height = parseFloat(height);

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlineThickness;
    }
    //Draws Square on canvas
    Draw(context) {
        context.beginPath();
        context.rect(this.startX, this.startY, this.width, this.height);
        context.fillStyle = this.fillColor;
        context.fill();
        context.lineWidth = this.outlineThickness;
        context.strokeStyle = this.outlineColor;
        context.stroke();
    }
    DrawBox(context) {
        context.beginPath();
        context.rect(this.startX - 15, this.startY - 15, this.width + 30, this.height + 30);
        context.lineWidth = 5;
        context.strokeStyle = "DeepSkyBlue";
        context.stroke();
    }
    Move(x, y) {
        this.startX = x - this.width / 2;
        this.startY = y - this.height / 2;
    }
    /**
     * Called everytime the mouse moves over the canvas.
     * @MouseMove
     */
    MouseMove(x, y) {
    }
}

export { Square };