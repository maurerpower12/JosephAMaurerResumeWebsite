﻿//******************************************************************************************************
//
// Name:       Joe Maurer and Joseph Matthews
// Email:       
// Class:       CST 326 - Junior Project
// Project:     Jot by Verge++
// Date:        
// Description: 
//          This file is called from DrawPage.aspx
//          This file implements the following features:
//          
//******************************************************************************************************


$("#textinput").focus();
$("#textinput").click();
$("#textinput").trigger("tap");

//JavaScript souce files for each shape
document.write('<script type="text/javascript" src="JavaScript/Shapes/Circle.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/Ellipse.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/Eraser.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/FreeFormLine.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/JotCanvas.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/Line.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/Rectangle.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/Square.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/Triangle.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/Text.js"></script>');
document.write('<script type="text/javascript" src="JavaScript/Shapes/Highlighter.js"></script>');

// This javascript controls which template is being put in the background.
var bgnum = 0;
var m_background = new Image();
var m_save_string = ""; // this is the string that will hold the temp string of the serialized data

var startX = 0; //shape start X coordinate
var startY = 0; //shape start Y coordinate
var mouseclicked = false;
var textClicked = false;
var shapeSelected = false;

var selectedIndex = -1;

var currentTool = -1; //currently selected tool

var lineColor = "red"; //free-form line and highlighter color
var lineThickness = 10;

var toolColor = "red"; //shape color
var toolOutlinecolor = "black"; //shape outline color
var outlineThickness = 10; //outline thickness of shapes

var shape = null;

var fontfamily = "Arial"; //text font
var style = "normal"; //text font style (italics/bold/smallcaps/normal)
var textSize = 30; //size of text
var textColor = "black"; //color of text

var canvas = document.getElementById("myCanvas"); //canvas
var context = canvas.getContext("2d"); //canvas context
var jotCanvas = new JotCanvas(); //holds marks list and number of pages on note

var cursorTimer = setInterval(DrawCursor, 500); //timer for drawing cursor
var cursor = true; //variable that determines weather cursor should be drawn

var redostack = []; //stack to hold the undone stuff
var index_redo = 0; //max items that can currently be redone
var max_undo = 0; //max items that can currently be undone

var mobile = false;
var lastmove = null;


//Draws blinking cursor
function DrawCursor() {
    if (cursor && textClicked) {
        jotCanvas.Draw();
        shape.DrawCursor(context);
        shape.DrawBox(context);
        cursor = false;
    }
    else if (textClicked) {
        jotCanvas.Draw();
        shape.DrawBox(context);
        cursor = true;
    }
}

