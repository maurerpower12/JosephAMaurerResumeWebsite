// Global Vars
var closeEnough = 30;
var resizeHandleSize = 15;
var resizeTopHandleOffset = -50;
var resizerOutlineColor = "#77c2f4FF";
var resizerMovingOutlineColor = "#77c2f499";
var isDragging = false;
var grid = 50;
var outlineXOffset = 15;
var outlineYOffset = 30;

// 0  1  2
// 3     4
// 5  6  7
var selectionHandles = [];
var numberOfSelectionHandles = 9;

var init = false;
// Box object to hold data
function resizeBox() {
    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;
    this.fill = '#77c2f4FF';
}

var cursorMatrix = ['nw-resize','n-resize','ne-resize','w-resize',
                    'e-resize','sw-resize','s-resize','se-resize', 'crosshair'];

//RECTANGLE CLASS
var Rectangle = function (startX, startY, endX, endY, fillColor, outlineColor, outlinethickness, rotation) {
    this.name = 'R';
    if (startX === undefined) {
        this.startX = 0;
        this.startY = 0;
        this.width = 0;
        this.height = 0;

        this.fillColor = null;
        this.outlineColor = null;
        this.outlineThickness = 0;
        this.rotation = 0;
    }
    else {
        this.startX = startX;
        this.startY = startY;

        this.width = (endX - startX);
        if (this.width < 0) {
            this.startX += this.width;
            this.width *= -1;
        }

        this.height = (endY - startY);
        if (this.height < 0) {
            this.startY += this.height;
            this.height *= -1;
        }

        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
        this.outlineThickness = outlinethickness;

        this.rotation = rotation;
    }
}

Rectangle.prototype.Contains = function (x, y) {
    var found = false;
    // Did we click inside the rectange?
    if (x > this.startX && x < (this.startX + this.width) &&
        y > this.startY && y < (this.startY + this.height)) {
        found = true;
    }
    else
    {
        // Did we click near one of the resize handles?
        for (var i = 0; i < selectionHandles.length; i++) {
            var cur = selectionHandles[i];
  
            // are we pressing a resize button?
            if (x >= cur.x && x <= cur.x + resizeHandleSize &&
                y >= cur.y && y <= cur.y + resizeHandleSize) {
                    found = true;
                    break;
            }
        }
    }
    return found;
}

Rectangle.prototype.SetDimensions = function (startX, startY, width, length, fillColor, outlineColor, outlineThickness) {
    this.startX = parseFloat( startX);
    this.startY = parseFloat( startY);
    this.width = parseFloat( width);
    this.height = parseFloat( length);

    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outlineThickness = outlineThickness;
}

//Draws Rectangle on canvas
Rectangle.prototype.Draw = function (context) {
    context.beginPath();
    context.rect(this.startX, this.startY, this.width, this.height);
    context.rotate(this.rotation * Math.PI / 180);
    context.fillStyle = this.fillColor;
    context.fill();
    context.lineWidth = this.outlineThickness;
    context.strokeStyle = this.outlineColor;
    context.setLineDash([]);
    context.stroke();
}

Rectangle.prototype.DrawBox = function (context) {
    context.beginPath();
    var startX = this.startX - outlineXOffset;
    var startY = this.startY - outlineXOffset;
    var width = this.width + outlineYOffset;
    var height = this.height + outlineYOffset;
    context.rect(startX, startY, width, height);
    context.lineWidth = 2;
    context.strokeStyle = resizerOutlineColor;
    context.stroke();
    drawResize(context, startX, startY, width, height);
}

