//******************************************************************************************************
//
// Name:        Joe Maurer and Joseph Matthews
// Email:       Joseph.Maurer2@oit.edu
// Class:       CST 326 - Junior Project
// Project:     Jot by Verge
// Date:        Januray 24, 2016
// Description: 
//          This file is called from DrawPage.aspx
//          This file implements the following features:
//          1. Background templates for notes
//          2. A user uploaded(or URL) background for a canvas.
//          5. Adding a page to the canvas.
//          6. Exporting to a pdf
//          7. Inverting the canvas
//
//******************************************************************************************************

document.write('<script type="text/javascript" src="JavaScript/Shapes.js"></script>');

//Helper functions fo the popup that lets users change the note name
function CancelNoteName() {
    document.getElementById("defaultnoteentry").value = "";
}

//Changes name of note
function ChangeNoteName() {
    current_note_name = document.getElementById("defaultnoteentry").value;
    if (current_note_name != '') { // if they havent entered a new note name
        document.title = document.getElementById("defaultnoteentry").value;
        var final = "Name: " + current_note_name;
        document.getElementById("MainContent_notesName").innerText = final;
        SetStack();
        document.getElementById("success-alert").innerHTML = "<strong>Note Saved</strong>";
        // ShowAlert();
    }
}


//This function deals with the URL functionality of changing the background*@
function UserBackground() {
    var c = document.getElementById("myCanvas");
    var b = c.getContext("2d");
    var url = document.getElementById('bgchanger').value;
    var img = new Image();
    img.onload = function () {
        b.drawImage(img, 0, 0);
    };
    img.src = url;
}

//prints note
function Print() {

    var canvas = document.getElementById("myCanvas");



    destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = canvas.width;
    destinationCanvas.height = canvas.height;
    destinationcontext = destinationCanvas.getContext('2d');

    var pageHeight = (canvas.height / jotCanvas.pages);
    for (var i = 0; i < jotCanvas.pages; i++) {
        var y1 = i * (canvas.height / jotCanvas.pages)

        destinationcontext.drawImage(m_background, 0, y1, canvas.width, pageHeight);
    }

    //destinationcontext.drawImage(m_background, 0, 0, canvas.width, canvas.height);


    for (var i = 0; i < jotCanvas.marks.length; i++) { //Draws each mark on canvas
        jotCanvas.marks[i].Draw(destinationcontext);
    }

    var win = window.open();
    //jotCanvas.Draw();
    win.document.write("<br><img src='" + destinationCanvas.toDataURL() + "'/>");
    win.document.title = document.title;
    win.print(canvas.toDataURL());
    win.close();
}

//Function to add a page to the canvas
function addPage() {
    document.getElementById("success-alert").innerHTML = "<strong>Adding a page</strong>";
    // ShowAlert();
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var height = canvas.height;
    var width = canvas.width;
    jotCanvas.pages++;
    var displayHeight = 11 * jotCanvas.pages;


    var oldCanvas = canvas.toDataURL("image/png");
    var img = new Image();
    img.src = oldCanvas;


    canvas.height += 1300;
    canvas.style.height = displayHeight + 'in';
    console.log(canvas.style.height);

    jotCanvas.SetBackground();
}

//Function to add a page to the canvas
function removePage() {
    if (jotCanvas.pages > 1) {
        document.getElementById("success-alert").innerHTML = "<strong>Removing a page</strong>";
        // ShowAlert();
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var height = canvas.height;
        var width = canvas.width;
        jotCanvas.pages--;
        var displayHeight = 11 * jotCanvas.pages;


        var oldCanvas = canvas.toDataURL("image/png");
        var img = new Image();
        img.src = oldCanvas;


        canvas.height -= 1300;
        canvas.style.height = displayHeight + 'in';
        console.log(canvas.style.height);

        jotCanvas.SetBackground();
    }
}


