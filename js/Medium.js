/* Copyright (C) 2021 Joseph Maurer - All Rights Reserved */

const maxDescriptionLength = 160;
const cardsPerRow = 2;
const maxNumberOfRowsVisible = 2;
const maxNumberOfRecentPosts = 2;

$(function () {
    var mediumPromise = new Promise(function (resolve) {
        var $content = $('#jsonContent');
        var $recentContent = $('#jsonContentRecent');
        var data = {
            rss: 'https://medium.com/feed/@josephamaurer'
        };
        $.get(' https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40josephamaurer', data, function (response) {
        if (response.status == 'ok') {
                var display = '';
                var postLength = ($content.length) ? response.items.length : maxNumberOfRecentPosts;

                for(var index=0; index < postLength; index++) {
                    var item = response.items[index];
                    var isFirstItemInRow = (index % cardsPerRow == 0);
                    var isLastItemInRow = (index % cardsPerRow == cardsPerRow-1) || (index == response.items.length-1);
                    // 1. Constuct the description text to be shorter and not have any images
                    var textDescription = "";
                    var htmlDescriptionObject = $($.parseHTML(item.description));
                    for(var i = 0; i < htmlDescriptionObject.length; i++) {
                        var descriptionElement = htmlDescriptionObject[i];
                        if(descriptionElement.nodeName == "P") {
                            console.log("trim " + descriptionElement.innerText);
                            textDescription += descriptionElement.innerText;
                        }
                      }
                    //trim the string to the maximum length (ie. 160 chars)
                    textDescription = textDescription.substr(0, maxDescriptionLength);

                    // 2. Constuct the published date in a more readable format
                    var options = { year: 'numeric', month: 'long', day: 'numeric' };
                    // remove the time from the date and break into parts
                    var parts = item.pubDate.split(' ')[0].split('-');
                    // Please pay attention to the month (parts[1]); JavaScript counts months from 0: January - 0, February - 1, etc.
                    var pubDate = new Date(parts[0], parts[1] - 1, parts[2]);

                    // 3. Format all of the tags
                    var tools = ``;
                    $.each(item.categories, function (k, item) {
                        tools += `<span class="concept skill">${item}</span>`;
                    });

                    if(isFirstItemInRow) {
                        display += `<div class="row card-deck container-fluid justify-content-center" id="mediumRow">`;
                    }

                    console.log("description " + textDescription);
                    display += `
                <div class="card mb-3 col-lg-6" id="mediumPost">
                    <div class="row justify-content-center h-100">
                        <div class="col-xs-4">
                            <img src="${item.thumbnail}" width="100%" class="card-header-img rounded"
                                alt="${item.title} Cover image" />
                        </div>
                        <div class="col-xs-8">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text metadata">
                                    <small class="text-muted">
                                        <i class="fas fa-user-circle"></i> &nbsp; ${item.author} &nbsp;
                                        <i class="fas fa-calendar-alt"></i> &nbsp; ${pubDate.toLocaleDateString("en-US", options)}
                                    </small>
                                </p>
                                <p class="card-text">${textDescription}...</p>
                                <div class="project-tools">${tools}</div>
                                <div class="card-footer">
                                    <a href="${item.link}" class="d-flex justify-content-end" target="_blank">
                                      <p>Read more <i class="fas fa-angle-double-right"></i></p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;


                    if(isLastItemInRow) {
                        display += `</div>`;
                        console.log("clsoing div after " + index + " " + item.title);
                    }
                };

                if($content.length) {
                    resolve($content.html(display));
                }
                else {
                    resolve($recentContent.html(display));
                }
            }
        });
    });

    mediumPromise.then(function () {
        // for right now, we aren't messing wiht Pagination. Use different div types instead.
    });
});

// var data = {
//     rss: 'https://medium.com/feed/@victorscholz'
// };
// $.get(' https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40victorscholz', data, function (response) {
