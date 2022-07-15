/* Copyright (C) 2021 Joseph Maurer - All Rights Reserved */

const maxDescriptionLength = 160;
const cardsPerRow = 2;
const maxNumberOfRowsVisible = 2;
const maxNumberOfRecentPosts = 2;
var cached_Response;
const searchBar = $('#search');
const searchBox = $('#searchBox');
const content = $('#jsonContent');
const recentContent = $('#jsonContentRecent');
// Archive vars
const archivesDropdown = $('#archives-dropdown');
const defaultArchiveOption = "Select Month";
var archiveArray = [defaultArchiveOption];
const archiveDateFormat = { month: 'long', year: 'numeric'};

$(function () {
    $.getJSON("./API/MediumContent.json", function(json) {
        ProcessResponse(json, "");
    });
});

// This is called when a user selects 'Read More' at the bottom of the card.
function reply_click(clicked_id) {
    for(var index=0; index < cached_Response.items.length; index++) {
        var item = cached_Response.items[index];
        if (item.guid == clicked_id) {
            //PopulateModal(item); For now, no modal; just open link. Will be implemented in React conversion.
            window.open(item.link, "_blank", "noopener,noreferrer");
        }
    }
    // Return false to stop default propagation.
    return false;
}

// Populates the data from the link into the modal.
function PopulateModal(item) {
    var modal = $("#postModal");
    if (modal.length) {
        $("#postModal .modal-title").html(item.title);
        $("#postModal .modal-body").html(item.description);
        $("#modal-title-header").attr("href", item.link);

        $(".modal-sub-header #author").html(item.author);
        $(".modal-sub-header #pubDate").html(FormatPublishDate(item));
        $(".modal-sub-header #tags").html(item.categories.join(", "));

        $('.twitter-share-button-link').attr('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${item.link}&via=maurerpwer`);
        $('.fb-share-button-link').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${item.link};src=sdkpreparse`);
        $('.linkedin-share-button-link').attr('href', `https://www.linkedin.com/shareArticle?url=${item.link}`);
        $('.email-share-button-link').attr('href', `mailto:user@example.com?subject=${encodeURIComponent(item.title)}%20by%20${item.author}&body=Check%20out%20this%20cool%20article%20on%20Medium:%20${item.link}%20`);
        $('.link-share-button-link').attr('href', item.link);

        modal.modal('show');
    }
    else {
        window.open(item.link, "_blank");
    }
}

// Constuct the published date in a more readable format
function FormatPublishDate(item, format = { year: 'numeric', month: 'long', day: 'numeric' }) {
    // remove the time from the date and break into parts
    var parts = item.pubDate.split(' ')[0].split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0: January - 0, February - 1, etc.
    pubDate = new Date(parts[0], parts[1] - 1, parts[2]);
    return pubDate.toLocaleDateString("en-US", format)
}

// Populates the archive array with the applicable data
function PopulateArchives(item) {
    var archiveEntry = FormatPublishDate(item, archiveDateFormat)
    if(archiveArray.indexOf(archiveEntry) === -1) {
        archiveArray.push(archiveEntry);
    }
}

// Sets the passed html into the proper div
function SetContent(contentToSet) {
    if(content.length) {
        content.html(contentToSet);
    }
    else if(recentContent.length){
        recentContent.html(contentToSet);
    }
    else {
        console.error("Unable to find a proper div to put content in.");
    }
}

// Sets the search alert text
function SetAlert(alertText, numberOfResults) {
    $('#searchResults').html(
        `<div class="bd-callout bd-callout-${numberOfResults == 0 ? "danger" : "info"}">
            <h4 id="specific-markup-required-for-dismiss-on-next-click">Search Results</h4>
            <p>${alertText}</p>
        </div>
        `
    );
}

// Clears the text out of the alert and leaves it empty
function ClearAlert() {
    $('#searchResults').html(``);
}

// Processes a response from an rss feed into readable html
function ProcessResponse(response, searchQuery, archiveQuery = "") {
    if (response.status == 'ok') {
        SetContent(""); // Clear out any html that was sitting in the div
        ClearAlert();

        cached_Response = response;
        var foundCount = 0;
        var display = '';
        var postLength = (content.length) ? response.items.length : maxNumberOfRecentPosts;

        for(var index=0; index < postLength; index++) {
            var item = response.items[index];
            // 1. Constuct the description text to be shorter and not have any images
            var textDescription = "";
            var htmlDescriptionObject = $($.parseHTML(item.description));
            for(var i = 0; i < htmlDescriptionObject.length; i++) {
                var descriptionElement = htmlDescriptionObject[i];
                if(descriptionElement.nodeName == "P") {
                    textDescription += descriptionElement.innerText;
                }
              }
            //trim the string to the maximum length (ie. 160 chars)
            textDescription = textDescription.substr(0, maxDescriptionLength);
            PopulateArchives(item);

            // 3. Format all of the tags
            var tools = ``;
            $.each(item.categories, function (k, item) {
                tools += `<span class="concept skill">${item}</span>`;
            });

            if (searchQuery == "" || item.title.includes(searchQuery) || item.description.includes(searchQuery)) {
                    if (archiveQuery == "" || FormatPublishDate(item, archiveDateFormat) == archiveQuery) {
                        display += `<div class="col">
                        <div class="blogPostCard card h-100 text-white bg-dark mb-3 mx-auto" style="min-width: 18rem;" id="${item.guid}" onClick="reply_click(this.id)" rel="noopener">
                            <img src="${item.thumbnail}" class="card-img-top rounded" loading="lazy" alt="${item.title} Cover image" />
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title goldLink">${item.title}</h5>
                                <p class="card-text metadata">
                                    <small class="text-muted">
                                        <i class="fas fa-user-circle"></i> &nbsp; ${item.author} &nbsp;
                                        <i class="fas fa-calendar-alt"></i> &nbsp; ${FormatPublishDate(item)}
                                    </small>
                                </p>
                                <p class="card-text">${textDescription}...</p>
                                <div class="project-tools">${tools}</div>
                                </div>
                        </div></div>
                        `;
                    foundCount++;
                    }
            }
        };

        if(searchQuery != "" && foundCount == 0) {
            SetAlert(`Unable to find any Search Results for query: '${searchQuery}'`, foundCount);
        }
        else if(searchQuery != ""){
            SetAlert(`Showing ${foundCount} Search Results for query: '${searchQuery}'`, foundCount);
        }

        if(archiveQuery != "") {
            SetAlert(`Showing ${foundCount} Archive Results for month: ${archiveQuery}`, foundCount);
        }

        SetContent(display);

        if(archivesDropdown.length) {
            archivesDropdown.empty();
            $.each(archiveArray, function(i, p) {
                archivesDropdown.append($('<option></option>').val(p).html(p));
            });
        }
    }
}

// Processes the search field input
searchBar.on("keyup", event => {
    ProcessResponse(cached_Response, encodeURIComponent(event.target.value.toLowerCase()));
});

// Prevent the space bar in the search field
searchBar.on('keypress', function ( event ) {
     if(event.keyCode === 32) {
       event.preventDefault();
     }
});

// Processes the archive dropdown change
archivesDropdown.on("change", event => {
    searchBox.val('');
    ProcessResponse(cached_Response, "", event.target.value);
});