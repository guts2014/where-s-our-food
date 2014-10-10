var notes = [1, 0, 1, 0, 1, 1, 1, 0];

function randomNote(note){
	//randomise note
	//var note = Math.floor((Math.random() * 8) + 1);
	/*
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
	*/
	document.getElementById('text').innerHTML = note;
	new Audio('sounds/' + note + '.wav').play();
}
	
for (i = 0; i < 6; i++){
	setTimeout(function(){randomNote(i);}, 1000);
}