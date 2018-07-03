//Giphy App


//Retrieve savedSearch from localStorage
if (localStorage.getItem("savedSearch") === null) {
    var animals = ["dog", "cat", "mouse"];
} else {
    var animals = JSON.parse(localStorage.getItem("savedSearch"));
}


//capture animal name from data-attribute and display gifs
function savedSearch() {
    
    var searchedAnimal = $(this).attr("data-name");

    console.log(searchedAnimal);
    // URL to search Giphy
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchedAnimal + "&api_key=LQZSsWQiwn6cINtqyMiTrU1Pu6Ecbu96&limit=10";

    // AJAX GET request
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then ((response) => {
        console.log(response);
        //Run loop through the data set retrived via AJAX
        response.data.forEach(data => {

            //Render rating for each gif
            var rating = data.rating;
            var alt = data.title;

            var displayRating = $("<h3>").text("Rating: " + rating);

            var newDiv = $("<div>")
            newDiv.attr("value", rating);
            newDiv.attr("class", "grid-item");

            //Render each gif
            var animateURL = data.images.original.url;
            var stillURL = data.images.downsized_still.url;

            var resultImage = $("<img>");

            resultImage.attr("src", stillURL);
            resultImage.attr("data-still", stillURL);
            resultImage.attr("data-animate", animateURL);
            resultImage.attr("data-state", "still");
            resultImage.addClass("gif");
            resultImage.attr("id", "result");
            resultImage.attr("alt", alt);

            //Append results 
            $("#results").append(newDiv);
            newDiv.append( displayRating, resultImage );
            //initialize masonry
            $('.grid').masonry({
                itemSelector: '.grid-item',
                columnWidth: 200
              });

        });
    });
}

function renderButtons() {
    $("#button-added").empty();
    animals.forEach(animal => {
        var a = $("<button>");
        a.addClass("animal btn btn-dark");
        a.attr("data-name", animal);
        a.text(animal);
        $("#button-added").append(a);
    })
}

$("#addGiphy").on("click", (event) => {
    event.preventDefault();
    var search = $("#giphyInput").val().trim();
    animals.forEach(animal => {
        if (search === animal) {
            //Validate if animal inputted already exist in saved search, to avoid duplicates in the saved search
            alert(search + " already exist in the saved search! Please add another animal.");
        }
    })
    if ( search == '' ) {
        //Validate if input is empty, otherwise it will return endless AJAX
        alert("Please type in an animal!");
    } else {
        animals.push(search);
        console.log(animals);
        //Store savedSearch on local storage
        localStorage.setItem("savedSearch", JSON.stringify(animals));

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=LQZSsWQiwn6cINtqyMiTrU1Pu6Ecbu96&limit=10";

        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then ((response) => {

            //Run loop through the data set retrived via AJAX
            response.data.forEach(data => {

                //Render each gif
                var rating = data.rating;
                var alt = data.title;

                var displayRating = $("<h3>").text("Rating: " + rating);
                var newDiv = $("<div>")
                newDiv.attr("value", rating);
                newDiv.attr("class", "grid-item");

                var animateURL = data.images.original.url;
                var stillURL = data.images.downsized_still.url;

                var resultImage = $("<img>");

                resultImage.attr("src", stillURL);
                resultImage.attr("data-still", stillURL);
                resultImage.attr("data-animate", animateURL);
                resultImage.attr("data-state", "still");
                resultImage.addClass("gif");
                resultImage.attr("alt", alt);

                //Append results 
                $("#results").append(newDiv);
                newDiv.append( displayRating, resultImage );

            });
        });

        //Render Buttons after added search
        renderButtons();
        $("#giphyInput").val('');

        //initialize masonry
        $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: 200
          });

    }
    
});

//Function for displaying saved search

$(document).on("click", ".animal", savedSearch);
//Render Buttons based on animals array on load
renderButtons();

//Toggle between still and animate state of gif
function playGif() {
    console.log(this);
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

$(document).on("click", ".gif", playGif);




