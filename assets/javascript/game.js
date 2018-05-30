var topics = ["video games"];

$("#add-topic").on("click", function(event) {
    event.preventDefault();

    var searchInput = $("#searchInput").val().trim();

    topics.push(searchInput);

    renderButtons();
});

function renderButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");

        b.addClass("btn btn-dark gifButton");

        b.attr("data-name", topics[i]);

        b.text(topics[i]);

        $("#buttons").append(b);
    }
}

$(document).on("click",".gifButton", function() {

    $("#gifs").empty();
    
    var topic = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=Roz7LEgg4ly7TxbnHUUg2N4o8aiL1QrH&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $("<div class='items'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var image = $("<img>").attr("src",results[i].images.fixed_height_still.url).attr("still",results[i].images.fixed_height_still.url).attr("class","gif-image").attr("data-state","still").attr("animated",results[i].images.fixed_height.url);

            gifDiv.append(image);
            gifDiv.append(p);

            $("#gifs").prepend(gifDiv);
        }
    })
});

$(document).on("click",".gif-image", function() {
    
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("animated"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("still"));
      $(this).attr("data-state", "still");
    }
  });

  renderButtons();