//******************************************************************************************************
//
// Name:        Joe Maurer
// Email:       Joseph.Maurer2@oit.edu
// Class:       Junior Project
// Project:     Jot by Verge
// Date:        May 3, 2016
// Description: 
//          This file is called from DrawPage.aspx and Login.aspx
//          This file implements the following features:
//          handleClientLoad calls checkAuth and fails if it does not repsond in 1 minute.
//
//          checkAuth looks at the client ID and scope and makes sure they match with the 
//              Google Console API
//
//          handleAuthResult attempts to valiate the user and if they have set the valid 
//              permissions to save a file to their google drive.
//
//          newUploadFile creates the new file to upload by setting a fake canvas and saving 
//              the value from the current one to it.
//
//          newInsertFile inserts the newly created file into the users google drive. 
//******************************************************************************************************

var CLIENT_ID = '868362846067-t126rdhno9rbpvg5s5tqvgs1rdrkrjpo.apps.googleusercontent.com';
var SCOPES = 'https://www.googleapis.com/auth/drive';

function handleClientLoad() {
    //Called when the client library is loaded to start the auth flow.
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    //Check if the current user has authorized the application.
    gapi.auth.authorize(
    { 'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true },
    handleAuthResult);
}
function handleAuthResult(authResult) {
    //Called when authorization server replies.
    var authButton = document.getElementById('authorizeButton');
    var authTitle = document.getElementById('G_title');
    authButton.style.display = 'block';
    console.log("Attempting to Authenticate User with Google.");
    if (authResult && !authResult.error) {
        // Access token has been successfully retrieved, requests can be sent to the API.
        authButton.onclick = newUploadFile;

    } else {
        //if (m_is_google_user) {
            // No access token could be retrieved
            authButton.style.display = 'block';
            authTitle.style.display = 'block';
            console.log("Authentication Failed.");
            // Since the user fail to have the correct authorization level, 
            // Wait until they do
            authButton.onclick = function () {
                gapi.auth.authorize(
                { 'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false },
                handleAuthResult);
            };
        //}
        //else { // else they never signed in with a google account
        //    authButton.style.display = 'none';
        //    console.log("Authentication Failed. Not a Google user. ");
        //}
    }
}
function newUploadFile(evt) {
    // Get the nessesary info to save the file to google drive
    gapi.client.load('drive', 'v2', function () {
        // Get the canvas data
        var canvas = document.getElementById("myCanvas");

        destinationCanvas = document.createElement("canvas");
        destinationCanvas.width = canvas.width;
        destinationCanvas.height = canvas.height;
        destinationcontext = destinationCanvas.getContext('2d');

        var pageHeight = (canvas.height / jotCanvas.pages);
        for (var i = 0; i < jotCanvas.pages; i++) { // redraw the background
            var y1 = i * (canvas.height / jotCanvas.pages)

            destinationcontext.drawImage(m_background, 0, y1, canvas.width, pageHeight);
        }
        for (var i = 0; i < jotCanvas.marks.length; i++) { //Draws each mark on canvas
            jotCanvas.marks[i].Draw(destinationcontext);
        }

        // Get the name to save it as
        var fileTitle = document.title + '.jpg';
        // type of file i.e. jpeg, pdf, etc
        var mimeType = 'image/jpeg';
        // package up the meta data to store
        var metadata = {
            'title': fileTitle,
            'mimeType': mimeType
        };
        // make the encoded data into the correct formatt
        var pattern = 'data:' + mimeType + ';base64,';
        var base64Data = destinationCanvas.toDataURL('image/jpeg', 0.5);
        // get rid of the meta data associated with the Base64 encoded string
        base64Data = base64Data.replace(pattern, '');
        // Insert the new file into google drive
        newInsertFile(base64Data, metadata);
    });
}
function newInsertFile(base64Data, metadata, callback) {
    // Embed the data into the request
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var contentType = metadata.mimeType || 'application/octet-stream';
    var multipartRequestBody =
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: ' + contentType + '\r\n' +
    'Content-Transfer-Encoding: base64\r\n' +
    '\r\n' +
    base64Data +
    close_delim;
    // make the request
    var request = gapi.client.request({
        'path': '/upload/drive/v2/files',
        'method': 'POST',
        'params': {
            'uploadType': 'multipart'
        },
        'headers': {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody
    });
    if (!callback) {
        callback = function (file) {
            document.getElementById("success-alert").innerHTML = "<strong>Note Saved to google drive</strong>";
            ShowAlert();
        };
    }
    // make the API request
    request.execute(callback);
}
