
import {SelectTool, Undo, Redo, ClearAll, 
    ChangeFont, BIU, ChangeFontSize,
    ToolColor, LineColor, TextColor,
    ToolOutlineColor, OutlineThicknessFunction,
    ThicknessFunction, handleFiles,
    setBackground
} from './Shapes.js';

$(document).ready(function () {
    // Hide the pop up so that it isn't displays when the page first loads
    $("#TemplateModal").hide(); // hide the template with the modal

    // hide the layers for the tools
    $('#tool-bar-text').hide();
    $('#tool-bar-draw').hide();
    $('#tool-bar-shapes').hide();
    $('#tool-bar-settings').hide();

    // Navigation Menu Slider
    $('#nav-expander').on('click', function (e) {
        e.preventDefault();
        $('#sidePanel').toggle();
    });

    $('#nav-close').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('nav-expanded');
        
        $('#tool-bar').hide();
        $('body').toggleClass('nav-expanded');
    });

    // These function show and hide the different settings panels for each option in the tool bar
    $('#btn1').click(function () { // btn 1 maps to text settings
        disableMenuItems();
        $('#tool-bar-text').show();
        $('#sidePanel').show();
        SelectTool(9);
    });
    $('#btn2').click(function () { // btn 2 maps to draw settings 
        disableMenuItems();
        $('#tool-bar-draw').show();
        $('#sidePanel').show();
    });
    $('#btn3').click(function () { // btn 3 maps to the shapes settings
        disableMenuItems();
        $('#tool-bar-shapes').show();
        $('#sidePanel').show();
    });
    $('#btn4').click(function () { // btn 4 maps to the settings
        disableMenuItems();
        $('#tool-bar-settings').show();
        $('#sidePanel').show();
    });
    $('#DebugIcon').click(function () { // btn 4 maps to the settings
        disableMenuItems();
        $('#debug').show();
        $('#sidePanel').show();
    });

    $('#ShareNoteButton').click(function () {
        $("#ShareNoteModal").appendTo("body").modal('show');
    });
    $('#TemplateButton').click(function () {
        $("#TemplateModal").appendTo("body").modal('show');
    });

    // Text Tools Buttons
    $("#BoldText").click(function () { 
        disableDrawTools();
        $(this).addClass("active");
        BIU('bold');
    });
    $("#ItalicText").click(function () { 
        disableDrawTools();
        $(this).addClass("active");
        BIU('italic');
    });
    $("#SmallCapsText").click(function () { 
        disableDrawTools();
        $(this).addClass("active");
        BIU('small-caps');
    });

    // Draw Tools Buttons
    $("#PenTool").click(function () { 
        disableDrawTools();
        $(this).removeClass("disabled");
        $(this).addClass("active");
        SelectTool(7);
    });
    $("#HighlighterTool").click(function () { 
        disableDrawTools();
        $(this).removeClass("disabled");
        $(this).addClass("active");
        SelectTool(0);
    });
    $("#EraserTool").click(function () { 
        disableDrawTools();
        $(this).removeClass("disabled");
        $(this).addClass("active");
        SelectTool(8);
    });
    $("#PenStyle").click(function () { 
        disableDrawTools();
        $(this).removeClass("disabled");
        $(this).addClass("active");
        console.log("can't set the draw tool type yet" + this);
    });
    $("#Felt").click(function () { 
        disableDrawTools();
        $(this).removeClass("disabled");
        $(this).addClass("active");
        console.log("can't set the draw tool type yet" + this);
    });
    $("#SprayPaint").click(function () { 
        disableDrawTools();
        $(this).removeClass("disabled");
        $(this).addClass("active");
        console.log("can't set the draw tool type yet" + this);
    });

    // Shape Tool Buttons
    $("#CircleShape").click(function (e) { 
        disableShapeButtons();
        $(this).removeClass("disabled");
        $(this).addClass("active");

        SelectTool(1);
    });
    $("#OvalShape").click(function () {
        disableShapeButtons();
        $(this).removeClass("disabled");
        $(this).addClass("active");
    });
    $("#RectangleShape").click(function () { 
        disableShapeButtons();
        $(this).removeClass("disabled");
        $(this).addClass("active");

        SelectTool(2);
    });
    $("#LineShape").click(function () { 
        disableShapeButtons();
        $(this).removeClass("disabled");
        $(this).addClass("active");

        SelectTool(3);
    });
    $("#TriangleShape").click(function () { 
        $("#shapepicker button").each(function(){
            $(this).addClass("disabled");
        })
        $(this).removeClass("disabled");
        $(this).addClass("active");

        SelectTool(4);
    });
    $("#SquareShape").click(function () { 
        disableShapeButtons();
        $(this).removeClass("disabled");
        $(this).addClass("active");

        SelectTool(5);
    });

    // Lower left hand corner button events
    $("#DeleteSelection").click(function () { 
        
    });
    $("#ClearAllIcon").click(function () { 
        ClearAll();
    });
    $("#UndoIcon").click(function () { 
        Undo();
    });
    $("#RedoIcon").click(function () { 
        Redo();
    });
    

    $("#DownloadCanvas").click(function () { 
        console.log(this.id);
        downloadCanvas(this);
    });
    $("#WhiteBackground").click(function () { 
        setBackground(0);
    });
    $("#NarrowRuledBackground").click(function () { 
        setBackground(1);
    });
    $("#TodoBackground").click(function () { 
        setBackground(2);
    });
    $("#DotGridBackground").click(function () { 
        setBackground(3);
    });
    $("#GraphBackground").click(function () { 
        setBackground(4);
    });
    $("#EngineeringBackground").click(function () { 
        setBackground(6);
    });
    $("#CalendarWeekBackground").click(function () { 
        setBackground(7);
    });
    $("#MeetingNotesBasicBackground").click(function () { 
        setBackground(8);
    });
    $("#MusicStavesBackground").click(function () { 
        setBackground(9);
    });
    $("#BaseballBackground").click(function () { 
        setBackground(10);
    });
    $("#BasketballBackground").click(function () { 
        setBackground(11);
    });
    $("#FootballBackground").click(function () { 
        setBackground(12);
    });
    $("#SoccerBackground").click(function () { 
        setBackground(13);
    });
    $("#LegalNotesBackground").click(function () { 
        setBackground(14);
    });
    $("#MeetingNotesBackground").click(function () { 
        setBackground(15);
    });
    $("#RuledMarginBackground").click(function () { 
        setBackground(16);
    });
    $("#BlueBackground").click(function () { 
        setBackground(18);
    });
    $("#GreenBackground").click(function () { 
        setBackground(19);
    });
    $("#RedBackground").click(function () { 
        setBackground(20);
    });
    // ------ End On Click Event Functions

    $("#shapeFillColor").on("change", function (event) {
        ToolColor(event.target.value);
    });

    $("#shapeOutlineColor").on("change", function (event) {
        ToolOutlineColor(event.target.value);
    });

    $("#penColor").on("change", function (event) {
        LineColor(event.target.value);
    });

    $("#textColor").on("change", function (event) {
        TextColor(event.target.value);
    });

    $("#penSize").on("change", function (event) {
        ThicknessFunction(event.target.value);

        document.getElementById("penSizeSample").setAttribute('r', event.target.value);
    });

    $("#shapeSize").on("change", function (event) {
        console.log(event.target.value);
        OutlineThicknessFunction(this.value);

        document.getElementById("shapeSizeSample").setAttribute('r', event.target.value);
    });

    $("#BackgroundFileInput").on("change", function (event) {
        var file = $(this).prop('files')[0];
        console.log("Uploading file: " + file.name);
        handleFiles(file);
    });

    $("#LeftHandMode").on("change", function (event) {
        lefthandedmode();
    });

    $("#FontSize").on("change", function (event) {
        console.log("Changing Font Size to: " + this.value);
        ChangeFontSize(this.value);
    });

    $("#Font").on("change", function (event) {
        console.log("Changing Font to: " + this.value);
        ChangeFont(this.value);
    });

    // Disables all buttons in the shape picker
    function disableShapeButtons() {
        $("#shapepicker button").each(function(btn){
            $( this ).addClass("disabled");
        })
    };

    // Disables all menu itesm
    function disableMenuItems() {
        $(".main-menu").each(function(){
            $( this ).hide();
        })
    };

    // Disable all Draw Tool Buttons
    function disableDrawTools() {
        $("#DrawTools button").each(function(){
            $( this ).addClass("disabled");
        })
    };
});