//Sets background from selection
function bgFunction(num) {
    //m_save_string += JSON.stringify(m_marks);

    bgnum = num;
    var c = document.getElementById("myCanvas");
    var b = c.getContext("2d");
    var loc = window.location.pathname;

    var startingpath = 'Background%20Templates/jpg/';
    var startingcolors = 'Background%20Templates/color/';

    if (num == 0) { // case for a no background selected white background
        m_background.src = startingpath + "white.jpg";
    }
    if (num == 1) {
        m_background.src = startingpath + 'narrow ruled 2.jpeg';
    }
    else if (num == 2) {
        m_background.src = startingpath + 'todo 2.jpeg';
    }
    else if (num == 3) {
        m_background.src = startingpath + 'dot grid med 2.jpeg';
    }
    else if (num == 4) {
        m_background.src = startingpath + 'graph 2.jpeg';
    }
    else if (num == 6) {
        m_background.src = startingpath + 'engineering_grey 2.jpeg';
    }
    else if (num == 7) {
        m_background.src = startingpath + 'calendar week 2.jpeg';
    }
    else if (num == 8) {
        m_background.src = startingpath + 'meeting notes basic 2.jpeg';
    }
    else if (num == 9) {
        m_background.src = startingpath + 'music staves 2.jpeg';
    }
    else if (num == 10) {
        m_background.src = startingpath + 'baseball portrait 2.jpeg';
    }
    else if (num == 11) {
        m_background.src = startingpath + 'basketball landscape 2.jpeg';
    }
    else if (num == 12) {
        m_background.src = startingpath + 'football landscape 2.jpeg';
    }
    else if (num == 13) {
        m_background.src = startingpath + 'soccer landscape 2.jpeg';
    }
    else if (num == 14) {
        m_background.src = startingpath + 'legal 2.jpeg';
    }
    else if (num == 15) {
        m_background.src = startingpath + 'meeting notes 2.jpeg';
    }
    else if (num == 16) {
        m_background.src = startingpath + 'ruled margin 2.jpeg';
    }
    else if (num == 17) { // TODO Fix to allow pdf
        //c.style.backgroundImage = "url('../Background Templates/storyboard 6 pages.pdf')";
    }
    else if (num == -12) {
        console.log("User def loading...");
        GetUserDef();
        console.log("User def loading finished");
        //HideLoadingScreen(); // Hide the loading screen
        return; // break out early so you dont try to load the bg source again
    }
    else if (num == 18) { // case for blue background
        m_background.src = startingcolors + 'blue.jpg';
    }
    else if (num == 19) { // case for green background
        m_background.src = startingcolors + 'Green.jpg';
    }
    else if (num == 20) { // case for red background
        m_background.src = startingcolors + 'red.jpg';
    }
    else { // default
        m_background.src = startingcolors + "white.jpg";
    }

    c.style.backgroundImage = "url('" + m_background.src + "')";

    m_background.onload = function () {
        b.globalCompositeOperation = "source-over";

        //Parse(m_save_string); // call the Parse function passing the string from the database

        jotCanvas.SetBackground();


        HideLoadingScreen(); // Hide the loading screen
    }
}

//function to load the user def image 
var a_str;
function userdefset(db_str) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var image = new Image();
    image.src = db_str;
    image.onload = function () {
        canvas.style.backgroundImage = "url('" + image.src + "')";  // set the image as the background
        ctx.globalCompositeOperation = "source-over";
        //Parse(m_save_string); // call the Parse function passing the string from the database
        m_background.src = image.src;
        jotCanvas.SetBackground();
        HideLoadingScreen(); // Hide the loading screen
    }
    bgnum = -12;
    a_str = db_str;
}

var inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles(e) {
    var canvas = document.getElementById("myCanvas");

    destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = canvas.width;
    destinationCanvas.height = canvas.height;
    destinationcontext = destinationCanvas.getContext('2d');

    var _file = this.files[0];
    if (checkFile(_file)) {
        var url = URL.createObjectURL(_file);
        var img = new Image();
        img.src = url;
        bgnum = -12; // set the background number.
        img.onload = function () {
            document.getElementById("myCanvas").style.backgroundImage = "url('" + img.src + "')";  // set the image as the background
            m_background.src = img.src;
            jotCanvas.SetBackground();

            var pageHeight = (canvas.height / jotCanvas.pages);
            destinationcontext.drawImage(m_background, 0, 0, canvas.width, pageHeight);

            a_str = destinationCanvas.toDataURL('image/jpeg', 0.5);
        }
    }
}

//Sets thickness of shape outline
function ThicknessFunction(num) {
    lineThickness = num;

    if (shapeSelected && shape.name != "X" && (shape.name == "F" || shape.name == "Z" || shape.name == "H"))
    { //currently selected shape is not text

        shape.lineThickness = lineThickness;



        jotCanvas.Draw();

        if (shapeSelected)
            shape.DrawBox(context);
    }
}

function OutlineThicknessFunction(num) {
    outlineThickness = num;

    if (shapeSelected && shape.name != "H" && shape.name != "F" && shape.name != "Z" && shape.name != "X")
    {
     
        shape.outlineThickness = outlineThickness;

        jotCanvas.Draw();

        if (shapeSelected)
            shape.DrawBox(context);
    }
}

