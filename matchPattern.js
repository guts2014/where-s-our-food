var queue = {};
var visibleQueue = new Array();

function getMelody(emailBody){
	var regex = /([0-9]){8}/;
	var melody = emailBody.match(regex);
	return melody[0];
}

function getFirstKey(data) {
	for (elem in data) 
	    return elem;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function deleteCurrentName(currentName){
	delete queue[currentName];
}

setInterval(function(){
	visibleQueue.shift();
	var currentName = getFirstKey(queue);
	console.log(currentName);
	console.log(visibleQueue);
	if(Object.size(queue) != 0){
		visibleQueue[6] = queue[currentName];
	}
		else{
		visibleQueue[6] = undefined;
	}
	deleteCurrentName(currentName);
	if(visibleQueue[1] != undefined){
		for (var i = 0; i < 8; i++) {
			(function(i){
             setTimeout(function(){
                 //playNote(queue[firstKey][i]);
                 console.log(visibleQueue[2][i]);
             }, 300 * i);
			}(i));
		}
	}
}, 2400)

function createQueue(a){
	var emailName = "whatever@sendgrid.com" + a;
	var melodyArr = getMelody("Whatever Body 213513132 <--- melody").split("");
	queue[emailName] = [];
	for(var i=0; i<melodyArr.length; i++){
		queue[emailName][i] = melodyArr[i];
	}
	console.log(queue);
}

createQueue("arewe");
createQueue("asd");