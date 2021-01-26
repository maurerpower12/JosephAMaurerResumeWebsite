/* Copyright (C) 2021 Joseph Maurer - All Rights Reserved */

const maxDescriptionLength = 260;
const cardsPerRow = 2;
const maxNumberOfRowsVisible = 2;

$(function () {
    var mediumPromise = new Promise(function (resolve) {
        var $content = $('#jsonContent');
        var data = {
            rss: 'https://medium.com/feed/@josephamaurer'
        };
        $.get(' https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40josephamaurer', data, function (response) {
            if (response.status == 'ok') {
                var display = '';

                for(var index=0; index < response.items.length; index++) {
                    var item = response.items[index];
                    var isFirstItemInRow = (index % cardsPerRow == 0);
                    var isLastItemInRow = (index % cardsPerRow == cardsPerRow-1) || (index == response.items.length-1);
                    // 1. Constuct the description text to be shorter and not have any images
                    var description = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
                    description = description.replace('h4', 'p style="display: none;"');
                    description = description.replace('h3', 'p style="display: none;"');
                    //trim the string to the maximum length (260)
                    var trimmedString = description.substr(0, maxDescriptionLength);
                    //re-trim if we are in the middle of a word
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

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
                    display += `
                <div class="card mb-3 col-lg-6" id="mediumPost">
                    <div class="row justify-content-center h-100">
                        <div class="col-xs-4">
                            <img src="${item.thumbnail}" width="100%" class="card-header-img rounded"
                            alt="${item.title} Cover image">
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
                                <p class="card-text">${trimmedString}...</p>
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

                resolve($content.html(display));
            }
        });
    });

    mediumPromise.then(function () {
        showRow = function (showAll) {
            var rows = $('div[id^="mediumRow"]');
             for(var index=0; index < rows.length; index++) {
                row = rows[index];
                if(showAll) {
                    $(this).show();
                }
                else {
                    if(index < maxNumberOfRowsVisible) {
                        $(this).show();
                    }
                    else {
                        $(this).hide();
                    }
                }
            };
        }

        //Pagination
        var rows = $('div[id^="mediumRow"]');
        console.log("Row Count " + rows.length);

        if(rows.length > maxNumberOfRowsVisible) {
            $("#medium").append(`<a class="btn btn-dark d-flex page-link justify-content-end" role="button" href="#" id="ViewAllMediumPosts">View all posts</a>`);

            showRow(false);
        }


        $("#ViewAllMediumPosts").click(function () {
            console.log("View All Posts");
            showRow(false);
            return false;
        });
    });
});

// var data = {
//     rss: 'https://medium.com/feed/@victorscholz'
// };
// $.get(' https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40victorscholz', data, function (response) {