//shape fill color is selected
function ToolColor(num) {
    switch (num) {
        case 1:
            toolColor = "red";
            break;
        case 2:
            toolColor = "blue";
            break;
        case 3:
            toolColor = "green";
            break;
        case 4:
            toolColor = "yellow";
            break;
        case 5:
            toolColor = "purple";
            break;
        case 6:
            toolColor = "black";
            break;
        case 7:
            toolColor = "white";
            break;
        case 8:
            toolColor = "transparent";
            break;
        case 9:
            toolColor = "teal";
            break;
        case 10:
            toolColor = "brown";
            break;
        default:
    }

    if (shapeSelected && shape.name != "F" && shape.name != "H" && shape.name != "X" && shape.name != "Z") { //currently selected shape is not free-form line, text, or highlighter
        shape.fillColor = toolColor;
        jotCanvas.Draw();
    }

    if(shapeSelected)
        shape.DrawBox(context);
}

//line fill color is selected
function LineColor(num) {
    switch (num) {
        case 1:
            lineColor = "red";
            break;
        case 2:
            lineColor = "blue";
            break;
        case 3:
            lineColor = "green";
            break;
        case 4:
            lineColor = "yellow";
            break;
        case 5:
            lineColor = "purple";
            break;
        case 6:
            lineColor = "black";
            break;
        case 7:
            lineColor = "white";
            break;
        case 8:
            lineColor = "teal";
            break;
        case 9:
            lineColor = "brown";
            break;
        default:
    }

    if (shapeSelected && (shape.name == "F" || shape.name == "H")) { //currently selected shape is free-form line or highlighter
        shape.fillColor = lineColor;
        jotCanvas.Draw();
    }
}

