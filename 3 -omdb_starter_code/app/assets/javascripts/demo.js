// get the party started
$(document).ready(function(){
	// hide our spinner
	$(".loading").hide();
		// remove our success logic from the ajax response - save it for $when, make sure to return the promise object
		$(document).ready(function(){
			// When the form is submitted...
		    $(".movieSearch").on("submit", function(e)  {
		        // prevent the default, show the spinner 
		        e.preventDefault();
		        $(".loading").show();
		        // set the value of what the user typed in to some variable
		        var sTerm = $(".title").val();
		        // use $.when to make our AJAX call
			    $.when(movieQuery(sTerm)).done(function(response){
			    	// erase previous movie data and hide the spinner and clear any previous search values
			    	$(".loading").hide();
			    	$("#movieData").html("");
			    	$(".title").val();
			    	result = JSON.parse(response);
			    	console.log(result.Search);
			    	listMovies(result);
			    });
		    });
		});

		movieQuery = function(search){
		    return $.ajax({
		      url: "http://www.omdbapi.com/",
		            data: {s: search}
		    });
		};

		listMovies = function(movies){
		  var ul = $("<ul>").attr("id", "movies");
		  for (var key in movies.Search) {
		  	console.log(movies.Search[key]);
		    var li = HandlebarsTemplates["demo/index"](movies.Search[key]);
		    ul.append(li);
		  }
		  $("#movieData").append(ul);
		};
		
					// BONUS 1 check to see if we have a valid search

					// BONUS 2 otherwise, append our precompiled Handlebars template to a div

});

