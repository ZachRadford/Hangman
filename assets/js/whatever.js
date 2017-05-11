
var	dick = ["ambitious but rubbish", "power", "that's not gone well", "how hard can it be", "alfa romeo", "Where do you think you've come", "allergic to manual labor", "the stig", "some say", "in the world", "i'm bored", "good news", "it's the dacia sandero", "honeybadger", "v8 blender", "hyenas are front wheel drive"]

var keysPressed = []

var random

var word

//New Array
var maskedWord

var guesses

var wrongLetters

var wins = 0

var loses = 0

setupGame()

document.onkeyup = function(event){
	var key = event.key.toLowerCase();
	if (keysPressed.indexOf(key) >= 0){
		return;
	}
	keysPressed.push(key);
	if (word.indexOf(key) >= 0) {
		// maskedWord[word.indexOf(key)] = key
		console.log(getAllIndexes(word, key))
		var indexes = getAllIndexes(word, key)
		for (var i = 0; i < indexes.length; i++){
			maskedWord[
				indexes[i]
			] = key
		}
	} else {
		wrongLetters.push(key)
		guesses-- //guesses = guesses -1
	}

	console.log("wrongLetters", wrongLetters)
	console.log(maskedWord)

	redraw(maskedWord, wrongLetters, wins, loses)

	youDidOrDidNotFuckUp(guesses, maskedWord)	
}


function redraw(maskedWord, wrongLetters, wins, loses) {
	document.getElementById('potart').innerHTML = ""
	for (var i in maskedWord) {
		document.getElementById('potart').innerHTML += "<span>"+maskedWord[i]+"</span>"
	}

	document.getElementById('cheerios').innerHTML = ""
	for (var i in wrongLetters) {
		document.getElementById('cheerios').innerHTML += "<span>"+wrongLetters[i]+"</span>"
	}

	document.getElementById('wins').innerHTML = "Wins: " + wins

	document.getElementById('loses').innerHTML = "Losses: " + loses

	document.getElementById('guesses').innerHTML = "Guesses remaining: " + guesses
	
}


function getAllIndexes(arr, val) {
    var indexes = [],  i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}


function youDidOrDidNotFuckUp(guesses, maskedWord) {
	if (guesses === 0){
		document.getElementById('gameBoard').style.display = "none"
		document.getElementById('lose').style.display = "block"
		document.getElementById('playAgain').style.display = "block"
		document.body.style.backgroundImage = "url('assets/pictures/loser.gif')";
		loses++
	}
	if (maskedWord.indexOf('_') === -1) {
		document.getElementById('gameBoard').style.display = "none"
		document.getElementById('win').style.display = "block"
		document.getElementById('playAgain').style.display = "block"
		document.body.style.backgroundImage = "url('assets/pictures/winner.gif')";
		wins++
	}
}

function setupGame(){
	random = Math.floor(Math.random()*dick.length)

	word = dick[random].toLowerCase()

	//New Array
	maskedWord = word.replace(/([A-Za-z])/g, '_').split("");

	guesses = 7

	wrongLetters = []

	keysPressed = []

	document.getElementById('gameBoard').style.display = "block"
	document.getElementById('win').style.display = "none"
	document.getElementById('playAgain').style.display = "none"
	document.getElementById('lose').style.display = "none"

	console.log(word, random, maskedWord)

	redraw(maskedWord, wrongLetters, wins, loses)

}

document.getElementById('playAgain').onclick = function(event){
	setupGame()
}

// Audio for main page load

window.onload = function() {
    document.getElementById("themesong").play();
}