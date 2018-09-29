// GifTastic

// GLOBAL VARIABLES
var topics = ["bb-8", "yoda", "han solo", "chewbacca", "princess leia", "r2-d2", "kylo ren", "darth vader"];

// FUNCTIONS

// Renders buttons...
function renderButtons(){
	// Empty the button section
	$("#buttonSection").empty();

	var i = 0;
	while(i < topics.length){
		var button = $("<button>");
		button.addClass("btn btn-default btn-block gifButton");
		button.text(topics[i].toUpperCase());

		// This will turn spaces into "+", ex: "the game" --> "the+game"
		// This is done because the url request for Giphy API requires "+" for phrases
		var string = topics[i];
		var newString = string.replace(/ /g, "+");
		button.attr("data-name", newString);
		
		// Prepend the buttons
		$("#buttonSection").prepend(button);
		i++;
	}
}

// Displays gifs
function displayGifs(value){
	$("#gifSection").empty();
	var limit = 10;
	var audienceRating = "g";
	var name = value;
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+ name +"&rating=" + audienceRating + "&limit=" + limit;

	// Make AJAX request
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		// console.log(response);
		var dataArr = response.data;

		var j = 0;
		while (j < dataArr.length){
			// This div will hold the gif and its rating
			var infoDiv = $("<div class=results>");

			// Creates rating paragraph
			var gifRating = (dataArr[j].rating).toUpperCase();
			var p = $("<p>");
			p.html("Rating: " + gifRating);
			infoDiv.append(p);

			// Creates img tag 
			var gifImage = dataArr[j].images.fixed_height_still.url;
			var dataStill = dataArr[j].images.fixed_height_still.url;
			var dataAnimate = dataArr[j].images.fixed_height.url;
			var img = $("<img>");
			img.attr({"src":gifImage, "data-still":dataStill, "data-animate":dataAnimate, "data-state":"still"});
			img.addClass("gif");
			infoDiv.append(img);

			// Append rating and gif to the gif section
			$("#gifSection").append(infoDiv);

			j++;
		}
	});
}

// Adds button with character name
function newButton(event){
	event.preventDefault();

	// Grabs the value entered and adds it to the topics array
	var newCharacter = $("#newCharacter").val().trim();
	topics.push(newCharacter.toLowerCase());
	// console.log(topics);

	$("#newCharacter").val("");

	renderButtons();
}

// Animate gifs
function animation(gifState){
	var stillAnimate = gifState;

	if(stillAnimate === "still"){
		// console.log(this);
		var gifAnimate = $(this).attr("data-animate");
		$(this).attr("src", gifAnimate);
		$(this).attr("data-state", "animate");
	}
	else {
		var gifStill = $(this).attr("data-still");
		$(this).attr("src", gifStill);
		$(this).attr("data-state", "still");
	}
}

// MAIN PROCESSES

// Clicking on a gif button...
$(document).on("click", ".gifButton", function(){
	var value = $(this).attr("data-name");
	displayGifs(value);
});

// Clicking on a gif...
$(document).on("click", ".gif", function(){
	var gifState = $(this).attr("data-state");
	// console.log(this);
	animation.call(this, gifState);
});

// Clicking on submit button
$("#submitButton").click(newButton);

// Show initial buttons...
renderButtons();


