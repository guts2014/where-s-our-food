function randomNote(){

	//randomize note
	var note = Math.floor((Math.random() * 8) + 1);
	
	//assign file
	if (note == 1) {
		var audio = new Audio('sounds/1.wav');
	} else if (note == 2) {
		var audio = new Audio('sounds/2.wav');
	} else if (note == 3) {
		var audio = new Audio('sounds/3.wav');
	} else if (note == 4) {
		var audio = new Audio('sounds/4.wav');
	} else if (note == 5) {
		var audio = new Audio('sounds/5.wav');
	} else if (note == 6) {
		var audio = new Audio('sounds/6.wav');
	} else if (note == 7) {
		var audio = new Audio('sounds/7.wav');
	} else if (note == 8) {
		var audio = new Audio('sounds/8.wav');
	}
	
	document.getElementById('text').innerHTML = note;
	audio.play();
}

function myFunction() {
	setInterval(function(){randomNote()}, 300);
}