$(document).on('click', '[name="toolSelectorBtn"]', function(e) {
    e.stopPropagation();

    $("#toolSelector button").each(function(btn){
        $( this ).removeClass("btn-outline-danger");
        $(this).addClass("btn-outline-secondary");
    })

    $(this).addClass("btn-outline-danger");
});

$(window).bind('keydown', function (event) {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        switch (String.fromCharCode(event.which).toLowerCase()) {
            case 's': // CTRL S calls save
                break;
            case 'z': // CTRL Z calls undo
                undo();
                break;
            case 'p': // CTRL P calls print
                Print();
                break;
            case 'q': // CTRL Q calls redo
                redo();
                break;
            case 'h': // CTRL H displays the help section
                $("#Helpmodal").appendTo("body").modal('show');
                break;
            case '1': // CTRL 1 Selects the Circle Tool
                SelectTool(1);
                break;
            case '2': // CTRL 2 Selects the Rectangle Tool
                SelectTool(2);
                break;
            case '3': // CTRL 3 Selects the Line Tool
                SelectTool(3);
                break;
            case '4': // CTRL 4 Selects the Triangle Tool
                SelectTool(4);
                break;
            case '5': // CTRL 5 Selects the Square Tool
                SelectTool(5);
                break;
            case '6': // CTRL 6 Selects the FreeForm Tool
                SelectTool(7);
                break;
            case '7': // CTRL 7 Selects the Eraser Tool
                SelectTool(8);
                break;
            case '8': // CTRL 8 Selects the Text Tool
                SelectTool(9);
                break;
        }
    }
});

