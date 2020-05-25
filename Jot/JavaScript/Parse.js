//******************************************************************************************************
//
// Name:        Joe Maurer & Joseph Matthews & Ashely Wagner
// Class:       CST 326 - Junior Project
// Project:     Jot by Verge
// Date:        March 6, 2016
// Description: 
//          This file is called from DrawPage.aspx
//          This file implements the following features:
//          1. Parse the serialized data that is stored in the database.
//          2. Populate the canvas with the marks that was stored for db.
//
//******************************************************************************************************
﻿document.write('<script type="text/javascript" src="JavaScript/Shapes.js"></script>');



function Parse(str) {
    var count = 0;              // testing count for # shapes
    var temp = "";
    var final = [];
    var fork = "";

    if (str[str.length - 1] != ']' && str[str.length - 1] != 1 && str[str.length - 1] != 'N') {
        var pages = str.substring(str.indexOf("]") + 1);
        jotCanvas.pages = pages;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        canvas.height = 1300 * jotCanvas.pages;
        var displayHeight = 11 * jotCanvas.pages;
        canvas.style.height = displayHeight + 'in';
    }
    
   // console.log(jotCanvas.pages);

    if (str[0] == '[') {
        var i = 1;
        while(str[i] != ']')    // while you're not at the end of the whole array
        {

            if (str[i] != '}') {    
                // read into a temporary string
                temp += str[i];
                i += 1;
            }
            else {
                temp += str[i]; // get final '}'
                i += 1;         // increment
                count += 1;     // test purposes
                final.push(temp);   // push string into array
                if (str[i] == ',')  // get right of spaces at ','s
                    i += 1;         // increment
                temp = "";          // clear temp
            }
        }
    }
    Populate(final);
}

function Populate(arr) {
    var arrLength = arr.length;
    var j = 0;
    var final = [];
    var temp = "";

    for (var j = 0; j < arrLength; j++) {
        final = arr[j].split(',');          // parse out the shape into another array
        var finalLength = final.length;     // length of the new array

        final[0] = final[0].replace('{', '');   // get rid of {}'s
        final[finalLength - 1] = final[finalLength - 1].replace('}', '');


        var len = final[0].length;              // get the length of the first element of the array 
        var type = final[0].charAt(len - 1);


        for (var k = 1; k < final.length; k++) {
            final[k] = final[k].substring(final[k].lastIndexOf(':') + 1);
        }

        switch (type)    // get the name identification of the shape
        {
            case 'T': { //triangle
                var shape = new Triangle();
                shape.SetDimensions(final[1], final[2], final[3], final[4], final[5], final[6], final[7]);

                jotCanvas.Apply(shape);
                break;
            }
            case 'L': { //line
                var shape = new Line();

                shape.SetDimensions(final[1], final[2], final[3], final[4], final[5], final[6], final[7]);

                jotCanvas.Apply(shape);
                break;
            }
            case 'S': { //square
                var shape = new Square();
                shape.SetDimensions(final[1], final[2], final[3], final[4], final[5], final[6], final[7]);

                jotCanvas.Apply(shape);
                break;
            }
            case 'R': { //rectangle
                var shape = new Rectangle();
                shape.SetDimensions(final[1], final[2], final[3], final[4], final[5], final[6], final[7]);

                jotCanvas.Apply(shape);
                break;
            }
            case 'E':  //Ellipse
                var shape = new Ellipse();
                shape.SetDimensions(final[1], final[2], final[3], final[4], final[5], final[6], final[7]);

                jotCanvas.Apply(shape);
                break;           
            case 'C':  //circle
                var shape = new Circle();
                shape.SetDimensions(final[1], final[2], final[3], final[4], final[5], final[6]);

                jotCanvas.Apply(shape);
                break;        
            case 'Z': { //eraser
                var temp = parseInt( final[finalLength - 1]);
               // console.log(temp);
                var shape = new Eraser(temp);
                for (var i = 1; i < (finalLength - 1) / 2; i++) {
                    shape.AddPoints(final[i], final[(finalLength / 2) + i - 1]);
                }
                jotCanvas.Apply(shape);
                //console.log(shape);
                break;
            }
            case 'F': { //free form line
                var shape = new FreeFormLine(final[finalLength - 2],final[finalLength - 1]);
                for (var i = 1; i < (finalLength - 2) / 2; i++) {
                    var x = (finalLength - 1) / 2 + i - 1;
                    shape.AddPoints(final[i], final[x]);
                }
                jotCanvas.Apply(shape);

                break;
            }
            case 'H': { //Highlighter
                var shape = new Highlighter();
              //  console.log("linewidth: "+ final[7]);
                shape.SetDimensions(final[1], final[2], final[3], final[4], final[5], final[6]);

                jotCanvas.Apply(shape);
                break;
            }
            case 'X': { //text
                final[5] = parseInt(final[5]); // size
                final[9] = parseInt(final[9]); // lines
                final[2] = parseFloat(final[2]);//start y
                final[1] = parseFloat(final[1]);//start x
                final[7] = parseFloat(final[7]);//width
                final[8] = parseFloat(final[8]);//height

                var shape = new Text();

                //////////Put all of the content into cell 10
                var i = 0;
                var contentarr = [];
                var temp;
                while (i != (final.length - 10)) {
                 //   console.log("Content item " + final[(10 + i)]);
                    contentarr[i] = final[(10 + i)];

                    contentarr[i] = contentarr[i].replace(/[/][Q][Q]/g, '\"'); //double quote
                    contentarr[i] = contentarr[i].replace(/[/][Q]/g, '\''); //single quote
                    contentarr[i] = contentarr[i].replace(/[/][S]/g, '\\'); //backslash
                    contentarr[i] = contentarr[i].replace(/[/][L][C]/g, "{");
                    contentarr[i] = contentarr[i].replace(/[/][R][C]/g, '}');
                    contentarr[i] = contentarr[i].replace(/[/][L][B]/g, '[');
                    contentarr[i] = contentarr[i].replace(/[/][R][B]/g, ']');
                    contentarr[i] = contentarr[i].replace(/[/][C][C]/g, ':');
                    contentarr[i] = contentarr[i].replace(/[/][C]/g, ',');
                    
                    contentarr[i] = contentarr[i].replace(/[S][L][A][S][H][S][L][A][S][H]/g, '/'); //slash

                    i++;
                }

                shape.SetDimensions(final[1], final[2], final[3], final[4], final[5], final[6], final[7], final[8], final[9], contentarr);

                jotCanvas.Apply(shape);
                break;
            }
            default: {
                break;
            }
        }
    }
   // jotCanvas.Draw();
}