/* Copyright (C) 2021 Joseph Maurer - All Rights Reserved */

// Script that does the parsing
let baseURL = "https://dev.to/";
let baseAPIURL = "https://dev.to/api/articles/";

// Called after the user hits the 'convert' button.
$('#convert').click(function () {
  ProcessURL();
});

// Process Enter Key Press
$('#inputTweet').on('keypress', function ( event ) {
  if(event.keyCode === 13) { // Enter Key
    ProcessURL();
  }
});

// Processes the url in the text area and populates the dynamic content
function ProcessURL() {
  var text = $('#inputTweet').val();
  if(text.length > 0) {
    if(text.startsWith(baseURL)) {
      $.getJSON(text.replace(baseURL, baseAPIURL), function (json) {
        if(json.type_of == "article") {
          $('#tweetOutput').attr('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(json.title)}&url=${json.url}&via=${json.user.twitter_username}`);
          $('#devOutput').attr('href', json.url);
          $('#tweetOutputButton').removeAttr('disabled');
          $('#devOutputButton').removeAttr('disabled');

          // Populate the post
          $('#postTitle').html(json.title);
          $('#postHeaderImage').attr("src",json.social_image);
          $('#postAuthor').html(json.user.username);
          $('#postDate').html(json.readable_publish_date);
          $('#postReactions').html(json.positive_reactions_count);
          $('#postComments').html(json.comments_count);
          $('#postDescription').html(json.description);

          var tags = ``;
          $.each(json.tags, function (k, item) {
              tags += `<span class="concept skill">${item}</span>`;
          });
          $('#postTags').html(tags);
        }
        else {
          alert("🚨 Not a link to a article");
        }

        // Update the JSON view
        $('#json-renderer').jsonViewer(json, {collapsed: true, withQuotes: false, withLinks: true});
      })
      .fail(function() { alert("ERROR: Unable to find this post 😭"); })
    }
    else {
      alert("Converting URLs only works on URLs that start with: " + baseURL);
    }
  }
  else {
    alert("No URL was entered 😖");
  }
}