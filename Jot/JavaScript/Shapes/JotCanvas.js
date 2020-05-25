var m_marks = [];

//CANVAS CLASS
var JotCanvas = function () {
    //console.log(this.marks.serializeArray());
    this.marks = [];
    m_marks = this.marks;
    this.canvas = document.getElementById('myCanvas');
    this.context = canvas.getContext('2d');
    this.pages = 1;
}

//Applies mark to canvas and draws marks
JotCanvas.prototype.Apply = function (mark) {
    this.marks.push(mark);
    m_marks = this.marks;
}

//Draws all marks on canvas
JotCanvas.prototype.Draw = function () {
    this.context.clearRect(0, 0, canvas.width, canvas.height);//clears canvas

    for (var i = 0; i < this.marks.length; i++) { //Draws each mark on canvas
        this.marks[i].Draw(this.context);
    }
}

//Canvas background is duplicated for each page
JotCanvas.prototype.SetBackground = function () {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    context = canvas.getContext('2d');

    var pageHeight = (canvas.height / jotCanvas.pages);


    for (var i = 0; i < jotCanvas.pages; i++) {
        var y1 = i * (canvas.height / jotCanvas.pages)

        context.drawImage(m_background, 0, y1, canvas.width, pageHeight);
    }


    canvas.style.backgroundImage = "url('" + canvas.toDataURL() + "')";

    this.Draw();
}

JotCanvas.prototype.ClearCanvas = function () {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    context = canvas.getContext('2d');

    var pageHeight = (canvas.height / jotCanvas.pages);


    for (var i = 0; i < jotCanvas.pages; i++) {
        var y1 = i * (canvas.height / jotCanvas.pages)

        context.clearRect( 0, y1, canvas.width, pageHeight);
    }

    canvas.style.backgroundImage = "url('" + canvas.toDataURL() + "')";
}