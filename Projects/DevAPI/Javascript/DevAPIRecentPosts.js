/* Copyright (C) 2021 Joseph Maurer - All Rights Reserved */
let baseURL = "https://dev.to/";
let baseAPIURL = "https://dev.to/api/articles/";
let baselatestAPIURL = "https://dev.to/api/articles/latest";
let defaultNumberOfPosts = 100;

// Grab the URL query: ?PerPage=100&Page=2
const queryString = window.location.search;

// Convert the string into a useable object
const urlParams = new URLSearchParams(queryString);

// Query the Object for any params
const pageCount = urlParams.get('PerPage');
const twitterOnly = urlParams.get('TwitterOnly');

$.getJSON(baselatestAPIURL +"?per_page=" + (pageCount == null ? defaultNumberOfPosts: pageCount), function(json) {
    var display = '';

    for(var index=0; index < json.length; index++) {
        var item = json[index];
        var headerImage = item.cover_image == null ? './img/PlaceHolder.png' : item.cover_image;

        // Concate all of the skills into a single string
        var tags = ``;
        $.each(item.tag_list, function (index, elem) {
            tags += `<span class="concept skill">${elem}</span>`;
        });

        // Does the user have a twiiter handle? If so, disable the twitter share button.
        var twitter_status = item.user.twitter_username == null ? 'disabled' : 'active';

        if(twitterOnly == null || (twitterOnly == "true" && item.user.twitter_username != null)) {
            display += `
            <div class="blogPostCard card text-white bg-dark mb-3" style="min-width: 18rem;">
                <img src="${headerImage}" class="card-img-top rounded" loading="lazy" alt="Cover image" />
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title goldLink">${item.title}</h5>
                    <p class="card-text metadata">
                        <small class="text-muted">
                            <i class="fas fa-user-circle"></i> &nbsp; ${item.user.name} &nbsp;
                            <i class="fas fa-calendar-alt"></i> &nbsp; ${item.readable_publish_date} &nbsp;
                            <i class="fas fa-heart"></i>&nbsp; <a id="postReactions">${item.positive_reactions_count}</a> &nbsp;
                            <i class="fas fa-comment-alt"></i>&nbsp; <a id="postComments">${item.comments_count}</a>
                        </small>
                    </p>
                    <p class="card-text">${item.description}...</p>
                    <div class="project-tools">${tags}</div>
                    </div>
                    <div>
                        <button class="btn btn-primary m-2" ${twitter_status} onclick="window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${item.url}&via=${item.user.twitter_username}', '_blank')">
                            <a id="tweetOutput" style="color:white;">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </button>

                        <button class="btn btn-secondary m-2" onclick="window.open('${item.url}', '_blank')" rel="noopener" target="_blank">
                            <a id="devOutput" style="color:white;">
                                <i class="fab fa-dev"></i>
                            </a>
                        </button>

                        <button class="btn btn-secondary m-2" onclick="window.open('${item.url.replace(baseURL, baseAPIURL)}', '_blank')" rel="noopener" target="_blank">
                            <a id="devOutput" style="color:white;">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </button>
                    </div>
            </div>
            `;
        }
    }

    $('#jsonContent').html(display);
})
.fail(function() { alert("ERROR: Unable to get latest posts"); });