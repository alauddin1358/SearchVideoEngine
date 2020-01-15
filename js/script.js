$(function(){
    var searchField = $('#query');
    var icon = $('#search-btn');

    //Focus Handler 
    $(searchField).on('focus', function() {
        $(this).animate({
            width:'100%'
        },400);
        $(icon).animate({
            right:'10px'
        },400);
    });

    //Blur Event Handler
    $(searchField).on('blur', function() {
        if(searchField.val() == '') {
            $(searchField).animate({
                width:'45%'
            },400, function() {});

            $(icon).animate({
                right:'360px'
            },400, function() {});
        }
    });
    $('#search-form').submit(function(e){
        e.preventDefault();
    });
});

function search() {

    $('#results').html('');
    $('#buttons').html('');

    q = $('#query').val();
    console.log(q);

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part:'snippet, id',
            q : q,
            type: 'video',
            key: 'AIzaSyCE50Trcgz8TlFyODqOQnD83mSDJs-tjPg' },
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                $.each(data.items, function(i, item) {
                    // Get Output
                    var output = getOutput(item);

                    //Display Results
                    $('#results').append(output);
                });
                var buttons = getButtons(prevPageToken, nextPageToken);
                $('#buttons').append(buttons);
            }

    );
}
//Next Page Search
function nextPage() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');

    //Clear results
    $('#results').html('');
    $('#buttons').html('');

    //Get Search results
    q = $('#query').val();
    console.log(q);

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part:'snippet, id',
            q : q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyCE50Trcgz8TlFyODqOQnD83mSDJs-tjPg' },
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                $.each(data.items, function(i, item) {
                    // Get Output
                    var output = getOutput(item);

                    //Display Results
                    $('#results').append(output);
                });
                var buttons = getButtons(prevPageToken, nextPageToken);
                $('#buttons').append(buttons);
            }

    );
}

//Prev Page Search
function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');

    //Clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //Get Search results
    q = $('#query').val();
    console.log(q);

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part:'snippet, id',
            q : q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyCE50Trcgz8TlFyODqOQnD83mSDJs-tjPg' },
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                $.each(data.items, function(i, item) {
                    // Get Output
                    var output = getOutput(item);

                    //Display Results
                    $('#results').append(output);
                });
                var buttons = getButtons(prevPageToken, nextPageToken);
                $('#buttons').append(buttons);
            }

    );
}

//Build Results
function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    var output = '<li>' + 
     '<div class = "list-left">' +
     '<img src = "'+thumb+'">' +
     '</div>' +
     '<div class = "list-right">' +
     '<h3><a data-fancybox href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
      '<small>By <span class="cTitle">'+channelTitle+ '</span> on '+videoDate+' </small>'+
      '<p>'+description+'</p>' +
      '</div>' +
      '</li>' +
      '<div class = "clearfix"></div>' +
      '';
      return output;

}
//Build the buttons
function getButtons(prevPageToken, nextPageToken) {
    if(!prevPageToken) {
        var btnOutput = '<div class="button-container">'+
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" '+
        'onclick="nextPage();"> Next Page </button> </div>';
    }
    else {
        var btnOutput = '<div class="button-container">'+' <button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" '+
        'onclick="prevPage();"> Prev Page </button> '+
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" '+
        'onclick="nextPage();"> Next Page </button> </div>';
    }
    return btnOutput;
}