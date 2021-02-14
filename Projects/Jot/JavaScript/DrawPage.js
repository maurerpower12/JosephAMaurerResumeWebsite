
import {SelectTool, Undo, Redo, ClearAll, 
    ChangeFont, BIU, ChangeFontSize,
    ToolColor, LineColor, TextColor,
    ToolOutlineColor, OutlineThickness,
    LineThickness, DeleteSelectedShape,
    ChangeSprayDensity, SetBackgroundSource, DownloadCanvas, UploadCanvas,
    DecodeImageData, SetCanvasDimensions, CanvasContent
} from './Shapes.js';

const LeftHandedSettingName = "LEFT_HANDED_MODE";
var leftmode = false;

$(document).ready(function () {
    const backgroundImageReader = new FileReader();
    const loadNoteReader = new FileReader();

    // Update the left handed mode from local storage.
    leftmode = localStorage.getItem(LeftHandedSettingName) == "true";
    $("#LeftHandMode").attr("checked", leftmode);
    UpdateLeftHandedMode(leftmode);

    // Hide the pop up so that it isn't displays when the page first loads
    $("#TemplateModal").hide(); // hide the template with the modal

    // hide the layers for the tools
    $('#tool-bar-text').hide();
    $('#tool-bar-draw').hide();
    $('#tool-bar-shapes').hide();
    $('#tool-bar-settings').hide();

    // Navigation Menu Slider
    var panels = document.querySelectorAll("#nav-closer");
    for (var i = 0; i < panels.length; i++) {
        panels[i].addEventListener("click", NavCloser);
    }
    function NavCloser(e) {
        e.preventDefault();
        $('#sidePanel').hide();
    }

    $('#nav-close').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('nav-expanded');
        
        $('#tool-bar').hide();
        $('body').toggleClass('nav-expanded');
    });

    // These function show and hide the different settings panels for each option in the tool bar
    $('#btn0').click(function () { // btn 0 maps to cursor settings
        disableMenuItems();
        $('#sidePanel').hide();
        SelectTool(-1);
    });
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
    $('#btn3').click(function () { // btn 3 maps to the eraser settings
        disableMenuItems();
        $('#tool-bar-eraser').show();
        $('#sidePanel').show();
        SelectTool(8);
    });
    $('#btn4').click(function () { // btn 3 maps to the shapes settings
        disableMenuItems();
        $('#tool-bar-shapes').show();
        $('#sidePanel').show();
    });
    $('#btn5').click(function () { // btn 4 maps to the settings
        disableMenuItems();
        $('#tool-bar-settings').show();
        $('#sidePanel').show();
    });
    $('#DebugIcon').click(function () { // btn 4 maps to the settings
        disableMenuItems();

        var stackElement = document.getElementById("stack");
        //var debugHidden = document.getElementById("debug").style.display == 'none';
        stackElement.innerHTML = CanvasContent();
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
        disableTextStyle();
        $(this).toggleClass("active");
        BIU('bold');
    });
    $("#ItalicText").click(function () { 
        disableTextStyle();
        $(this).toggleClass("active");
        BIU('italic');
    });
    $("#SmallCapsText").click(function () { 
        disableTextStyle();
        $(this).toggleClass("active");
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
        console.log("Spray Paint" + this);
        SelectTool(10);
        setSprayToolSettings(true);
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

        SelectTool(6);
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
        DeleteSelectedShape();
    });
    $("#ClearAllIcon").click(function () { 
        var response = confirm("Are you sure you want to reset the note?");
        if (response == true) {
            ClearAll();
        }
    });
    $("#UndoIcon").click(function () { 
        Undo();
    });
    $("#RedoIcon").click(function () { 
        Redo();
    });
    

    $("#DownloadCanvas").click(function () { 
        var type = $("#DownloadType").val();
        var quality = $("#DownloadQuality").val();
        console.log("Downloading As " + type + " with quality " + quality);
        DownloadCanvas(type, quality);
    });

    $("#DownloadSetting").click(function () { 
        $("#DownloadModal").appendTo("body").modal('show');
    });

    // Selects the background image based off the selected image
    $("#WhiteBackground").click(function () {
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#NarrowRuledBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#TodoBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#DotGridBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#GraphBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#EngineeringBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#CalendarWeekBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#MeetingNotesBasicBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#MusicStavesBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#BaseballBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#BasketballBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#FootballBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#SoccerBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#LegalNotesBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#MeetingNotesBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#RuledMarginBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#BlueBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#GreenBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    $("#RedBackground").click(function () { 
        uploadTemplateFile($(this).children('img')[0]);
    });
    function uploadTemplateFile(source) {
        DecodeImageData(source);
    };
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
        LineThickness(event.target.value);

        document.getElementById("penSizeSample").setAttribute('r', event.target.value);
    });

    $("#shapeSize").on("change", function (event) {
        console.log(event.target.value);
        OutlineThickness(this.value);

        document.getElementById("shapeSizeSample").setAttribute('r', event.target.value);
    });

    $("#BackgroundFileInput").on("change", function (event) {
        var file = $(this).prop('files')[0];
        console.log("Uploading file: " + file.name);

        if(CheckFile(file)) {
            backgroundImageReader.readAsDataURL(file);
        }
        else {
            console.error("Invalid File " + file);
        }
    });
    // Called when the upload file loads.
    backgroundImageReader.onload = function () {
        SetBackgroundSource(backgroundImageReader.result);
    };

    $("#UploadFileInput").on("change", function (event) {
        var file = $(this).prop('files')[0];
        console.log("Loading file: " + file.name);
        loadNoteReader.readAsText(file);
    });
    // Called when the upload file loads.
    loadNoteReader.onload = function () {
        UploadCanvas(loadNoteReader.result);
    };

    $("#LeftHandMode").on("change", function (event) {
        LeftHandedMode();
    });

    $("#FontSize").on("change", function (event) {
        console.log("Changing Font Size to: " + this.value);
        ChangeFontSize(this.value);
    });

    $("#Font").on("change", function (event) {
        console.log("Changing Font to: " + this.value);
        ChangeFont(this.value);
    });

    $("#SprayDensity").on("change", function (event) {
        console.log("Changing Density to: " + this.value);
        ChangeSprayDensity(this.value);
    });

    $("#CanvasWidth").on("change", function (event) {
        console.log("Changing CanvasWidth to: " + this.value);
        SetCanvasDimensions(this.value, $("#CanvasHeight").val());
    });
    $("#CanvasHeight").on("change", function (event) {
        console.log("Changing CanvasHeight to: " + this.value);
        SetCanvasDimensions($("#CanvasWidth").val(), this.value);
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

        setSprayToolSettings(false);
    };

    // Disable all text style Buttons
    function disableTextStyle() {
        // Do nothing since all text styles can be applied at the same time.
        // $("#TextStyles button").each(function(){
        //    $( this ).addClass("disabled");
        // })
    };

    // Show any settings for the spray tool
    function setSprayToolSettings(visible) {
        if (visible) {
            $('#SprayDensityContainer').css("visibility", "visible");
            $('#DrawToolSizeContainer').height("0px");
            $('#DrawToolSizeContainer').css("visibility", "hidden");
        }
        else {
            $('#SprayDensityContainer').css("visibility", "hidden");
            $('#DrawToolSizeContainer').css("visibility", "visible");
            $('#DrawToolSizeContainer').height("auto");
        }
    }
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
                Undo();
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

/**
 * This function flips the tool bar from the side of the screen that its on to the other
 * For example if the tool bar is on the right hand side, it will flip to the other side
 * The add page icon will also flip side from left to right so that it won't conflict
 * Finally the canvas will shift over slightly so the tool bar doesn't cover it 
 * and to utilize the screen resolution
 * @lefthandedmode
 */
function LeftHandedMode() {
    leftmode = leftmode == true ? false : true; // toggle val
    localStorage.setItem(LeftHandedSettingName, leftmode);
    UpdateLeftHandedMode(leftmode);
}

function UpdateLeftHandedMode(mode) {
    var sidePanel = document.getElementById("sidePanel");
    var quickTools = document.getElementById("QuickActions");
    var canvas = document.getElementById("myCanvas");

    if (mode == true) {
        // Move the side Panel
        sidePanel.classList.remove('right-sidePanel');
        sidePanel.classList.add('left-sidePanel');

        // Move the tools in the lower corner
        quickTools.classList.add('right-QuickActions');
        quickTools.classList.remove('left-QuickActions');

        // Move the canvas over so you can see it
        canvas.style.marginLeft = '195px';
    }
    else {
        // Move the side Panel
        sidePanel.classList.remove('left-sidePanel');
        sidePanel.classList.add('right-sidePanel');

        // Move the tools in the lower corner
        quickTools.classList.add('left-QuickActions');
        quickTools.classList.remove('right-QuickActions');

        // remove margin left
        canvas.style.marginLeft = 'auto';
    }
}

/**
 * Validates that a file is the correct type and size for upload.
 * @CheckFile
 */
function CheckFile(file) {
    var sFileName = file.name;
    var validFileExtensions = [".jpg", ".jpeg", ".gif", ".png"];
    var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
    var iFileSize = file.size;
    var iConvert = (file.size / 1048576).toFixed(2); // round it off to only 2 decimal points
    console.log("Uploaded file size: " + iFileSize);
    if (!(sFileExtension === "jpg" ||
            sFileExtension === "jpeg" ||
            sFileExtension === "png")) {
        txt = "File type : " + sFileExtension + "\n\n";
        txt += "Size: " + iConvert + " MB \n\n";
        txt += "Please make sure your file is in jpg, or png format.\n\n";
        alert(txt);
        return false;
    }
    return true;

}