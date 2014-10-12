//play single note
<<<<<<< Updated upstream
=======

var audio = [
	new Audio('sounds/horn_c_penta/0.wav'),
	new Audio('sounds/horn_c_penta/1.wav'),
	new Audio('sounds/horn_c_penta/2.wav'),
	new Audio('sounds/horn_c_penta/3.wav'),
	new Audio('sounds/horn_c_penta/4.wav'),
	new Audio('sounds/horn_c_penta/5.wav'),
	new Audio('sounds/horn_c_penta/6.wav'),
	new Audio('sounds/horn_c_penta/7.wav'),
	new Audio('sounds/horn_c_penta/8.wav')
];
function playNote(note){

	if (note!=0) {
		audio[note].play();
	}
	timesPlayed += 1;
	
}
>>>>>>> Stashed changes
