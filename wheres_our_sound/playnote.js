//play single note
function playNote(note){

	//assign file
	switch (note) {
    case 1: var audio = new Audio('sounds/1.wav');
			break;
    case 2: var audio = new Audio('sounds/2.wav');
			break;
    case 3: var audio = new Audio('sounds/3.wav');
			break;
    case 4: var audio = new Audio('sounds/4.wav');
			break;
    case 5: var audio = new Audio('sounds/5.wav');
			break;
    case 6: var audio = new Audio('sounds/6.wav');
			break;
    case 7: var audio = new Audio('sounds/7.wav');
			break;
    case 8: var audio = new Audio('sounds/8.wav');
			break;
	default:
			break;
}
	if (note!=0) {
		audio.play();
	}
	timesPlayed += 1
	document.getElementById('noteNum').innerHTML = note;
	document.getElementById('playNum').innerHTML = timesPlayed;
	
}