//******************************************************************************************************
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

import {Circle} from './Shapes/Circle.js';
import {Ellipse} from './Shapes/Ellipse.js';
import {Eraser} from './Shapes/Eraser.js';
import {FreeFormLine} from './Shapes/FreeFormLine.js';
import {Highlighter} from './Shapes/Highlighter.js';
import {JotCanvas} from './Shapes/JotCanvas.js';
import {Line} from './Shapes/Line.js';
import {Rectangle} from './Shapes/Rectangle.js';
import {Square} from './Shapes/Square.js';
import {Text} from './Shapes/Text.js';
import {Triangle} from './Shapes/Triangle.js';
import {SprayPaintLine} from './Shapes/SprayPaintLine.js';

// This javascript controls which template is being put in the background.
var bgnum = 0;
var m_background = new Image();

var startX = 0; //shape start X coordinate
var startY = 0; //shape start Y coordinate
var mouseclicked = false;
var textClicked = false;
var shapeSelected = false;

var selectedIndex = -1;

var currentTool = -1; //currently selected tool

var lineColor = "black"; //free-form line and highlighter color
var lineThickness = 10;

var toolColor = "black"; //shape color
var toolOutlinecolor = "black"; //shape outline color
var outlineThickness = 10; //outline thickness of shapes
var rotation = 0;

var shape = null;

var canvas = document.getElementById("myCanvas"); //canvas
var context = canvas.getContext("2d"); //canvas context
var jotCanvas = new JotCanvas(canvas, context); //holds marks list and number of pages on note

var redostack = []; //stack to hold the undone stuff
var index_redo = 0; //max items that can currently be redone
var max_undo = 0; //max items that can currently be undone

var mobile = false;
var lastmove = null;

//setInterval(DrawCursor, 500); //timer for drawing cursor
var cursor = true; //variable that determines weather cursor should be drawn