// This function flips the tool bar from the side of the screen that its on to the other
// For example if the tool bar is on the right hand side, it will flip to the other side
// The add page icon will also flip side from left to right so that it won't conflict
// Finally the canvas will shift over slightly so the tool bar doesn't cover it 
// and to utilize the screen resolution
var leftmode = false;
function lefthandedmode() {
    leftmode = !leftmode; // toggle val
    var tool = document.getElementById("sideBar"); // tool bar 
    var exp = document.getElementById("nav-expander"); // expander to unhide tool bar
    var add = document.getElementById("AddPageIcon"); // need to flip the add page icon to the other side
    var rem = document.getElementById("RemovePageIcon");
    var canvas = document.getElementById("myCanvas");

    if (leftmode) {
        tool.style.left = '0em';
        // reset the expander to the left
        exp.style.left = '0em';
        exp.style.right = 'auto';
        // flip add page icon
        add.style.right = '0em';
        add.style.left = 'auto';
        // flip remove page icon
        rem.style.right = '3em';
        rem.style.left = 'auto';
        // Move the canvas over so you can see it
        canvas.style.marginLeft = '135px';
    }
    else {
        tool.style.right = '0em';
        tool.style.left = 'auto';
        // reset the expander to the right
        exp.style.right = '0em';
        exp.style.left = 'auto';
        // flip add page icon
        add.style.left = '0em';
        add.style.right = 'auto';
        // flip remove page icon
        rem.style.left = '3em';
        rem.style.right = 'auto';
        // remove margin left
        canvas.style.marginLeft = 'auto';
    }
}