//Tool fill color is selected
function TextColor(num) {
    switch (num) {
        case 1:
            textColor = "red";
            break;
        case 2:
            textColor = "blue";
            break;
        case 3:
            textColor = "green";
            break;
        case 4:
            textColor = "yellow";
            break;
        case 5:
            textColor = "purple";
            break;
        case 6:
            textColor = "black";
            break;
        case 7:
            textColor = "white";
            break;
        case 8:
            textColor = "teal";
            break;
        case 9:
            textColor = "brown";
            break;
        default:
    }

    if (textClicked) {
        shape.fillColor = textColor;
        jotCanvas.Draw();
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

//tool outline color is selected
function ToolOutlineColor(num) {
        switch (num) {
            case 1:
                toolOutlinecolor = "red"
                break;
            case 2:
                toolOutlinecolor = "blue"
                break;
            case 3:
                toolOutlinecolor = "green"
                break;
            case 4:
                toolOutlinecolor = "yellow"
                break;
            case 5:
                toolOutlinecolor = "purple"
                break;
            case 6:
                toolOutlinecolor = "black"
                break;
            case 7:
                toolOutlinecolor = "white"
                break;
            case 8:
                toolOutlinecolor = "teal"
                break;
            case 9:
                toolOutlinecolor = "brown"
                break;
            case 10:
                toolOutlinecolor = "transparent"
                break;
            default:
        }

        if (shapeSelected && shape.name != "F" && shape.name != "H" && shape.name != "X" && shape.name != "Z") {
            shape.outlineColor = toolOutlinecolor;
            jotCanvas.Draw();

            if (shapeSelected)
                shape.DrawBox(context);
        }
}

//tool is selected
function ToolFunction(num) {
    currentTool = num
}

function DeleteSelectedShape()
{
    if (shapeSelected || textClicked) {
        var temp = jotCanvas.marks.slice(0, selectedIndex);
        var temp2 = jotCanvas.marks.slice(selectedIndex + 1, jotCanvas.marks.length);
        jotCanvas.marks = temp.concat(temp2);
        m_marks = jotCanvas.marks;
        jotCanvas.Draw();
        shapeSelected = false;
        selectedIndex = -2;
        textClicked = false;
    }
}

//gets canvas coordinates
function getMousePosition(canvas, evt) {
        return {
            x: (evt.clientX - canvas.getBoundingClientRect().left) * (canvas.width / canvas.offsetWidth),
            y: (evt.clientY - canvas.getBoundingClientRect().top) * (canvas.height / canvas.offsetHeight)
        };
}

//Function that listens to keyboard input for character keys
document.addEventListener('keypress', function (evt) {
    if(textClicked)
    {
        switch (evt.keyCode) {
            case 13: //enter
                shape.AddLine();
                
                break;
            default:
                evt.preventDefault();
                shape.AddText(String.fromCharCode(evt.keyCode));
        }                  

        jotCanvas.Draw();
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}, false);

//Function that listens to keyboard input for non character keys
document.addEventListener('keydown', function (evt) {
    if (textClicked) {

        switch (evt.keyCode) {
            case 8: //backspace
                evt.preventDefault();
                shape.Backspace();  
                break;
            case 9: //tab
                evt.preventDefault();
                for (var i = 0; i < 8; i++) {
                    shape.AddText(' ');
                }
                break;
            case 37: //left
                evt.preventDefault();
                shape.MoveCursorLeft();
                break;
            case 38: //up
                evt.preventDefault();
                shape.MoveCursorUp();
                break;
            case 39: //right
                evt.preventDefault();
                shape.MoveCursorRight();
                break;
            case 40: //down
                evt.preventDefault();
                shape.MoveCursorDown();
                break;
            case 46: //delete
                evt.preventDefault();
                shape.Delete();
                break;
            default:
        }

        jotCanvas.Draw();
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }

    if (shapeSelected) {
        if(evt.keyCode == 46) //delete
        {
            DeleteSelectedShape();
        }
    }

}, false);

//function to paste text into textbox
document.addEventListener("paste", function (evt) {
    AddText(evt.clipboardData.getData('text/plain'));

}, false);


function AddText(string)
{
    if (textClicked) {
      //  var text = evt.clipboardData.getData('text/plain')

        for (var i = 0; i < text.length; i++) {
            if (text[i] == "\n") {
                shape.AddLine();
            }
            else
                shape.AddText(text[i]);
        }
        jotCanvas.Draw();
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }


}

function SaveNote()
{
    //SetStack();
    //document.getElementById("success-alert").innerHTML = "<strong>Note Saved</strong>";
    //ShowAlert();
}


canvas.addEventListener('mousedown', function (evt) {
    if(!mobile)
        MouseDown(evt);
}, false);

canvas.addEventListener('mousemove', function (evt) {
    if (!mobile)
        MouseMove(evt);
}, false);

canvas.addEventListener('mouseup', function (evt) {
    if (!mobile)
        MouseUp(evt);
}, false);

canvas.addEventListener('touchstart', function (evt) {
    evt.preventDefault();
    

    //if (mouseclicked)
   //     MouseUp(evt);


    evt = evt.touches[0];
    lastmove = evt;
   // alert(evt.clientX);

    mobile = true;
    MouseDown(evt);
}, false);

canvas.addEventListener('touchmove', function (evt) {
    evt.preventDefault();
    evt = evt.touches[0];
    lastmove = evt;

    mobile = true;
    MouseMove(evt);
}, false);

canvas.addEventListener('touchend', function (evt) {
    evt.preventDefault();
    evt = lastmove;
   // alert("touchend:" + evt.clientX);
    //alert();

    mobile = true;
    MouseUp(evt);
}, false);

canvas.addEventListener('touchcancel', function (evt) {
    evt.preventDefault();
    evt = evt.touches[0];

    mobile = true;
    MouseUp(evt);
}, false);

//Function that is called when mouse is clicked on the canvas
function MouseDown (evt) {
    var mousePos = getMousePosition(canvas, evt);
    startX = mousePos.x
    startY = mousePos.y;
    mouseclicked = true;


    if (shapeSelected || textClicked)
    {
        if (!shape.Contains(startX, startY)) {
            shapeSelected = false;
            textClicked = false;
        }

    }

    if (!shapeSelected && !textClicked) {

        switch (currentTool) {
            case 7: //free form line
                shape = new FreeFormLine(lineColor, lineThickness);
                shape.AddPoints(mousePos.x, mousePos.y);
                textClicked = false;
                break;
            case 8: //eraser
                shape = new Eraser(lineThickness);
                shape.AddPoints(mousePos.x, mousePos.y);
                textClicked = false;
                break;
            case 9: //text
                textClicked = false;
                break;
            default:
                textClicked = false;
        }

       // if (!textClicked) {
            jotCanvas.Draw();
      //      textClicked = false;
      //  }
    }

}

//Function that is called when mouse is moved on canvas
function MouseMove(evt) {

    if (mouseclicked) {
        var mousePos = getMousePosition(canvas, evt);

        if (!shapeSelected && !textClicked) {       

            switch (currentTool) {
                case 0: //Highlighter
                    shape = new Highlighter(startX, startY, mousePos.x, mousePos.y, lineColor, toolOutlinecolor, lineThickness);
                    break;
                case 1: //circle
                    shape = new Circle(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 2: //rectangle
                    shape = new Rectangle(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 3: //line
                    shape = new Line(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 4: //triangle
                    shape = new Triangle(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 5: //Square
                    shape = new Square(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 6:
                    shape = new Ellipse(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 7: //Free-form Line
                    shape.AddPoints(mousePos.x, mousePos.y);
                    break;
                case 8: //Eraser
                    shape.AddPoints(mousePos.x, mousePos.y);
                    break;
                case 9: //Text
                    shape = new Text(startX, startY, mousePos.x, mousePos.y, textColor, fontfamily, style, textSize);
                    jotCanvas.Draw();
                    shape.DrawBox(context);
                    break;

                default:
            }

            if (currentTool >= 0 && currentTool <= 8) {
                jotCanvas.Draw();
                shape.Draw(context);
            }
        }
        else
        {
            shape.Move(mousePos.x, mousePos.y);
            jotCanvas.Draw();
            shape.DrawBox(context);
        }
    }
}

//Function that is called when mouse is released on canvas
function MouseUp (evt) {
    var mousePos = getMousePosition(canvas, evt) //gets mouse coordinates

    if (mousePos.x != startX && mousePos.y != startY && mouseclicked) {

        if (!shapeSelected && !textClicked) {

            switch (currentTool) {
                case 0: //Highlighter
                    shape = new Highlighter(startX, startY, mousePos.x, mousePos.y, lineColor, toolOutlinecolor, lineThickness);
                    break;
                case 1: //circle
                    shape = new Circle(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 2: //rectangle
                    shape = new Rectangle(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 3: //line
                    shape = new Line(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 4: //triangle
                    shape = new Triangle(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 5: //square
                    shape = new Square(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 6: //Ellipse
                    shape = new Ellipse(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 7: //Free-Form Line
                    shape.AddPoints(mousePos.x, mousePos.y);
                    break;
                case 8: //Eraser Line
                    shape.AddPoints(mousePos.x, mousePos.y);
                    break;
                case 9: //Text
                    shape = new Text(startX, startY, mousePos.x, mousePos.y, textColor, fontfamily, style, textSize);
                    textClicked = true;
                    jotCanvas.Apply(shape);
                    ResetUndo();
                    selectedIndex = jotCanvas.marks.length - 1;
                    shape.DrawCursor(context);
                    shape.DrawBox(context);
                    if (mobile) {
                        var temp2 = window.prompt("Enter Text: ");
                        for (var i = 0; i < temp2.length; i++) {
                            shape.AddText(temp2[i]);
                        }
                    }

                    break;
                default:
            }

            if (currentTool >= 0 && currentTool <= 8) // tool is selected
            {
                jotCanvas.Apply(shape);
                jotCanvas.Draw();
                ResetUndo();
                selectedIndex = jotCanvas.marks.length - 1;
            }

        }
        else
        {
            shape.Move(mousePos.x, mousePos.y);
            jotCanvas.Draw();
            shape.DrawBox(context);
        }

    }
    else {
        shape = null;
        Selection(mousePos.x, mousePos.y);
    }
    mouseclicked = false;
}

//Selects shape at coordinates x,y
function Selection(x,y)
{
    var found = false;
    var i = jotCanvas.marks.length - 1;
    shapeSelected = false;
    selectedIndex = -1;

    while(!found && i >= 0)
    {
        var temp = jotCanvas.marks[i];
        if (temp.name == 'X' || temp.name == 'S' || temp.name == 'R' || temp.name == 'C' || temp.name == 'E') //Text, square, rectangle, circle, 
        {
            found = temp.Contains(x, y);

            if(found)
            {
                shape = jotCanvas.marks[i];
                shape.DrawBox(context);

                if (temp.name == 'X') {
                    shape.SetCursors(x, y, context);
                    shape.DrawCursor(context);
                    textClicked = true;

                    if (mobile) {
                        var temp2 = window.prompt("Enter Text: ");
                        for (var i = 0; i < temp2.length; i++) {
                            shape.AddText(temp2[i]);
                        }

                    }
                }
                else
                    shapeSelected = true;

                selectedIndex = i;
            }

            //if (x > temp.startX && x < (temp.startX + temp.width) &&
            //    y > temp.startY && y < (temp.startY + temp.height)) {
            //    found = true;
            //    shape = jotCanvas.marks[i];

            //    cursorXposition = 0;
            //    cursorYposition = parseInt((y - temp.startY) / temp.size);

            //    shape.DrawBox(context);
            //    shape.DrawCursor(context);
            //    textClicked = true;
            //}
        }
        i--;
    }
}

//mark is undone
function undo() {
    var c = document.getElementById("myCanvas");
    var b = c.getContext("2d");
    if (index_redo < max_undo) {

        redostack.push(jotCanvas.marks.pop());
        index_redo++;
        jotCanvas.Draw();
    }
    else {
        alert("You can not undo any more marks :(");
    }
}

//function that is called when when a new shape is 
//added to canvas, which increments max undo
function ResetUndo()
{
    if (index_redo > 0) {
        max_undo = 0;
        index_redo = 0;
        redostack = [];
    }

    if (max_undo < 10)
        max_undo++
}

//mark is redone
function redo() {
    if (index_redo != 0) {
        jotCanvas.Apply(redostack.pop());
        index_redo--;
        jotCanvas.Draw();
    }
}

//function that changes font of text drawn on canvas
function ChangeFont() {
    var SelectList = $('select#font');
    var selectedValue = $('option:selected', SelectList).val();

    document.getElementById("success-alert").innerHTML = "Font changed to " + selectedValue;
    //ShowAlert();

    fontfamily = selectedValue;
   
    
    if (textClicked) {
        shape.Change_Font(fontfamily);
        jotCanvas.Draw();
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

//function that changes bold/italic/underline status of 
//text drawn on canvas
function BIU(type) {
    if (style != type)
        style = type;
    else
        style = "normal";
    

    if (textClicked) {
        shape.Change_Font_Style(style);
        jotCanvas.Draw();
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

//changes size of text drawn on canvas
function ChangeFontSize(font_size) {
    showValue(font_size);
    
    textSize = parseInt(font_size);
    
    if (textClicked) {
        shape.Change_Font_Size(textSize);
        jotCanvas.Draw();
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

//Calls function to save canvas as pdf
// document.getElementById('download').addEventListener('click', function () {
//     downloadCanvas(this, 'myCanvas', 'Note');
// }, false);