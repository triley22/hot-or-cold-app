//variables
'use strict';
var secretNumber,
userGuess,
pastGuesses = [],
count,
guessHtml,
userFeedback,
alreadyGuessed,
newButton,
form,
input,
feedback,
countElement,
guessList;

$(document).ready(pageLoad); 

function pageLoad(){

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	//fetch dom objects
  	newButton = $('a.new');
  	form = $('form');
  	input = form.find('#userGuess');
  	feedback = $('#feedback');
  	countElement = $('#count');
  	guessList = $('#guessList');

  	
  	newGame();
  	//event handlers
  	form.submit(function(event) {
  		event.preventDefault();
  		getUserGuess();
  	});
  	newButton.click(newGame);
 }

function newGame() {
	form.find('input[type=submit]').css('opacity','1');
	resetVariables();
	render();
	generateNumber();
}
 // new game

function getUserGuess(){
	//get user guess
	userGuess = input.val();
	//reset input value
	input.val('');
	//focus on input for next guess
	input.focus();
	//ensure valid point
	if (checkGuess()){return ;}
	//generate feedback
	generateFeedback();
	//track guesses
	trackGuess();
	//increment count
	guessCount();
	//render page
	render();
}

//user has to provide valid inputs, guess should be between 1 and 100
	function checkGuess() {
		if (userGuess % 1 !== 0) {
			alert('Please enter a number.');
			return true;
		}
		if (userGuess < 0 || userGuess > 101) {
			alert('Please enter a number between 0 and 100.');
			return true;
		}
		if (pastGuesses.length > 0) {
			$.each(pastGuesses,function(userGuess, value) {
				if (userGuess == value){
					alreadyGuessed == true;
				}
			});
		}
		if (alreadyGuessed) {
			alreadyGuessed = false;
			alert('You already guessed this number.');
			return true;
		}
		return false;
	}

	//named function that takes a user's guess and determines feedback

	function generateFeedback() {
		if (secretNumber == userGuess) {
				winner();
		}	else if (Math.abs(secretNumber - userGuess) < 5) {
				userFeedback = 'En Fuego!';
		}	else if (Math.abs(secretNumber - userGuess) < 10 && Math.abs(secretNumber - userGuess) > 4) {
			userFeedback = 'Hot';
		}	else if (Math.abs(secretNumber - userGuess) < 15 && Math.abs(secretNumber - userGuess) > 9) {
			userFeedback = 'Warm';
		}	else if (Math.abs(secretNumber - userGuess) < 25 && Math.abs(secretNumber - userGuess) > 14) {
			userFeedback = 'Cold';
		}	else {
			userFeedback = 'Ice Cold';
		}
	}

		//supply users with previous guesses, CSS set up add each number guessed as <li> ul#guessList

	function trackGuess() {
		pastGuesses.push(userGuess);
		guessHtml = '';
		if (pastGuesses[0].length) {
			$.each(pastGuesses, function(userGuess,value){
				guessHtml += '<li>' + value + '</li>';
			})
		}
	}

//track how many guesses user has made span# count, default to zero when page loads
	
function guessCount() {
	count++;
}

	//start a new game without refreshing the page

	function render() {
		guessList.html(guessHtml);
		countElement.html(count);
		feedback.html(userFeedback);
	}

	function winner() {
		userFeedback = 'You Won. Click new game to play again.';
		form.find('input[type=submit]').css('opacity','0');
	}

	//create secretNumber

	function generateNumber() {
		secretNumber = Math.floor(Math.random()*100)+1;
	}

		//when new game is clicked, reset, not browser refresh

	function resetVariables() {
		count = 0;
		pastGuesses = [];
		guessHtml='';
		userGuess = '';
		userFeedback = 'Make your Guess';
	}





