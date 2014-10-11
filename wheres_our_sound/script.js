var timesPlayed = 0;

//array that stores the notes
noteArray = [4, 4, 3, 0, 2, 2, 1, 8];

function playArray() {
	for(i=0; i<8; i++){
		(function(i){
			setTimeout(function(){
				playNote(noteArray[i]);
			}, 250 * i);
		}(i));
	}
}