//Inverts colors on the canvas
function invert() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    // Draws out the old canvas
    var oldCanvas = c.toDataURL("image/jpeg");
    var img = new Image();
    img.src = oldCanvas;
    ctx.drawImage(img, 0, 0);
    // gets the current background image data
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    // invert colors
    var i;
    for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i + 1] = 255 - imgData.data[i + 1];
        imgData.data[i + 2] = 255 - imgData.data[i + 2];
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    console.log("Invert done");
};

//saves note as pdf
function downloadCanvas() {

    ////link.href = document.getElementById(canvasId).toDataURL();
    ////link.download = filename;
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext('2d');

    destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = canvas.width;
    destinationCanvas.height = canvas.height;
    destinationcontext = destinationCanvas.getContext('2d');


    var canvas2 = document.createElement("canvas");
    canvas2.width = canvas.width;
    canvas2.height = 1300;
    canvas2context = canvas2.getContext('2d');
   
    canvas2context.drawImage(m_background, 0, 0, canvas.width, 1300 / jotCanvas.pages);
    canvas2context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas2.width, canvas2.height);

    var pageHeight = (canvas.height / jotCanvas.pages);
    for (var i = 0; i < jotCanvas.pages; i++) {
        var y1 = i * (canvas.height / jotCanvas.pages)

        destinationcontext.drawImage(m_background, 0, y1, canvas.width, pageHeight);
    }

   // destinationcontext.drawImage(m_background, 0, 0, canvas.width, canvas.height);

    var pageHeight = (canvas.height / jotCanvas.pages);
    for (var i = 0; i < jotCanvas.marks.length; i++) { //Draws each mark on canvas

     //   jotCanvas.marks[i].Draw(destinationcontext);
    }


    var displayHeight = 11 * jotCanvas.pages + 1;
    height = displayHeight + "in"


    // only jpeg is supported by jsPDF :(
    var imgData = canvas2.toDataURL("image/jpeg", 1.0);









    var pdf = new jsPDF();

    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 295 * jotCanvas.pages);

    for (var i = 1; i < jotCanvas.pages; i++) {
        //JavaScript syntax:	context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        canvas2context.drawImage(destinationCanvas, 0, i * 1300, canvas.width, canvas.height, 0, 0, canvas.width, 1300);
        canvas2context.drawImage(canvas, 0, i * 1300, canvas.width, canvas.height, 0, 0, canvas.width, 1300);
        imgData = canvas2.toDataURL("image/jpeg", 1.0);

        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 295 * jotCanvas.pages);
    }


    
    pdf.save( document.title + '.pdf'); 
    pdf.output('dataurlnewwindow');

    window.open('mailto:user@example.com?subject=Note from Jot');



    // For PNG 
    //window.open(canvas.toDataURL('PNG'), filename, "left=0,top=0,width=" +
    //   canvas.width + ",height=" + canvas.height + ",toolbar=0,resizable=0");

    //for JPEG
    // var dt = canvas.toDataURL('image/jpeg');
    // this.href = dt;
    // window.open(this.href, filename, "left=0,top=0,width=" +
    //canvas.width + ",height=" + canvas.height + ",toolbar=0,resizable=0");

    console.log("Save Finished");

}

//Below is the code to validate file extensions
var _validFileExtensions = [".jpg", ".jpeg", ".gif", ".png"];

function checkFile(file) {
    var file_list = file;

    var sFileName = file.name;
    var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
    var iFileSize = file.size;
    var iConvert = (file.size / 1048576).toFixed(2); // round it off to only 2 decimal points
    console.log("Uploaded file size: " + iFileSize);
    if (!(sFileExtension === "jpg" ||
            sFileExtension === "jpeg" ||
            sFileExtension === "png") || iFileSize > 200000) {//10485760) { /// 10 mb
        txt = "File type : " + sFileExtension + "\n\n";
        txt += "Size: " + iConvert + " MB \n\n";
        txt += "Please make sure your file is in jpg, or png format and less than 200 KB.\n\n";
        alert(txt);
        return false;
    }
    return true;

}