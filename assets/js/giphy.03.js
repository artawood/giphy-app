//Giphy App



    var animals = ["dog", "cat", "mouse"];

    //capture animal name from data-attribute and display gifs
    function savedSearch() {
        // In this case, the "this" keyword refers to the button that was clicked
        var searchedAnimal = $(this).attr("data-name");

        console.log(searchedAnimal);
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchedAnimal + "&api_key=LQZSsWQiwn6cINtqyMiTrU1Pu6Ecbu96&limit=10";
  
        // Performing our AJAX GET request
        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then ((response) => {
            console.log(response);
            //Run loop through the data set retrived via AJAX
            response.data.forEach(data => {

                //Render rating for each gif
                var rating = data.rating;

                var displayRating = $("<h3>").text("Rating: " + rating);

                var newDiv = $("<div>")
                newDiv.attr("value", rating);
                newDiv.attr("class", "col-lg-4");

                //Render each gif
                var animateURL = data.images.original.url;
                var stillURL = data.images.downsized_still.url;

                var resultImage = $("<img>");

                resultImage.attr("src", stillURL);
                resultImage.attr("data-still", stillURL);
                resultImage.attr("data-animate", animateURL);
                resultImage.attr("data-state", "still");
                resultImage.addClass("gif");
                resultImage.attr("alt", searchedAnimal);

                //Append results 
                $("#results").append(newDiv);
                newDiv.append( displayRating, resultImage );

            });
        });
    }

    function renderButtons() {
        $("#button-added").empty();
        animals.forEach(animal => {
            var a = $("<button>");
            a.addClass("animal btn btn-secondary");
            a.attr("data-name", animal);
            a.text(animal);
            $("#button-added").append(a);
            
        });
    }

    $("#addGiphy").on("click", (event) => {
        event.preventDefault();
        var search = $("#giphyInput").val().trim();
        animals.push(search);
        console.log(animals);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=LQZSsWQiwn6cINtqyMiTrU1Pu6Ecbu96&limit=10";

        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then ((response) => {

            //Run loop through the data set retrived via AJAX
            response.data.forEach(data => {

                //Render each gif
                var rating = data.rating;

                var displayRating = $("<h3>").text("Rating: " + rating);
                var newDiv = $("<div>")
                newDiv.attr("value", rating);
                newDiv.attr("class", "col-lg-4");

                var animateURL = data.images.original.url;
                var stillURL = data.images.downsized_still.url;

                var resultImage = $("<img>");

                resultImage.attr("src", stillURL);
                resultImage.attr("data-still", stillURL);
                resultImage.attr("data-animate", animateURL);
                resultImage.attr("data-state", "still");
                resultImage.addClass("gif");
                resultImage.attr("alt", search);

                //Append results 
                $("#results").append(newDiv);
                newDiv.append( displayRating, resultImage );

            });
        });

        //Render Buttons after added search
        renderButtons();
    });

    //Function for displaying saved search

    $(document).on("click", ".animal", savedSearch);
    //Render Buttons based on animals array on load
    renderButtons();

    //Toggle between still and animate state of gif
    $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });


