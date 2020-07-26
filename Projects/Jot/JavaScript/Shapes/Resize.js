// Global Vars
var closeEnough = 30;
var resizeHandleSize = 15;
var resizeTopHandleOffset = -50;
var resizerlineWidth = 2;
var resizerOutlineColor = "#77c2f4FF";
var resizerMovingOutlineColor = "#77c2f499";
var isDragging = false;
var grid = 50;

// 0  1  2
// 3     4
// 5  6  7
export let selectionEnum = {
    "TopLeft" : 0,
    "TopMiddle" : 1,
    "TopRight" : 2,
    "MiddleLeft" : 3,
    "MiddleRight" : 4,
    "BottomLeft" : 5,
    "BottomMiddle" : 6,
    "BottomRight" : 7,
};

export let selectionHandles = [];
var numberOfSelectionHandles = 9;

var resizerInitialized = false;
// Box object to hold data
function resizeBox() {
    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;
    this.fill = '#77c2f4FF';
}

export let cursorMatrix = ['nw-resize', 'n-resize', 'ne-resize', 'w-resize',
    'e-resize', 'sw-resize', 's-resize', 'se-resize', 'crosshair'];

export function drawResize(context, startX, startY, width, height) {
    if (!resizerInitialized) {
        // set up the selection handle boxes
        for (var i = 0; i < numberOfSelectionHandles; i++) {
            selectionHandles.push(new resizeBox);
        }
        resizerInitialized = true;
    }

    context.fillStyle = "#00000000";
    context.fillRect(startX, startY, Math.abs(width), Math.abs(height));
    drawHandles(context, startX, startY, width, height);
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
    drawHandle(context, startX - half, startY - half, 0);

    // 1
    drawHandle(context, startX + width / 2 - half, startY - half, 1);

    // 2
    drawHandle(context, startX + width - half, startY - half, 2);

    // 3
    drawHandle(context, startX - half, startY + height / 2 - half, 3);

    // 4
    drawHandle(context, startX + width - half, startY + height / 2 - half, 4);

    // 5
    drawHandle(context, startX - half, startY + height - half, 5);

    // 6
    drawHandle(context, startX + width / 2 - half, startY + height - half, 6);

    // 7
    drawHandle(context, startX + width - half, startY + height - half, 7);

    // 8
    //drawHandle(context, startX + width/2-half, startY-half + resizeTopHandleOffset, 8);
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

// Are we close to the resize handles?
function checkCloseEnough(p1, p2) {
    return Math.abs(p1 - p2) < closeEnough;
}

function Move(x, y) {
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

            console.log("found: " + i);
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
        this.startX = Math.round((x - this.width / 2) / grid) * grid;
        this.startY = Math.round((y - this.height / 2) / grid) * grid;
    }
}

function drawResizerOutline(context, startX, startY, width, height) {
    context.beginPath();
    context.rect(startX, startY, width, height);
    context.lineWidth = resizerlineWidth;
    context.strokeStyle = resizerOutlineColor;
    context.stroke();
    drawResize(context, startX, startY, width, height);
}

function setCursorStyle(x, y, startX, startY, width, height) {
    // if there's a selection see if we grabbed one of the selection handles
    if (resizerInitialized) {
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
        if (x > startX && x < (startX + width) &&
            y > startY && y < (startY + height)) {
            document.body.style.cursor = 'move';
        }
        else {
            document.body.style.cursor = 'auto';
        }
    }
}

function checkResize(x, y) {
    // 0  1  2
    // 3     4
    // 5  6  7

    // Which handle is being pressed?
    var foundIndex = -1;
    if (resizerInitialized) {
        for (var i = 0; i < selectionHandles.length; i++) {
            var cur = selectionHandles[i];

            if (checkCloseEnough(x, cur.x) &&
                checkCloseEnough(y, cur.y)) {

                console.log("found: " + i);
                foundIndex = i;
                break;
            }
        }
    }
    return foundIndex;
}

export { checkCloseEnough, drawHandles, Move, drawResizerOutline, setCursorStyle, checkResize };