//Draws blinking cursor
function DrawCursor() {
    jotCanvas.Draw(context);
    if (cursor && textClicked) {
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
    else if(textClicked) {
        shape.DrawBox(context);
    }
    cursor = !cursor;
}

//Sets background from selection
export function setBackground(num) {
    bgnum = num;

    var startingpath = 'Background%20Templates/jpg/';
    var startingcolors = 'Background%20Templates/color/';
    if(num == -12) {
        return;
    }

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
    m_background.onload = function () {
        jotCanvas.SetBackground(m_background);
    }
}

//function to load the user def image 
export function handleFiles(file) {
    if (checkFile(file)) {
        m_background.src = URL.createObjectURL(file);
        bgnum = -12;
    }
    else {
        console.log("invalid file");
    }
}

//Sets thickness of shape outline
export function ThicknessFunction(num) {
    lineThickness = num;

    if (shapeSelected && shape.name != "X" && (shape.name == "F" 
        || shape.name == "Z" || shape.name == "H"))
    { //currently selected shape is not text

        shape.lineThickness = lineThickness;

        jotCanvas.Draw(context);

        if (shapeSelected)
            shape.DrawBox(context);
    }
}

export function OutlineThicknessFunction(num) {
    outlineThickness = num;

    if (shapeSelected && shape.name != "H" && shape.name != "F" && shape.name 
            != "Z" && shape.name != "X")
    {
        shape.outlineThickness = outlineThickness;

        jotCanvas.Draw(context);

        if (shapeSelected)
            shape.DrawBox(context);
    }
}

//shape fill color is selected
export function ToolColor(color) {
    toolColor = color;

    //currently selected shape is not free-form line, text, or highlighter
    if (shapeSelected && shape.name != "F" && shape.name != "H" && 
            shape.name != "X" && shape.name != "Z") { 
        shape.fillColor = toolColor;
        jotCanvas.Draw(context);
    }

    if(shapeSelected) {
        shape.DrawBox(context);
    }
}

//line fill color is selected
export function LineColor(color) {
    lineColor = color;

    //currently selected shape is free-form line or highlighter
    if (shapeSelected && (shape.name == "F" || shape.name == "H")) { 
        shape.fillColor = lineColor;
        jotCanvas.Draw(context);
    }
}

//Tool fill color is selected
export function TextColor(color) {
    if (textClicked) {
        shape.fillColor = color;
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

//tool outline color is selected
export function ToolOutlineColor(color) {
    toolOutlinecolor = color;

    if (shapeSelected && shape.name != "F" && shape.name != "H" && shape.name != "X" && shape.name != "Z") {
        shape.outlineColor = toolOutlinecolor;
        jotCanvas.Draw(context);

        if (shapeSelected) {
            shape.DrawBox(context);
        }
    }
}

//tool is selected
export function SelectTool(num) {
    currentTool = num;
}

export function DeleteSelectedShape() {
    if (shapeSelected || textClicked) {
        var temp = jotCanvas.marks.slice(0, selectedIndex);
        var temp2 = jotCanvas.marks.slice(selectedIndex + 1, jotCanvas.marks.length);
        jotCanvas.marks = temp.concat(temp2);
        jotCanvas.Draw(context);
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
    if(textClicked) {
        switch (evt.keyCode) {
            case 13: //enter
                shape.AddLine();
                
                break;
            default:
                evt.preventDefault();
                shape.AddText(context, String.fromCharCode(evt.keyCode));
        }

        jotCanvas.Draw(context);
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

        jotCanvas.Draw(context);
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


function AddText(pasteString) {
    if (textClicked) {
        for (var i = 0; i < pasteString.length; i++) {
            if (text[i] == "\n") {
                shape.AddLine();
            }
            else {
                shape.AddText(pasteString[i]);
            }
        }
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}


canvas.addEventListener('mousedown', function (evt) {
    if(!mobile) {
        MouseDown(evt);
    }
}, false);

canvas.addEventListener('mousemove', function (evt) {
    if (!mobile) {
        MouseMove(evt);
    }
}, false);

canvas.addEventListener('mouseup', function (evt) {
    if (!mobile) {
        MouseUp(evt);
    }
}, false);

canvas.addEventListener('touchstart', function (evt) {
    evt.preventDefault();

    evt = evt.touches[0];
    lastmove = evt;

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


    if (shapeSelected || textClicked) {
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
            case 10: // Spray Paint 
                shape = new SprayPaintLine(lineColor, lineThickness);
                shape.AddPoints(mousePos.x, mousePos.y);
                textClicked = false;
                break;
            default:
                textClicked = false;
        }

        jotCanvas.Draw(context);
    }

}

//Function that is called when mouse is moved on canvas
function MouseMove(evt) {
    var mousePos = getMousePosition(canvas, evt);
    document.getElementById("xycoordinates").innerHTML = 
        "Coordinates: (" + mousePos.x.toFixed(2) + ", " + mousePos.y.toFixed(2) + ")";

    if (mouseclicked) {

        if (!shapeSelected && !textClicked) {

            switch (currentTool) {
                case 0: //Highlighter
                    shape = new Highlighter(startX, startY, mousePos.x, mousePos.y, lineColor, toolOutlinecolor, lineThickness);
                    break;
                case 1: //circle
                    shape = new Circle(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness);
                    break;
                case 2: //rectangle
                    shape = new Rectangle(startX, startY, mousePos.x, mousePos.y, toolColor, toolOutlinecolor, lineThickness, rotation);
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
                    shape = new Text(startX, startY, mousePos.x, mousePos.y);
                    jotCanvas.Draw(context);
                    shape.DrawBox(context);
                    break;
                case 10: // Spray Paint 
                    shape.AddPoints(mousePos.x, mousePos.y);
                    break;
                default:
            }

            if (currentTool >= 0 && currentTool <= 8 || currentTool == 10) {
                jotCanvas.Draw(context);
                shape.Draw(context);
            }
        }
        else {
            shape.Move(mousePos.x, mousePos.y);
            jotCanvas.Draw(context);
            shape.DrawBox(context);
        }
    }

    // See if the shapes need to update.
    var i = jotCanvas.marks.length - 1;

    // Loop backwards through all of the marks
    while(i >= 0) {
        jotCanvas.marks[i].MouseMove(mousePos.x, mousePos.y);
        i--;
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
                    shape = new Text(startX, startY, mousePos.x, mousePos.y);
                    textClicked = true;
                    jotCanvas.Apply(shape);
                    ResetUndo();
                    selectedIndex = jotCanvas.marks.length - 1;
                    shape.DrawCursor(context);
                    shape.DrawBox(context);
                    if (mobile) {
                        var temp2 = window.prompt("Enter Text: ");
                        for (var i = 0; i < temp2.length; i++) {
                            shape.AddText(context, temp2[i]);
                        }
                    }

                    break;
                case 10: // Spray Paint 
                    shape.AddPoints(mousePos.x, mousePos.y);
                    break;
                default:
            }

            if (currentTool >= 0 && currentTool <= 8 || currentTool == 10) // tool is selected
            {
                jotCanvas.Apply(shape);
                jotCanvas.Draw(context);


                ResetUndo();
                // We want to select the shape after we are done drawling it.
                // Draw the selected shape around the mark.
                shape.DrawBox(context);
                shapeSelected = true;
                selectedIndex = jotCanvas.marks.length - 1;
            }
        }
        else {
            shape.Move(mousePos.x, mousePos.y);
            jotCanvas.Draw(context);
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
function Selection(x,y) {
    var found = false;
    var i = jotCanvas.marks.length - 1;
    shapeSelected = false;
    selectedIndex = -1;

    // Loop backwards through all of the marks
    while(!found && i >= 0)
    {
        var temp = jotCanvas.marks[i];
        // Text, square, rectangle, circle, 
        if (temp.name == 'X' || temp.name == 'S' || temp.name == 'R' || 
            temp.name == 'C' || temp.name == 'E')
        {
            // Does this shape contain the coordinates where the user clicked?
            found = temp.Contains(x, y);

            if(found)
            {
                shape = jotCanvas.marks[i];
                // Draw the selected shape around the mark.
                shape.DrawBox(context);

                // Is this shape a text area?
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
                else {
                    shapeSelected = true;
                }

                selectedIndex = i;
            }
        }
        i--;
    }
}

//mark is undone
export function Undo() {
    if (index_redo < max_undo) {
        redostack.push(jotCanvas.marks.pop());
        index_redo++;
        jotCanvas.Draw(context);
    }
    else {
        alert("You can not undo any more marks :(");
    }
}

//function that is called when a new shape is 
//added to canvas, which increments max undo
function ResetUndo() {
    if (index_redo > 0) {
        max_undo = 0;
        index_redo = 0;
        redostack = [];
    }

    if (max_undo < 10) {
        max_undo++;
    }
}

//mark is redone
export function Redo() {
    if (index_redo != 0) {
        jotCanvas.Apply(redostack.pop());
        index_redo--;
        jotCanvas.Draw(context);
    }
}

// Clears the canvas
export function ClearAll() {
    jotCanvas.ResetCanvas();
}

//function that changes font of text drawn on canvas
export function ChangeFont(selectedValue) {
    if (textClicked) {
        shape.Change_Font(selectedValue);
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

//function that changes bold/italic/underline status of 
//text drawn on canvas
export function BIU(type) {
    console.log("Changing font style to: " + type);

    if (textClicked) {
        shape.Change_Font_Style(type);
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

//changes size of text drawn on canvas
export function ChangeFontSize(font_size) {
    var textSize = parseInt(font_size);
    
    if (textClicked) {
        shape.Change_Font_Size(textSize);
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}