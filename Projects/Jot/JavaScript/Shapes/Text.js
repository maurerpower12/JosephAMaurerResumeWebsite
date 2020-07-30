import {selectionHandles, drawResize, setCursorStyle, checkResize, drawResizerOutline} 
                from './Resize.js';

let cursorXposition = 0;
let cursorYposition = 0;
export const fontStyles = {normal: 0, bold: 1, italic: 2, smallCaps: 3 }

//constructor for text
class Text {
    constructor(startX, startY, endX, endY, fillColor = "black", 
                fontfamily = "Arial", style = fontStyles.normal, size = 30) {
        cursorXposition = 0;
        cursorYposition = 0;

        this.name = 'Text';
        this.startX = startX;
        this.startY = startY;

        this.fillColor = fillColor;

        this.style = style;
        this.fontStyles = [];
        this.size = size;
        this.font = fontfamily;

        this.width = endX - startX;
        if (this.width < 0) {
            this.startX += this.width;
            this.width *= -1;
        }

        this.height = endY - startY;
        if (this.height < 0) {
            this.startY += this.height;
            this.height *= -1;
        }

        this.lines = 1;

        this.content = [];
        this.content.push("");
    }
    Contains(x, y) {
        var found = false;
        if (x > this.startX && x < (this.startX + this.width) &&
            y > this.startY && y < (this.startY + this.height)) {

            found = true;
        }
        else {
            found = (checkResize(x, y) >= 0);
        }
        return found;
    }
    SetCursors(x, y, context) {
        var found = false;
        this.SetFontContext(context);
        var x1 = context.measureText(this.content[cursorYposition].substr(0, 1)).width;
        x -= this.startX;


        cursorYposition = parseInt((y - this.startY) / this.size);

        if (cursorYposition > this.content.length - 1)
            cursorYposition = this.content.length - 1;

        cursorXposition = 0;
        while (!found && x1 < x && cursorXposition < this.content[cursorYposition].length) {
            if (x1 >= x) {
                found = true;
            }
            else {
                cursorXposition++;
                x1 = context.measureText(this.content[cursorYposition].substr(0, cursorXposition + 1)).width;
            }
        }

    }
    //Text is drawn on the canvas
    Draw(context) {
        // Save the context state before modifiying.
        context.save();
        context.beginPath();
        this.SetFontContext(context);
        context.fillStyle = this.fillColor;

        // i is line no
        for (var i = 0; i < this.content.length; i++) {
            //this.SetFontContext(context);

            context.fillText(this.content[i], this.startX, (this.startY + i * this.size) + this.size);
            // i is line no
            // this.size is font size
        }

        context.closePath();

        // Save the context state before modifiying.
        context.restore();
    }
    //Draws textbox
    DrawBox(context) {
        var startX = this.startX;
        var startY = this.startY;
        var width = this.width;
        var height = this.height;

        drawResizerOutline(context, startX, startY, width, height);
    }
    //Draws cursor
    DrawCursor(context) {
        this.SetFontContext(context);
        var x = context.measureText(this.content[cursorYposition].substr(0, cursorXposition)).width + this.startX - 1;
        //console.log(x);
        context.fillStyle = "black";
        context.fillText('|', x - (3.5 * (this.size / 30)), (this.startY + (cursorYposition * this.size) + this.size));
    }
    //Character is added to text
    AddText(context, text) {
        var content = this.content.slice(); //content before text added
        var origContent = this.content.slice();
        var lineFull = true; //check if current line is full
        var length = 0; //length of line

        //var lines = this.lines;
        var lastCharinLine = false;
        var lineAdded = false;

        var maxLines = this.height / this.size; //max lines in text box

        var y = cursorYposition;
        var x = cursorXposition;

        var y1 = y; //y at beginning of function
        var x1 = x; //x at beginning of function

        var lastChar; //last character of line
        var temp; //string that holds line with added character
        var textAdded = false; //check if text was successfully added

        this.SetFontContext(context);

        while (lineFull && y < maxLines - 1) //last line was full and not add end of box
        {
            if (content[y])
                temp = content[y].slice(0, x) + text + content[y].slice(x); //places text at cursor x position
            else
                temp = text;

            length = context.measureText(temp).width; //length of line after text is added

            if (length >= this.width) //line is full
            {
                lineFull = true;

                if (x < content[y].length) //cursor is not at end of line
                {
                    lastChar = content[y][content[y].length - 1]; // last character

                    content[y] = content[y].slice(0, x)
                        + text //add text
                        + content[y].slice(x, content[y].length - 1); //remove last character

                    text = lastChar;
                }
                else { //cursor at end of line
                    lastCharinLine = true;
                    cursorYposition++;
                    //        this.lines++;
                    cursorXposition = 0;
                }

                y++;
                x = 0;
            }
            else { //line not full
                cursorXposition++;
                content[y] = temp;
                lineFull = false;
                textAdded = true;
            }

        }

        if (textAdded)
            this.content = content;
        else {
            this.content = origContent;
            cursorXposition = x1;
            cursorYposition = y1;
            //  this.lines = lines;
        }

    }
    //Function to remove character from text
    Backspace() {
        if (cursorXposition <= 1 && this.content.length > 1 && this.content[cursorYposition].length == 0) { //if only character on line and not only line
            this.content.splice(cursorYposition, 1);

            //this.lines--;
            cursorYposition--;
            cursorXposition = this.content[cursorYposition].length;
        }
        else if (cursorXposition > 0) { //if line has any characters
            var string = this.content[cursorYposition];
            this.content[cursorYposition] = string.slice(0, cursorXposition - 1) + string.slice(cursorXposition);
            // console.log(this.content[cursorYposition]);
            cursorXposition--;
        }
    }
    //Deletes next character form text
    Delete() {
        if (cursorXposition < (this.content[cursorYposition].length)) //cursor not at last postion
        {
            var string = this.content[cursorYposition];

            this.content[cursorYposition] = string.slice(0, cursorXposition) + string.slice(cursorXposition + 1);
            canAddtext = true;
        }
        else //cursor at last position on line
        {
            this.content[cursorYposition + 1] = this.content[cursorYposition + 1].slice(1, this.content[cursorYposition + 1].length); //first character removed from next line

            canAddtext = true;
        }

    }
    //Function to add a new line to text
    AddLine() {
        if ((this.content.length + 1) < (this.height / this.size)) { //line can be added

            var temp = []; //holds new content array
            var temp2 = this.content[cursorYposition]; //holds line in content

            for (var i = 0; i < cursorYposition; i++) //adds lines before current to temp
                temp.push(this.content[i]);

            temp.push(temp2.slice(0, cursorXposition)); //adds current line before x to temp

            if (cursorXposition < this.content[cursorYposition].length) //if not at end of line
                temp.push(temp2.slice(cursorXposition, temp2.length)); //adds current line after x to temp
            else
                temp.push(""); //adds new line

            for (var i = cursorYposition + 1; i < this.lines; i++) //adds lines after current to temp
                temp.push(this.content[i]);

            this.content = temp; //content is set to temp

            this.lines++;
            cursorYposition++;
            cursorXposition = 0;
        }
    }
    //Moves text cursor left
    MoveCursorLeft() {
        if (cursorXposition == 0 && cursorYposition > 0) {
            cursorYposition--;
            cursorXposition = this.content[cursorYposition].length;
        }
        else if (cursorXposition > 0)
            cursorXposition--;
    }
    //Moves text cursor right
    MoveCursorRight() {
        if (cursorXposition == this.content[cursorYposition].length && cursorYposition < (this.content.length - 1)) {
            cursorYposition++;
            cursorXposition = 0;
        }
        else if (cursorXposition < (this.content[cursorYposition].length))
            cursorXposition++;
    }
    //Moves text cursor up
    MoveCursorUp() {
        if (cursorYposition != 0) {
            cursorYposition--;

            if (cursorXposition > this.content[cursorYposition].length)
                cursorXposition = this.content[cursorYposition].length;
        }
    }
    //Moves text cursor down
    MoveCursorDown() {
        if (cursorYposition < (this.content.length - 1)) {
            cursorYposition++;

            if (cursorXposition > this.content[cursorYposition].length)
                cursorXposition = this.content[cursorYposition].length;
        }
    }
    //Changes font of text
    Change_Font(font) {
        this.font = font;
    }
    //Changes size of text
    Change_Font_Size(size) {
        this.size = size;
    }
    //Changes style of text
    Change_Font_Style(style) {
        if (this.fontStyles.includes(style)) {
            var index = this.fontStyles.indexOf(style);
            if (index > -1) {
                this.fontStyles.splice(index, 1);
            }
        }
        else {
            this.fontStyles.push(style);
        }
        this.style = style;
    }
    //sets text's stuff
    SetDimensions(startX, startY, fillColor, style, size, fontfamily, width, height, lines, content) {
        this.startX = startX;
        this.startY = startY;
        this.fillColor = fillColor;
        this.style = style;
        this.size = size;
        this.font = fontfamily;
        this.width = width;
        this.height = height;
        this.lines = lines;
        this.content = content;
    }
    Move(x, y) {
        // time ro resize!
        var oldx = this.startX;
        var oldy = this.startY;

        var foundIndex = checkResize(x, y);

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
            // TODO adjust text to fit within the box since we just resized it.
        }
        else { // We must be trying to reposition the shape.
            this.startX = x - this.width / 2;
            this.startY = y - this.height / 2;
            //this.startX = Math.round((x - this.width / 2) / grid) * grid;
            //this.startY = Math.round((y - this.height / 2) / grid) * grid;
        }
    }
    /**
     * Called everytime the mouse moves over the canvas.
     * @MouseMove
     */
    MouseMove(x, y) {
        setCursorStyle(x, y, this.startX, this.startY, this.width, this.height);
    }
    /**
     * Sets the font context to match the style.
     * @SetFontContext
     */
    SetFontContext(context) {
        var style = "";
        if (this.fontStyles.length == 0) {
            var style = " normal ";
        }
        else {
            for (var i = 0; i < this.fontStyles.length; i++) {
                style += " " + this.fontStyles[i] + " ";
            }
        }

        var finalStyle = style + this.size + "px " + this.font;
        //console.log(finalStyle);
        context.font = finalStyle;
        //console.log(context.font);
    }
}
export { Text };