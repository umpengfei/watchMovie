$(document).foundation();

const defaultImage = "/Users/pengfeihe/Desktop/ToDoListProject/assets/140573-black-curve-background.jpg";

// control watched moives
$(".movieList").on("click", "li", function(){
	$(this).toggleClass("watched");
});

// delete the item
$(".movieList").on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	setDefault();
	event.stopPropagation();
});

// search for an movie
$("input[type='text']").keypress(function(event){
	// make sure the key pressed is "enter"
	if(event.which === 13) {
		var movie = $(this).val();	
		$(".movieList").append("<li><span class='item delete'><i class='fas fa-trash-alt' aria-hidden='true'></i></span>" + movie + "</li>");
		// clear search bar
		$(this).val("");
		// clear previous intro
		$("#intro").empty();
		getMovie(movie);
	}
});

function setDefault() {
	$("#intro").empty();
	$("body").css({'background-image':"url(" + defaultImage + ")",
		"background-repeat":"no-repeat",
	    "background-size":"auto"});	
}

function getMovie(movie) {
	axios.get("http://www.omdbapi.com/?apikey=87f9721f&t=" + movie)
		.then((response) => {
			let data = response.data;
			console.log(response);
			let poster = data.Poster;
			if (data.Response === "False" || data.Poster === "N/A") {
				setDefault();
				addIntro("No such Movie", "");
			} else {
				$("body").css({"background-image":"url(" + poster + ")",
					"background-repeat":"no-repeat",
					"background-size":"cover"
					});
				addIntro(data.Plot, data.Title);
			}
		})
		.catch((err) => {
			console.log("api doesn't work");	
		});
}

function addIntro(intro, title) {
		let output = `
			<div id="introToMovie">
				<h2>${title}</h2>
				<p>${intro}</p>
			<div>`;
		$("#intro").html(output);	
}

// show or hide input bar
$(".icon").click(function(){
	$("input[type='text']").fadeToggle();
});

$(".sign-up").on("click", function(){
		let output = `
	        <form class="offcanvas-full-screen-form">
	          <h2>Become A Member</h2>
	          <div class="floated-label-wrapper">
	            <label for="full-name">Full name</label>
	            <input type="text" id="full-name" name="full name input" placeholder="Full name">
	          </div>
	          <div class="floated-label-wrapper">
	            <label for="email">Email</label>
	            <input type="email" id="email" name="email input" placeholder="Email">
	          </div>
	          <div class="floated-label-wrapper">
	            <label for="pass">Password</label>
	            <input type="password" id="pass" name="password input" placeholder="Password">
	          </div>
	          <input class="button expanded" type="submit" value="Sign up">
	        </form>`;
		$("#form").html(output);
		$("#to-hide").toggle("show");
});


