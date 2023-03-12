// API key for the YouTube Data API v3
var apiKey = 'AIzaSyDWcU3xdBClhDcw1BHesV_ncasEFhihUqU';

// Load the API client and authenticate with your API key
gapi.load('client', function() {
  gapi.client.setApiKey(apiKey);
  gapi.client.load('youtube', 'v3', function() {
    console.log('YouTube API client loaded');
  });
});

// Search for videos based on the user's query
function search() {
  // Get the search query from the user
  var query = document.getElementById('query').value;

  // Build the API request
  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    q: query,
    type: 'video'
  });

  // Send the API request and handle the response
  request.execute(function(response) {
    var results = response.items;

    // Create a new list element for each video result
    var list = document.createElement('ul');
    for (var i = 0; i < results.length; i++) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = 'https://www.youtube.com/watch?v=' + results[i].id.videoId;
      link.target = '_blank';
      link.innerHTML = results[i].snippet.title;
      item.appendChild(link);
      list.appendChild(item);
    }

    // Display the search results on the page
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(list);
  });
}

// Attach the search function to the search button
document.getElementById('search-button').addEventListener('click', search);