Rectangle.prototype.Move = function (x, y) {
    //var half = (resizeHandleSize / 2);
    // time ro resize!
    var oldx = this.startX;
    var oldy = this.startY;

    // 0  1  2
    // 3     4
    // 5  6  7

    // Which handle is being pressed?
    var foundIndex = -1;
    for (var i = 0; i < selectionHandles.length; i++) {
        var cur = selectionHandles[i];

        if (checkCloseEnough(x, cur.x) &&
            checkCloseEnough(y, cur.y)) {

            console.log("found: " + i) 
                foundIndex = i;
                break;
        }
    }

    if (foundIndex >= 0) {
        switch (foundIndex) {
            case 0:
                this.width += this.startX - x;
                this.height += this.startY - y;
                this.startX = x;
                this.startY = y;
                break;
            case 1:
                this.height += this.startY - y;
                this.startY = y;
                break;
            case 2:
                this.width = Math.abs(this.startX - x);
                this.height += this.startY - y;
                this.startY = y;
                break;
            case 3:
                this.startX = x;
                this.width += (oldx - x);
                break;
            case 4:
                this.width = x - this.startX;
                break;
            case 5:
                this.width += this.startX - x;
                this.height = Math.abs(this.startY - y);
                this.startX = x;
                break;
            case 6:
                this.height = Math.abs(this.startY - y);
                break;
            case 7:
                this.width = Math.abs(this.startX - x);
                this.height = Math.abs(this.startY - y);
                break;
            default:
                console.log("out of bounds");
                break;
        }
    }
    else { // We must be trying to reposition the shape.
        //     // this.startX = x - this.width / 2;
        //     // this.startY = y - this.height / 2;
        this.startX = Math.round((x - this.width/2) / grid) * grid;
        this.startY = Math.round((y - this.height/2) / grid) * grid;
    }
}

// Called everytime the mouse moves
Rectangle.prototype.MouseMove = function (x, y) {
  // if there's a selection see if we grabbed one of the selection handles
  if (init) {
      for (var i = 0; i < selectionHandles.length; i++) {
          var cur = selectionHandles[i];

          // we dont need to use the ghost context because
          // selection handles will always be rectangles
          if (x >= cur.x && x <= cur.x + resizeHandleSize &&
              y >= cur.y && y <= cur.y + resizeHandleSize) {
                document.body.style.cursor = cursorMatrix[i];
                return;
          }
      }

    // Is the mouse inside the rectange?
    if (x > this.startX && x < (this.startX + this.width) &&
        y > this.startY && y < (this.startY + this.height)) {
        document.body.style.cursor ='move';
    }
    else {
        document.body.style.cursor = 'auto';
    }
  }
}

// Draws the resize window.
function drawResize(context, startX, startY, width, height) {
    if(!init) {
        // set up the selection handle boxes
        for (var i = 0; i < numberOfSelectionHandles; i ++) {
            selectionHandles.push(new resizeBox);
        }
        init = true;
    }

    context.fillStyle = "#00000000";
    context.fillRect(startX, startY, Math.abs(width), Math.abs(height));
    drawHandles(context, startX, startY, width, height);
}

// Draw a circle for resizing.
function drawHandle(context, x, y, index) {
    context.beginPath();
    context.rect(x, y, resizeHandleSize, resizeHandleSize);
    context.lineWidth = 2;
    context.strokeStyle = isDragging ? resizerMovingOutlineColor : resizerOutlineColor;
    context.stroke();

    // Update the position of this handle.
    selectionHandles[index].x = x;
    selectionHandles[index].y = y;
}

// This draws the resizeable handles.
function drawHandles(context, startX, startY, width, height) {
    var half = (resizeHandleSize / 2);
    // Here's the layout of the handles
    //    8
    // 0  1  2
    // 3     4
    // 5  6  7

    // 0
    drawHandle(context, startX-half, startY-half, 0);

    // 1
    drawHandle(context, startX + width/2-half, startY-half, 1);

    // 2
    drawHandle(context, startX + width-half, startY-half, 2);

    // 3
    drawHandle(context, startX - half, startY+height/2-half, 3);

    // 4
    drawHandle(context, startX + width - half, startY+height/2-half, 4);

    // 5
    drawHandle(context, startX - half, startY+height-half, 5);

    // 6
    drawHandle(context, startX + width/2 - half, startY+height-half, 6);

    // 7
    drawHandle(context, startX + width - half, startY+height-half, 7);

    // 8
    //drawHandle(context, startX + width/2-half, startY-half + resizeTopHandleOffset, 8);
}

// Are we close to the resize handles?
function checkCloseEnough(p1, p2) {
    return Math.abs(p1 - p2) < closeEnough;
}