//play single note

var audio = [
	null,
	new Audio('sounds/1.wav'),
	new Audio('sounds/2.wav'),
	new Audio('sounds/3.wav'),
	new Audio('sounds/4.wav'),
	new Audio('sounds/5.wav'),
	new Audio('sounds/6.wav'),
	new Audio('sounds/7.wav'),
	new Audio('sounds/8.wav')
];
function playNote(note){

	if (note!=0) {
		audio[note].play();
	}
	timesPlayed += 1;

}
