//CANVAS CLASS
class JotCanvas {
    constructor(canvas, context) {
        //console.log(this.marks.serializeArray());
        this.marks = [];
        this.backgroundImage = new Image();
        this.backgroundSet = false;
        this.canvas = canvas;
        this.context = context;
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
        this.canvas.width = this.canvas.width;
        this.canvas.height = this.canvas.height;
        this.context = context;

        //clears canvas
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background image first.
        if (this.backgroundSet) {
            this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width,
                this.canvas.height / this.pages);
        }

        // Draw the shapes on top of the canvas.
        var stackElement = document.getElementById("stack");
        var debugHidden = document.getElementById("debug").style.display == 'none';
        stackElement.innerHTML = "";
        for (var i = 0; i < this.marks.length; i++) { //Draws each mark on canvas
            this.marks[i].Draw(this.context);
            if(!debugHidden) {
                stackElement.innerHTML += JSON.stringify(this.marks[i], null, 4);
            }
        }
    }
    /**
     * Sets the background image.
     * @SetBackground
     */
    SetBackground(m_background) {
        if (m_background != null) {
            this.backgroundImage = m_background;
            this.backgroundSet = true;
        }
    }
    /**
     * Draws a clear rect over the canvas.
     * @ClearCanvas
     */
    ClearCanvas(context) {
        this.canvas.width = this.canvas.width;
        this.canvas.height = this.canvas.height;
        this.context = context

        var pageHeight = (this.canvas.height / this.pages);

        for (var i = 0; i < this.pages; i++) {
            var y1 = i * (this.canvas.height / this.pages);

            this.context.clearRect(0, y1, this.canvas.width, pageHeight);
        }
    }
    /**
     * Resets any canvas data.
     * @DownloadCanvas
     */
    ResetCanvas() {
        this.ClearCanvas(this.context);
        this.marks = [];
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
}

export { JotCanvas };