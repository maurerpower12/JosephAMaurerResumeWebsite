/* Copyright (C) 2021 Joseph Maurer - All Rights Reserved */

$(function () {
    var mediumPromise = new Promise(function (resolve) {
    var $content = $('#jsonContent');
    var data = {
        rss: 'https://medium.com/feed/@josephamaurer'
    };
    $.get(' https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40josephamaurer', data, function (response) {
        if (response.status == 'ok') {
            var display = '';
            $.each(response.items, function (k, item) {
                display += `<div class="card mb-3 mx-auto mr-5 " id="mediumPost" style="width: 20rem;">`;
                var src = item["thumbnail"]; // use thumbnail url
                display += `<img src="${src}" class="card-img-top rounded" alt="Cover image">`;
                display += `<div class="card-body">`;
                display += `<h5 class="card-title">${item.title}</h5>`;
                var description = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
                description = description.replace('h4', 'p style="display: none;"');
                description = description.replace('h3', 'p style="display: none;"');
                //trim the string to the maximum length (260)
                var trimmedString = description.substr(0, 260);
                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                // remove the time from the date and break into parts
                var parts = item.pubDate.split(' ')[0].split('-');
                // Please pay attention to the month (parts[1]); JavaScript counts months from 0: January - 0, February - 1, etc.
                var pubDate = new Date(parts[0], parts[1] - 1, parts[2]);
                display += `<p class="card-text metadata"><small class="text-muted"><i class="fas fa-user-circle"></i> &nbsp; ${item.author} &nbsp;`;
                display += `<i class="fas fa-calendar-alt"></i> &nbsp; ${pubDate.toLocaleDateString("en-US", options)}</small></p>`;

                display += `<p class="card-text">${trimmedString}...</p>`;

                display+= `<div class="project-tools">`;
                $.each(item.categories, function (k, item) {
                    display += `<span class="concept skill">${item}</span>`;
                });
                display+= `</div>`;

                display += `<div class="card-footer"><a href="${item.link}" target="_blank" class="d-flex justify-content-end" >Read More<i class="fas fa-angle-double-right"></i></a></div>`;
                display += '</div></div>';
                return k < 10;
            });

            display += `
            <div class="card mb-3 mx-auto mr-5 profile-card-1" id="mediumPost" style="width: 20rem;">
              <div class="card-body" style="padding-top: 25%;">
                <div class="profile-thumb-block"><img src="${response.feed["image"]}" class="rounded-circle mx-auto d-block rounded">More ${response.feed.description}</div>
                <div class="card-text m-4">
                    <a class="btn btn-dark btn-lg" href="https://medium.com/@josephamaurer" target="_blank" role="button">View all
                    posts</a>
                </div>
              </div>
            </div>`;

            resolve($content.html(display));
        }
    });
    });

mediumPromise.then(function() {
        //Pagination
        pageSize = 4;

        var pageCount = $("#mediumPost").length / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li> `);
        }
        $("#pagin li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $("#mediumPost").hide();
            $("#mediumPost").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin li").click(function () {
            $("#pagin li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
});