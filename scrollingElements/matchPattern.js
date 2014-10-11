function getMelody(emailBody){
	var regex = /([0-9]){8}/;
	var melody = emailBody.match(regex);
	return melody[0];
}