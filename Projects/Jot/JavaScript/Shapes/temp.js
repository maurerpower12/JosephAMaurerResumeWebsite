// Last updated November 2010 by Simon Sarris
// www.simonsarris.com
// sarris@acm.org
//
// Free to use and distribute at will
// So long as you are nice to people, etc

// This is a self-executing function that I added only to stop this
// new script from interfering with the old one. It's a good idea in general, but not
// something I wanted to go over during this tutorial
(function(window) {


    // holds all our boxes
    var boxes2 = []; 
    
    // New, holds the 8 tiny boxes that will be our selection handles
    // the selection handles will be in this order:
    // 0  1  2
    // 3     4
    // 5  6  7
    var selectionHandles = [];
    
    // Hold canvas information
    var canvas;
    var ctx;
    var WIDTH;
    var HEIGHT;
    var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed
    
    var isDrag = false;
    var isResizeDrag = false;
    var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
    var mx, my; // mouse coordinates
    
     // when set to true, the canvas will redraw everything
     // invalidate() just sets this to false right now
     // we want to call invalidate() whenever we make a change
    var canvasValid = false;
    
    // The node (if any) being selected.
    // If in the future we want to select multiple objects, this will get turned into an array
    var mySel = null;
    
    // The selection color and width. Right now we have a red selection with a small width
    var mySelColor = '#CC0000';
    var mySelWidth = 2;
    var mySelBoxColor = 'darkred'; // New for selection boxes
    var mySelBoxSize = 6;
    
    // we use a fake canvas to draw individual shapes for selection testing
    var ghostcanvas;
    var gctx; // fake canvas context
    
    // since we can drag from anywhere in a node
    // instead of just its x/y corner, we need to save
    // the offset of the mouse when we start dragging.
    var offsetx, offsety;
    
    // Padding and border style widths for mouse offsets
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    
    
    
    
    // Box object to hold data
    function Box2() {
      this.x = 0;
      this.y = 0;
      this.w = 1; // default width and height?
      this.h = 1;
      this.fill = '#444444';
    }
    
    // New methods on the Box class
    Box2.prototype = {
      // we used to have a solo draw function
      // but now each box is responsible for its own drawing
      // mainDraw() will call this with the normal canvas
      // myDown will call this with the ghost canvas with 'black'
      draw: function(context, optionalColor) {
          if (context === gctx) {
            context.fillStyle = 'black'; // always want black for the ghost canvas
          } else {
            context.fillStyle = this.fill;
          }
          
          // We can skip the drawing of elements that have moved off the screen:
          if (this.x > WIDTH || this.y > HEIGHT) return; 
          if (this.x + this.w < 0 || this.y + this.h < 0) return;
          
          context.fillRect(this.x,this.y,this.w,this.h);
          
        // draw selection
        // this is a stroke along the box and also 8 new selection handles
        if (mySel === this) {
          context.strokeStyle = mySelColor;
          context.lineWidth = mySelWidth;
          context.strokeRect(this.x,this.y,this.w,this.h);
          
          // draw the boxes
          
          var half = mySelBoxSize / 2;
          
          // 0  1  2
          // 3     4
          // 5  6  7
          
          // top left, middle, right
          selectionHandles[0].x = this.x-half;
          selectionHandles[0].y = this.y-half;
          
          selectionHandles[1].x = this.x+this.w/2-half;
          selectionHandles[1].y = this.y-half;
          
          selectionHandles[2].x = this.x+this.w-half;
          selectionHandles[2].y = this.y-half;
          
          //middle left
          selectionHandles[3].x = this.x-half;
          selectionHandles[3].y = this.y+this.h/2-half;
          
          //middle right
          selectionHandles[4].x = this.x+this.w-half;
          selectionHandles[4].y = this.y+this.h/2-half;
          
          //bottom left, middle, right
          selectionHandles[6].x = this.x+this.w/2-half;
          selectionHandles[6].y = this.y+this.h-half;
          
          selectionHandles[5].x = this.x-half;
          selectionHandles[5].y = this.y+this.h-half;
          
          selectionHandles[7].x = this.x+this.w-half;
          selectionHandles[7].y = this.y+this.h-half;
    
          
          context.fillStyle = mySelBoxColor;
          for (var i = 0; i < 8; i ++) {
            var cur = selectionHandles[i];
            context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
          }
        }
        
      } // end draw
    
    }
    
    //Initialize a new Box, add it, and invalidate the canvas
    function addRect(x, y, w, h, fill) {
      var rect = new Box2;
      rect.x = x;
      rect.y = y;
      rect.w = w
      rect.h = h;
      rect.fill = fill;
      boxes2.push(rect);
      invalidate();
    }
    
    // initialize our canvas, add a ghost canvas, set draw loop
    // then add everything we want to intially exist on the canvas
    function init2() {
      canvas = document.getElementById('canvas2');
      HEIGHT = canvas.height;
      WIDTH = canvas.width;
      ctx = canvas.getContext('2d');
      ghostcanvas = document.createElement('canvas');
      ghostcanvas.height = HEIGHT;
      ghostcanvas.width = WIDTH;
      gctx = ghostcanvas.getContext('2d');
      
      //fixes a problem where double clicking causes text to get selected on the canvas
      canvas.onselectstart = function () { return false; }
      
      // fixes mouse co-ordinate problems when there's a border or padding
      // see getMouse for more detail
      if (document.defaultView && document.defaultView.getComputedStyle) {
        stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)     || 0;
        stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)      || 0;
        styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)  || 0;
      }
      
      // make mainDraw() fire every INTERVAL milliseconds
      setInterval(mainDraw, INTERVAL);
      
      // set our events. Up and down are for dragging,
      // double click is for making new boxes
      canvas.onmousedown = myDown;
      canvas.onmouseup = myUp;
      canvas.ondblclick = myDblClick;
      canvas.onmousemove = myMove;
      
      // set up the selection handle boxes
      for (var i = 0; i < 8; i ++) {
        var rect = new Box2;
        selectionHandles.push(rect);
      }
      
      // add custom initialization here:
    
      
      // add a large green rectangle
      addRect(260, 70, 60, 65, 'rgba(0,205,0,0.7)');
      
      // add a green-blue rectangle
      addRect(240, 120, 40, 40, 'rgba(2,165,165,0.7)');  
      
      // add a smaller purple rectangle
      addRect(45, 60, 25, 25, 'rgba(150,150,250,0.7)');
    }
    
    
    //wipes the canvas context
    function clear(c) {
      c.clearRect(0, 0, WIDTH, HEIGHT);
    }
    
    // Main draw loop.
    // While draw is called as often as the INTERVAL variable demands,
    // It only ever does something if the canvas gets invalidated by our code
    function mainDraw() {
      if (canvasValid == false) {
        clear(ctx);
        
        // Add stuff you want drawn in the background all the time here
        
        // draw all boxes
        var l = boxes2.length;
        for (var i = 0; i < l; i++) {
          boxes2[i].draw(ctx); // we used to call drawshape, but now each box draws itself
        }
        
        // Add stuff you want drawn on top all the time here
        
        canvasValid = true;
      }
    }
    
    // Happens when the mouse is moving inside the canvas
    function myMove(e){
      if (isDrag) {
        getMouse(e);
        
        mySel.x = mx - offsetx;
        mySel.y = my - offsety;   
        
        // something is changing position so we better invalidate the canvas!
        invalidate();
      } else if (isResizeDrag) {
        // time ro resize!
        var oldx = mySel.x;
        var oldy = mySel.y;
        
        // 0  1  2
        // 3     4
        // 5  6  7
        switch (expectResize) {
          case 0:
            mySel.x = mx;
            mySel.y = my;
            mySel.w += oldx - mx;
            mySel.h += oldy - my;
            break;
          case 1:
            mySel.y = my;
            mySel.h += oldy - my;
            break;
          case 2:
            mySel.y = my;
            mySel.w = mx - oldx;
            mySel.h += oldy - my;
            break;
          case 3:
            mySel.x = mx;
            mySel.w += oldx - mx;
            break;
          case 4:
            mySel.w = mx - oldx;
            break;
          case 5:
            mySel.x = mx;
            mySel.w += oldx - mx;
            mySel.h = my - oldy;
            break;
          case 6:
            mySel.h = my - oldy;
            break;
          case 7:
            mySel.w = mx - oldx;
            mySel.h = my - oldy;
            break;
        }
        
        invalidate();
      }
      
      getMouse(e);
      // if there's a selection see if we grabbed one of the selection handles
      if (mySel !== null && !isResizeDrag) {
        for (var i = 0; i < 8; i++) {
          // 0  1  2
          // 3     4
          // 5  6  7
          
          var cur = selectionHandles[i];
          
          // we dont need to use the ghost context because
          // selection handles will always be rectangles
          if (mx >= cur.x && mx <= cur.x + mySelBoxSize &&
              my >= cur.y && my <= cur.y + mySelBoxSize) {
            // we found one!
            expectResize = i;
            invalidate();
            
            switch (i) {
              case 0:
                this.style.cursor='nw-resize';
                break;
              case 1:
                this.style.cursor='n-resize';
                break;
              case 2:
                this.style.cursor='ne-resize';
                break;
              case 3:
                this.style.cursor='w-resize';
                break;
              case 4:
                this.style.cursor='e-resize';
                break;
              case 5:
                this.style.cursor='sw-resize';
                break;
              case 6:
                this.style.cursor='s-resize';
                break;
              case 7:
                this.style.cursor='se-resize';
                break;
            }
            return;
          }
          
        }
        // not over a selection box, return to normal
        isResizeDrag = false;
        expectResize = -1;
        this.style.cursor='auto';
      }
      
    }
    
    // Happens when the mouse is clicked in the canvas
    function myDown(e){
      getMouse(e);
      
      //we are over a selection box
      if (expectResize !== -1) {
        isResizeDrag = true;
        return;
      }
      
      clear(gctx);
      var l = boxes2.length;
      for (var i = l-1; i >= 0; i--) {
        // draw shape onto ghost context
        boxes2[i].draw(gctx, 'black');
        
        // get image data at the mouse x,y pixel
        var imageData = gctx.getImageData(mx, my, 1, 1);
        var index = (mx + my * imageData.width) * 4;
        
        // if the mouse pixel exists, select and break
        if (imageData.data[3] > 0) {
          mySel = boxes2[i];
          offsetx = mx - mySel.x;
          offsety = my - mySel.y;
          mySel.x = mx - offsetx;
          mySel.y = my - offsety;
          isDrag = true;
          
          invalidate();
          clear(gctx);
          return;
        }
        
      }
      // havent returned means we have selected nothing
      mySel = null;
      // clear the ghost canvas for next time
      clear(gctx);
      // invalidate because we might need the selection border to disappear
      invalidate();
    }
    
    function myUp(){
      isDrag = false;
      isResizeDrag = false;
      expectResize = -1;
    }
    
    // adds a new node
    function myDblClick(e) {
      getMouse(e);
      // for this method width and height determine the starting X and Y, too.
      // so I left them as vars in case someone wanted to make them args for something and copy this code
      var width = 20;
      var height = 20;
      addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)');
    }
    
    
    function invalidate() {
      canvasValid = false;
    }
    
    // Sets mx,my to the mouse position relative to the canvas
    // unfortunately this can be tricky, we have to worry about padding and borders
    function getMouse(e) {
          var element = canvas, offsetX = 0, offsetY = 0;
    
          if (element.offsetParent) {
            do {
              offsetX += element.offsetLeft;
              offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
          }
    
          // Add padding and border style widths to offset
          offsetX += stylePaddingLeft;
          offsetY += stylePaddingTop;
    
          offsetX += styleBorderLeft;
          offsetY += styleBorderTop;
    
          mx = e.pageX - offsetX;
          my = e.pageY - offsetY
    }
    
    // If you dont want to use <body onLoad='init()'>
    // You could uncomment this init() reference and place the script reference inside the body tag
    //init();
    window.init2 = init2;
    })(window);
    
    // Andy added, as a replacement for 
    // <body onLoad="init2()">
    $(document).ready(function(){
      // Your code here
      init2();
    });
    
    
    








    <!-- Code here for slide out menu -->
    <nav id="tool-bar">
        <div class="dropdown">
            <ul class="list-unstyled main-menu " id="tool-bar-content">

                <!--Include your navigation here-->
                <li class="text-right"><a id="nav-close">≫</a></li>

                <div id="TemplateModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Background Templates</h4>
                            </div>
                            <div class="modal-body" style="padding: 40px 50px;">
                                <div class="row">
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(1);">
                                            <img src="Background%20Templates/jpg/narrow%20ruled%202.jpeg"
                                                class="thumbnail img-responsive">
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(2);">
                                            <img src="Background%20Templates/jpg/todo%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(3)">
                                            <img src="Background%20Templates/jpg/dot%20grid%20med%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(4)">
                                            <img src="Background%20Templates/jpg/graph%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(6)">
                                            <!-- Engineering -->
                                            <img src="Background%20Templates/jpg/engineering_grey%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(7)">
                                            <img src="Background%20Templates/jpg/calendar%20week%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(8)">
                                            <img src="Background%20Templates/jpg/meeting%20notes%20basic%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(15)">
                                            <img src="Background%20Templates/jpg/meeting%20notes%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(14)">
                                            <img src="Background%20Templates/jpg/legal%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(16)">
                                            <img src="Background%20Templates/jpg/ruled%20margin%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(9)">
                                            <img src="Background%20Templates/jpg/music%20staves%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(10)">
                                            <img src="Background%20Templates/jpg/baseball%20portrait%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(11)">
                                            <img src="Background%20Templates/jpg/basketball%20landscape%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(12)">
                                            <img src="Background%20Templates/jpg/football%20landscape%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(13)">
                                            <img src="Background%20Templates/jpg/soccer%20landscape%202.jpeg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(18)">
                                            <img src="Background%20Templates/color/blue.jpg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(19)">
                                            <img src="Background%20Templates/color/Green.jpg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(20)">
                                            <img src="Background%20Templates/color/red.jpg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-xs-12">
                                        <a onclick="bgFunction(0)">
                                            <img src="Background%20Templates/color/white.jpg"
                                                class="thumbnail img-responsive" />
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button data-dismiss="modal" type="button"
                                    class="btn btn-success btn-default pull-right"><span
                                        class="glyphicon glyphicon-ok"></span>Save</button>
                                <button data-dismiss="modal" type="submit"
                                    class="btn btn-danger btn-default pull-left"><span
                                        class="glyphicon glyphicon-remove"></span>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--  Modal for sharing a note with another user.  -->
                <div id="ShareNoteModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="close" type="submit" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Who do you want to share this note with?</h4>
                            </div>
                            <div class="modal-body" style="padding: 40px 50px;">
                                <p style="color: #b40f18;">This feature is diabled, feel free to screenshot your
                                    drawling though!</p>
                                <p>Enter the email of who you want to share the note with: </p>
                                <p style="color: darkgrey;">For multiple emails, separate the emails with commas. </p>

                                <input type="text" id="DestEmailEntry" class="form-control" required="required" />
                                <center>
                                    <label class="radio-inline">Read Only</label>
                                    <input type="radio" id="read-only-permission" name="optradio" value="0"
                                        required="required" />
                                    <label class="radio-inline">Edit</label>
                                    <input type="radio" id="edit-permission" name="optradio" value="1" />
                                </center>
                            </div>

                            <div class="modal-footer">
                                <button data-dismiss="modal" type="button"
                                    class="btn btn-success btn-default pull-right"><span
                                        class="glyphicon glyphicon-ok"></span>Send</button>
                                <button data-dismiss="modal" type="submit"
                                    class="btn btn-danger btn-default pull-left"><span
                                        class="glyphicon glyphicon-remove"></span>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <div class="tool-bar-all" style="text-align:center;">
                    <!-- Sections with the buttons for the tool bar -->
                    <span title="Text">
                        <button id="btn1" class="dropdown-toggle" type="button" data-toggle="dropdown"
                            onclick="ToolFunction(9)">
                            <img src="Jot_Icons/Text.png" /></button>
                    </span>
                    <br />
                    <span title="Draw and Highligher">
                        <button id="btn2" class="dropdown-toggle" type="button" data-toggle="dropdown">
                            <img src="Jot_Icons/brush.png" /></button>
                    </span>

                    <br />

                    <span title="Shapes">
                        <button id="btn3" class="dropdown-toggle" type="button" data-toggle="dropdown">
                            <img src="Jot_Icons/Shapes.png" /></button>
                    </span>

                    <br />
                    <br />

                    <span title="Share/Export">
                        <button id="ShareNoteButton" type="button" data-toggle="dropdown"><i
                                class='fa fa-share-alt fa-4x' aria-hidden='true' style="color: #b40f18;"></i></button>
                    </span>
                    <br />
                    <br />

                    <span title="Settings">
                        <button id='btn4' class="dropdown-toggle" type="button" data-toggle="dropdown">
                            <img src="Jot_Icons/Settings.png" /></button>
                    </span>

                    <br />
                    <br />
                    <!--  END Sections with the buttons for the tool bar -->
                </div>
            </ul>

            <ul class="list-unstyled main-menu " id="tool-bar-text">
                <!-- Text Modal -->
                <button id="back-btn1" type="button" class="btn btn-danger pull-left"><span
                        class="glyphicon glyphicon-arrow-left"></span>Back</button>
                <br /> <br />
                <h4>Text Tool</h4>

                <br />
                <p>Select Text Size</p>
                <input type="range" id="textRange" min="5" max="90" step="1" value="30"
                    onchange="ChangeFontSize(this.value);">
                <span id="textsize" style="color: white">30</span>
                <br />
                <div class="col-center-block" style="align-content: center;" id="stylepicker">
                    <span class="stylepickercells" style="font-weight: bold" onclick="BIU('bold');"><i
                            class="material-icons">format_bold</i></span>
                    <span class="stylepickercells" style="font-style: italic" onclick="BIU('italic');"><i
                            class="material-icons">format_italic</i></span>
                    <span class="stylepickercells" style="font-style: italic; font-weight: bold"
                        onclick="BIU('italic bold');"><i class="material-icons">format_bold</i><i
                            class="material-icons">format_italic</i></span>
                    <span class="stylepickercells" onclick="BIU('small-caps');"><i
                            class="material-icons">text_fields</i></span>
                </div>
                <br />

                <p>Select a font</p>
                <select id="font" onchange="ChangeFont(this);">
                    <option style="font-family: arial;">Arial</option>
                    <option style="font-family: Verdana;">Verdana</option>
                    <option style="font-family: Times New Roman;">Times New Roman</option>
                    <option style="font-family: Courier New;">Courier New</option>
                    <option style="font-family: serif;">serif</option>
                    <option style="font-family: sans-serif;">sans-serif</option>
                    <option style="font-family: Comic Sans MS;">Comic Sans MS </option>
                    <option style="font-family: Lobster;">Lobster</option>
                </select>
                <br />
                <div id="colorpicker2" style="text-align: center; display: inline-block; margin: 2em; width: 50%;">
                    <p>Text Color</p>
                    <div class="col-sm-2 colorpickercells" style="background-color: red; height: 25px;"
                        onclick="TextColor(1)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: blue; height: 25px;"
                        onclick="TextColor(2)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: green; height: 25px;"
                        onclick="TextColor(3)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: yellow; height: 25px;"
                        onclick="TextColor(4)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: purple; height: 25px;"
                        onclick="TextColor(5)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: black; height: 25px;"
                        onclick="TextColor(6)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: white; height: 25px;"
                        onclick="TextColor(7)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: teal; height: 25px;"
                        onclick="TextColor(8)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: brown; height: 25px;"
                        onclick="TextColor(9)">
                        <br />
                    </div>
                </div>
                <br /> <br /> <br /> <br />
            </ul>

            <ul class="list-unstyled main-menu " id="tool-bar-draw">
                <button id="back-btn2" type="button" class="btn btn-danger pull-left"><span
                        class="glyphicon glyphicon-arrow-left"></span>Back</button>
                <br /><br />
                <h4>Draw Tool</h4>

                <div id="drawpicker" style="text-align: center; display: inline-block;">
                    <div id="Pen-tool" class="col-sm-2 drawpickercells" onclick="ToolFunction(7)">
                        <!-- <span title="Pencil"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></span> -->
                        <span title="Pencil"><i class="material-icons" style="font-size: 35px;">gesture</i></span>

                    </div>
                    <br /><br />
                    <div id="Highlighter-tool" class="col-sm-2 drawpickercells svg_ico" onclick="ToolFunction(0)">
                        <!-- <span title="Highligher"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></span> -->
                        <span title="Highligher"><img id="grey" src="Jot_Icons/high_ico_grey.png"
                                style="width: 35px; height: 35px;" /></span>
                    </div>
                    <br /><br />
                    <div onclick="ToolFunction(8)" class="col-sm-2 drawpickercells">
                        <span title="Eraser"><i class="fa fa-eraser fa-2x" aria-hidden="true"></i></span>
                    </div>
                    <br />
                </div>

                <br />
                <!-- color picker for the draw tools -->
                <div id="colorpicker" style="text-align: center; display: inline-block;">
                    <h5>Pen Color</h5>
                    <div class="col-sm-2 colorpickercells" style="background-color: red; height: 25px;"
                        onclick="LineColor(1); ">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: blue; height: 25px;"
                        onclick="LineColor(2)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: green; height: 25px;"
                        onclick="LineColor(3)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: yellow; height: 25px;"
                        onclick="LineColor(4)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: purple; height: 25px;"
                        onclick="LineColor(5)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: black; height: 25px;"
                        onclick="LineColor(6)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: white; height: 25px;"
                        onclick="LineColor(7)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: teal; height: 25px;"
                        onclick="LineColor(8)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: brown; height: 25px;"
                        onclick="LineColor(9)">
                        <br />
                    </div>
                    <div>
                        <input type="color" id="head" name="head" value="#e66465"></input>
                    </div>
                </div>

                <br />
                <!-- size picker for the size picker -->
                <div id="sizepicker" style="text-align: center; display: inline-block;">
                    <h5 class="title_pen" style="background-color: #18191b ! important;">Pen Size</h5>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(1)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em; width: 100%; ">
                            <circle cx="15" cy="20" r="1" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(2)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em; width: 100%; ">
                            <circle cx="15" cy="20" r="2" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(3)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em; width: 100%;">
                            <circle cx="15" cy="20" r="3" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(4)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em; width: 100%;">
                            <circle cx="15" cy="20" r="4" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(5)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="5" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(6)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="6" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(7)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="7" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(8)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="8" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(9)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="9" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(10)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="10" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(11)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="11" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(12)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="12" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(13)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="13" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(14)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="14" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                    <div class="col-sm-2 sizepickercells" onclick="ThicknessFunction(15)">
                        <svg height="40" width="40" style="position:absolute; top: 0em; left: 0em;  width: 100%;">
                            <circle cx="15" cy="20" r="15" stroke="black" stroke-width="3" fill="black" />
                        </svg>
                    </div>
                </div>
                <br /> <br /> <br /> <br />
            </ul>

            <ul class="list-unstyled main-menu " id="tool-bar-shapes">
                <!-- Shapes Settings -->
                <button id="back-btn3" type="button" class="btn btn-danger pull-left"><span
                        class="glyphicon glyphicon-arrow-left"></span>Back</button>
                <br /><br />
                <h4>Shapes Tool</h4>


                <br />
                <!-- Code to display the different shapes options to the user -->
                <div id="shapepicker" style="align-content:center; display: inline-block;">
                    <div class="col-sm-4 shapepickercells" onclick="ToolFunction(1); ">
                        <span title="Circle"> <i class="material-icons shape_ico_size"
                                style="font-size: 40px;">panorama_fish_eye</i></span>
                    </div>
                    <div class="col-sm-4 shapepickercells" onclick="ToolFunction(6)">
                        <span title="Ellipse"><i class="material-icons shape_ico_size"
                                style="font-size: 40px;">vignette</i></span>
                    </div>
                    <div class="col-sm-4 shapepickercells" onclick="ToolFunction(2)">
                        <span title="Rectangle"> <i class="material-icons shape_ico_size"
                                style="font-size: 40px;">crop_5_4</i></span>
                    </div>

                    <div class="col-sm-4 shapepickercells" onclick="ToolFunction(3)">
                        <span title="Line"><i class="material-icons shape_ico_size"
                                style="font-size: 40px;">linear_scale</i></span>
                    </div>
                    <div class="col-sm-4 shapepickercells" onclick="ToolFunction(4)">
                        <span title="Triangle"> <i class="material-icons shape_ico_size"
                                style="font-size: 40px;">change_history</i></span>
                    </div>
                    <div class="col-sm-4 shapepickercells" onclick="ToolFunction(5)">
                        <span title="Square"> <i class="material-icons shape_ico_size" style="font-size: 40px;">
                                check_box_outline_blank</i></span>
                    </div>
                    <div class="col-sm-4 shapepickercells" onclick="DeleteSelectedShape()">
                        <span title="Delete Selected Shape"> <i class="material-icons shape_ico_size"
                                style="font-size: 40px;"> delete</i></span>
                    </div>
                </div>

                <!-- Color picker for different shapes -->
                <div id="colorpicker2" style="text-align: center; display: inline-block; margin: 2em; width: 50%;">
                    <h5>Shape Color</h5>
                    <div class="col-sm-2 colorpickercells" style="background-color: red; height: 25px;"
                        onclick="ToolColor(1); ">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: blue; height: 25px;"
                        onclick="ToolColor(2)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: green; height: 25px;"
                        onclick="ToolColor(3)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: yellow; height: 25px;"
                        onclick="ToolColor(4)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: purple; height: 25px;"
                        onclick="ToolColor(5)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: black; height: 25px;"
                        onclick="ToolColor(6)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: white; height: 25px;"
                        onclick="ToolColor(7)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: teal; height: 25px;"
                        onclick="ToolColor(9)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: brown; height: 25px;"
                        onclick="ToolColor(10)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells"
                        style=" height: 25px; background-color: lightgrey; font-size: 15px; color:#6F7D8C; text-align: center; "
                        onclick="ToolColor(8)">
                        &#9940;
                    </div>
                </div>
                <!-- Color picker for the different outline colors -->
                <div id="colorpicker3" style="text-align: center; display: inline-block; margin: 2em; width: 50%;">
                    <h5>Shape Outline Color</h5>
                    <div class="col-sm-2 colorpickercells" style="background-color: red; height: 25px;"
                        onclick="ToolOutlineColor(1); ">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: blue; height: 25px;"
                        onclick="ToolOutlineColor(2)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: green; height: 25px;"
                        onclick="ToolOutlineColor(3)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: yellow; height: 25px;"
                        onclick="ToolOutlineColor(4)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: purple; height: 25px;"
                        onclick="ToolOutlineColor(5)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: black; height: 25px;"
                        onclick="ToolOutlineColor(6)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: white; height: 25px;"
                        onclick="ToolOutlineColor(7)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: teal; height: 25px;"
                        onclick="ToolOutlineColor(8)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells" style="background-color: brown; height: 25px;"
                        onclick="ToolOutlineColor(9)">
                        <br />
                    </div>
                    <div class="col-sm-2 colorpickercells"
                        style="height: 25px; background-color: lightgrey; font-size: 15px; color:#6F7D8C; text-align: center; "
                        onclick="ToolOutlineColor(10)">
                        &#9940;
                    </div>

                </div>
                <br /><br />
                <p>Outline Size</p>
                <input type="range" id="txtRange" min="1" max="20" step="1" value="10"
                    onchange="OutlineThicknessFunction(this.value); showValue2(this.value);">
                <span id="txtsize" style="color: white">10</span>
                <br /> <br /> <br /> <br />
            </ul>

            <ul class="list-unstyled main-menu " id="tool-bar-settings">
                <!-- Settings Modal -->
                <button id="back-btn4" type="button" class="btn btn-danger pull-left"><span
                        class="glyphicon glyphicon-arrow-left"></span>Back</button>
                <br /><br />
                <h4>Settings</h4>


                <span title="undo"><button type="button" onclick="undo()"><i
                            class="material-icons">undo</i></button></span>
                <span title="redo"><button type="button" onclick="redo()"><i
                            class="material-icons">redo</i></button></span>
                <span title="print"><button type="button" onclick="Print()"><i class="fa fa-print fa-2x"
                            aria-hidden="true"></i></button></span>
                <span title="download"><button type="button" onclick="downloadCanvas()"><i class="fa fa-download fa-2x"
                            aria-hidden="true"></i></button></span>
                <button id="TemplateButton" type="button" class="btn btn-default btn-block">Background
                    Templates</button>

                <h5>Set your own template</h5>
                <input class="btn btn-default btn-block" type="file" id="input" accept="image/jpeg, image/png"
                    onchange="handleFiles(this.files); " />
                <br />

                <br /><br />
                <h5>Left Hand mode</h5>
                <label class="switch" style="left: 5px; right: -5px;">
                    <input class="savecheckbox" type="checkbox" onchange="lefthandedmode();">
                    <div class="slider round" id="leftslider"></div>
                </label>

                <button type="button" onclick=" $('#Helpmodal').appendTo('body').modal('show');"><i
                        class="fa fa-question-circle"
                        style="position:absolute; bottom: 0px !important; right: 0px !important;"
                        aria-hidden="true"></i></button>

            </ul>
        </div>
    </nav>