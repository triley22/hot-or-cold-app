//variables
'use strict';
var randomNumber,
guess,
previousGuesses = [],
count,
guessHtml,
guessFeedback,
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
  	newButton = $(a.new);
  	form = $('form');
  	input = form.find('#userGuess');
  	feedback = $('#feedback');
  	countElement = $('#count');
  	guessList = $('#guessList');

  	//page load
  	newGame();
  	//event handlers
  	form.submit(function(event) {
  		event.preventDefault();
  		getGuess();
  	});
  	newButton.click(newGame);
 }

 // new game

function getUserGuess(){
	//get user guess
	guess = input.val();
	//reset input value
	input.val('');
	//focus on input for next guess
	input.focus();
	//ensure valid point
	if (checkGuess()){return ;}
	//generate feedback
	guessFeedback();
	//track guesses
	previousGuesses();
	//increment count
	guessCount();
	//render page
	render();
}



 function getUserGuess(){
 	guess = input.val();

 }




	//start a new game without refreshing the page

	function render() {
		guessList.html(guessHtml);
		countElement.html(count);
		feedback.html(guessFeedback);
	}

	function winner() {
		guessFeedback = ('You Won. Click new game to play again.');
		form.find('input[type=submit]').css('opacity','0');
	}

	//create randomNumber

	function generateNumber() {
		randomNumber = Math.floor(Math.random()*100)+1;
	}

	// feedback from guess should appear in h2#feedback

	//track how many guesses user has made span# count, default to zero when page loads
	
function guessCount() {
	count++;
}

	//supply users with previous guesses, CSS set up add each number guessed as <li> ul#guessList

	function trackGuessess() {
		previousGuesses.push(guess);
		guessHtml = '';
		if (pastGuesses[0].length) {
			$.each(previousGuesses, function(guess,value){
				guessHtml += '<li>' + value + '</li>';
			})
		}
	}

	//user has to provide valid inputs, guess should be between 1 and 100
	function checkInput() {
		if (guess % 1 ! === 0) {
			alert('Please enter a number.');
			return true;
		}
		if (guess < 0 || guess > 101) {
			alert('Please enter a number between 0 and 100.')
			return true;
		}
		if (previousGuess.length > 0) {
			$.each(previousGuess,function(guess, value) {
				if (guess === value){
					alreadyguessed = true;
				}
			});
		}
		if (alreadyguessed) {
			alreadyguessed = false;
			alert('You already guessed this number.');
			return true;
		}
		return false;
	}


	//named function that takes a user's guess and determines feedback

	function guessFeedback() {
		if (randomNumber === guess) {
			document.write("<p>Congratulations, You've won the game!</p>")
		}	else if (Math.abs(randomNumber - guess) < 5) {
			document.write("<p>En Fuego!</p>")
		}	else if (Math.abs(randomNumber - guess) < 10 && Math.abs(randomNumber - guess) > 4) {
			document.write("<p>Hot</p>")
		}	else if (Math.abs(randomNumber - guess) < 15 && Math.abs(randomNumber - guess) > 9) {
			document.write("<p>Warm</p>")
		}	else if (Math.abs(randomNumber - guess) < 25 && Math.abs(randomNumber - guess) > 14) {
			document.write("<p>Cold</p>")
		}	else {
			document.write("<p>Ice Cold</p>")
		}
	}


	//when new game is clicked, reset, not browser refresh

	function resetVariables() {
		count = 0;
		previousGuesses = [];
		guessHtml='';
		guess = '';
		guessFeedback = 'Make your Guess';
	}

