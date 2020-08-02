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
var m_background = new Image();
m_background.onload = OnBackgroundImageLoaded;

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

/**
 * Draws a blinking cursor.
 * @function DrawCursor
 */
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

/**
 * Sets background from a passed source
 * @function SetBackgroundSource
 */
export function SetBackgroundSource(source) {
    m_background.src = source;
}

/**
 * Called when the background image loads.
 * @function OnBackgroundImageLoaded
 */
function OnBackgroundImageLoaded() {
    if (jotCanvas != null) {
        jotCanvas.SetBackground(m_background);
        jotCanvas.Draw(context);
    }
}

/**
 * Function to set the line thickness if applicable.
 * @function LineThickness
 */
export function LineThickness(num) {
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

/**
 * Function to set the outline thickness if applicable.
 * @function OutlineThickness
 */
export function OutlineThickness(num) {
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

/**
 * Shape fill color is selected.
 * @function ToolColor
 */
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

/**
 * Line fill color is selected.
 * @function LineColor
 */
export function LineColor(color) {
    lineColor = color;

    //currently selected shape is free-form line or highlighter
    if (shapeSelected && (shape.name == "F" || shape.name == "H")) { 
        shape.fillColor = lineColor;
        jotCanvas.Draw(context);
    }
}

/**
 * Tool fill color is selected.
 * @function TextColor
 */
export function TextColor(color) {
    if (textClicked) {
        shape.fillColor = color;
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

/**
 * Tool outline color is selected.
 * @function ToolOutlineColor
 */
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

/**
 * Selects a tool.
 * @function SelectTool
 */
export function SelectTool(num) {
    currentTool = num;
}

/**
 * Deletes the shape if one is selected.
 * @function DeleteSelectedShape
 */
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

/**
 * Gets the canvas coordinates.
 * @function getMousePosition
 */
function getMousePosition(canvas, evt) {
        return {
            x: (evt.clientX - canvas.getBoundingClientRect().left) * (canvas.width / canvas.offsetWidth),
            y: (evt.clientY - canvas.getBoundingClientRect().top) * (canvas.height / canvas.offsetHeight)
        };
}

/**
 * Listens to keyboard input for character keys.
 * @function addEventListener
 */
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

/**
 * Listens to keyboard input for non character keys.
 * @function addEventListener
 */
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

/**
 * Pastes text into a textbox.
 * @function addEventListener
 */
document.addEventListener('paste', function (evt) {
    AddText(evt.clipboardData.getData('text/plain'));
}, false);

/**
 * Adds text to a text shape.
 * @function AddText
 */
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

/**
 * Called on mouse down.
 * @function addEventListener
 */
canvas.addEventListener('mousedown', function (evt) {
    if(!mobile) {
        MouseDown(evt);
    }
}, false);

/**
 * Called on mouse move.
 * @function addEventListener
 */
canvas.addEventListener('mousemove', function (evt) {
    if (!mobile) {
        MouseMove(evt);
    }
}, false);

/**
 * Called on mouse up.
 * @function addEventListener
 */
canvas.addEventListener('mouseup', function (evt) {
    if (!mobile) {
        MouseUp(evt);
    }
}, false);

/**
 * Called on touch start. Needed for mobile.
 * @function addEventListener
 */
canvas.addEventListener('touchstart', function (evt) {
    evt.preventDefault();

    evt = evt.touches[0];
    lastmove = evt;

    mobile = true;
    MouseDown(evt);
}, false);

/**
 * Called on touch move. Needed for mobile.
 * @function addEventListener
 */
canvas.addEventListener('touchmove', function (evt) {
    evt.preventDefault();
    evt = evt.touches[0];
    lastmove = evt;

    mobile = true;
    MouseMove(evt);
}, false);

/**
 * Called on touch end. Needed for mobile.
 * @function addEventListener
 */
canvas.addEventListener('touchend', function (evt) {
    evt.preventDefault();
    evt = lastmove;

    mobile = true;
    MouseUp(evt);
}, false);

/**
 * Called on touch cancel. Needed for mobile.
 * @function addEventListener
 */
canvas.addEventListener('touchcancel', function (evt) {
    evt.preventDefault();
    evt = evt.touches[0];

    mobile = true;
    MouseUp(evt);
}, false);

/**
 * Called when mouse is clicked on the canvas.
 * @function MouseDown
 */
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
                shape = new SprayPaintLine(lineColor, $("#SprayDensity").val());
                shape.AddPoints(mousePos.x, mousePos.y);
                textClicked = false;
                break;
            default:
                textClicked = false;
        }

        jotCanvas.Draw(context);
    }

}

/**
 * Called when mouse is moved on canvas.
 * @function MouseMove
 */
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

/**
 * Called when mouse is released on canvas.
 * @function MouseUp
 */
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

/**
 * Selects shape at coordinates x,y
 * @function Selection
 */
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

/**
 * Undoes the last mark.
 * @function Undo
 */
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

/**
 * called when a new shape is added to canvas, which increments max undo.
 * @function ResetUndo
 */
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

/**
 * Redoes a mark.
 * @function Redo
 */
export function Redo() {
    if (index_redo != 0) {
        jotCanvas.Apply(redostack.pop());
        index_redo--;
        jotCanvas.Draw(context);
    }
}

/**
 * Clears the canvas.
 * @function ClearAll
 */
export function ClearAll() {
    jotCanvas.ResetCanvas();
}

/**
 * Changes font of text drawn on canvas.
 * @function ChangeFont
 */
export function ChangeFont(selectedValue) {
    if (textClicked) {
        shape.Change_Font(selectedValue);
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

/**
 * Function that changes bold/italic/underline status of text drawn on canvas
 * @function BIU
 */
export function BIU(type) {
    console.log("Changing font style to: " + type);

    if (textClicked) {
        shape.Change_Font_Style(type);
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

/**
 * Changes size of text drawn on canvas.
 * @function ChangeFontSize
 */
export function ChangeFontSize(font_size) {
    var textSize = parseInt(font_size);
    
    if (textClicked) {
        shape.Change_Font_Size(textSize);
        jotCanvas.Draw(context);
        shape.DrawCursor(context);
        shape.DrawBox(context);
    }
}

/**
 * Changes size of text drawn on canvas.
 * @function ChangeSprayDensity
 */
export function ChangeSprayDensity(density) {
    var density = parseFloat(density);
    
    if (shape != null && currentTool == 10) {
        shape.density = density;
    }
}

/**
 * Downloads the canvas data as an attachment.
 * @function DownloadCanvas
 */
export function DownloadCanvas() {
    if (jotCanvas != null) {
        //window.open(canvas.toDataURL());
        var link = document.createElement('a');
        link.download = 'JotNote.png';
        link.href = jotCanvas.GetCanvasData();
        link.click();
    }
    else {
        console.error("Unable to download because the canvas is empty.");
    }
}