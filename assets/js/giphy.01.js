//Giphy App

$(document).ready ( ()=> {

    $("#addGiphy").on("click", (event) => {
        event.preventDefault();
        var search = $("#giphyInput").val().trim();
        console.log(search);

        //create new button upon adding new search
        var newButton = $("<button>").text(search).attr("class", "newBtn btn btn-secondary");

        newButton.attr("value", search);
        newButton.attr("type", "submit");

        $("#button-added").append(newButton);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=LQZSsWQiwn6cINtqyMiTrU1Pu6Ecbu96&limit=10";

        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then ((response) => {
            console.log(response);

            //Run loop through the data set retrived via AJAX
            response.data.forEach(data => {
                console.log(data);

                var newDiv = $("<div>")
                newDiv.attr("value", rating);
                newDiv.attr("class", "col-lg-4");

                //Render rating for each gif
                var rating = data.rating;

                var displayRating = $("<h3>").text("Rating: " + rating);

                //Render each gif
                var imageURL = data.images.original.url;

                var resultImage = $("<img>");

                resultImage.attr("src", imageURL);
                resultImage.attr("alt", search);

                //Append results 
                $("#results").append(newDiv);
                newDiv.append( displayRating, resultImage );

            });
        });

    });

});


