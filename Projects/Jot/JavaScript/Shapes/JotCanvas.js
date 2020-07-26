//CANVAS CLASS
class JotCanvas {
    constructor() {
        //console.log(this.marks.serializeArray());
        this.marks = [];
        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext('2d');
        this.pages = 1;
    }
    //Applies mark to canvas and draws marks
    Apply(mark) {
        this.marks.push(mark);
    }
    //Draws all marks on canvas
    Draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //clears canvas

        document.getElementById("stack").innerHTML = "";
        for (var i = 0; i < this.marks.length; i++) { //Draws each mark on canvas
            this.marks[i].Draw(this.context);
            document.getElementById("stack").innerHTML += JSON.stringify(this.marks[i], null, 4);
        }

    }
    //Canvas background is duplicated for each page
    SetBackground() {
        this.canvas.width = this.canvas.width;
        this.canvas.height = this.canvas.height;
        this.context = this.canvas.getContext('2d');

        var pageHeight = (canvas.height / this.pages);


        for (var i = 0; i < this.pages; i++) {
            var y1 = i * (this.canvas.height / this.pages);

            this.context.drawImage(m_background, 0, y1, this.canvas.width, pageHeight);
        }


        this.canvas.style.backgroundImage = "url('" + this.canvas.toDataURL() + "')";

        this.Draw();
    }
    ClearCanvas() {
        this.canvas.width = this.canvas.width;
        this.canvas.height = this.canvas.height;
        this.context = this.canvas.getContext('2d');

        var pageHeight = (this.canvas.height / this.pages);


        for (var i = 0; i < this.pages; i++) {
            var y1 = i * (this.canvas.height / this.pages);

            this.context.clearRect(0, y1, this.canvas.width, pageHeight);
        }

        this.canvas.style.backgroundImage = "url('" + this.canvas.toDataURL() + "')";
    }
    ResetCanvas() {
        this.ClearCanvas();
        this.marks = [];
        this.context.restore();
        this.Draw();
    }
}

export { JotCanvas };