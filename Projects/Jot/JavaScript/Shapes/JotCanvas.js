//CANVAS CLASS
class JotCanvas {
    constructor(canvas, context) {
        //console.log(this.marks.serializeArray());
        this.marks = [];
        this.backgroundImage = new Image();
        this.backgroundSourceData = "";
        this.backgroundSet = false;
        this.canvas = canvas;
        this.context = context;
        this.width = canvas.width;
        this.height = canvas.height;
        this.pages = 1;
    }
    /**
     * Applies mark to canvas and draws marks.
     * @Draw
     */
    Apply(mark) {
        this.marks.push(mark);
    }
    /**
     * Draws all marks on canvas.
     * @Draw
     */
    Draw(context) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = context;

        //clears canvas
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background image first.
        if (this.backgroundSet) {
            this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width,
                this.canvas.height / this.pages);
        }

        // Draw the shapes on top of the canvas.
        for (var i = 0; i < this.marks.length; i++) {
            this.marks[i].Draw(this.context);
        }
    }
    /**
     * Sets the background image.
     * @SetBackground
     */
    SetBackground(backgroundImage) {
        if (backgroundImage != null) {
            this.backgroundImage = backgroundImage;
            this.backgroundSourceData = backgroundImage.src;
            this.backgroundSet = true;
            this.SetDimensions(this.backgroundImage.width, this.backgroundImage.height);
        }
    }
    /**
     * Draws a clear rect over the canvas.
     * @ClearCanvas
     */
    ClearCanvas(context) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = context

        var pageHeight = (this.canvas.height / this.pages);

        for (var i = 0; i < this.pages; i++) {
            var y1 = i * (this.canvas.height / this.pages);

            this.context.clearRect(0, y1, this.canvas.width, pageHeight);
        }
    }
    /**
     * Resets any canvas data.
     * @ResetCanvas
     */
    ResetCanvas() {
        this.ClearCanvas(this.context);
        this.marks = [];
        this.backgroundImage = new Image();
        this.backgroundSourceData = "";
        this.backgroundSet = false;
        this.context.restore();
        this.Draw();
    }
    /**
     * Returns the canvas data.
     * @GetCanvasData
     */
    GetCanvasData(type, quality = 1.0) {
        return this.canvas.toDataURL('image/' + type, quality);
    }
    /**
     * Sets the canvas dimensions.
     * @SetDimensions
     */
    SetDimensions(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;

        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
    }
    /**
     * Prints JSON of the canvas content
     * @ToString
     */
    ToString() {
        var stackElement = "";
        for (var i = 0; i < this.marks.length; i++) {
            stackElement += JSON.stringify(this.marks[i], null, 4);
        }
        return stackElement;
    }
}

export { JotCanvas };