/* Get the element with the ID of qwerty and save it to a variable */
const keyboardQuerty = document.getElementById('qwerty');

/* Get the element with the ID of phrase and save it to a variable */
const phrase = document.getElementById('phrase');

/* Get the element which is the overlay with an ID of overlay and save it the a variable */
const hideOverlay = document.querySelector('#overlay');

/* Get the a tag with a class of btn_reset and save it to a variable */
const startButton = document.querySelector('.btn__reset');

/* Target the heart images that display how many guesses you have incorrect */
const misses = document.querySelectorAll('.tries');

/* Create a missed variable that we will use to keep a tally of missed guesses. If the player guesses
incorrectly 5 times they lose the game */
let missed = 0;

/*  Create an eventlistener that that checks to see if the user clicks the Start Game
button and if so the div with the ID of overlay will be hidden, showing the main game page.  
*/

startButton.addEventListener('click', () => {
    if (hideOverlay.style.display == 'none') {
        listhideOverlayDiv.style.display = 'block';
    } else {
    hideOverlay.style.display = 'none';
    
    }
});

/* Create a array to hold the phrases that the user will try and guess */

const phrases = [ 
    'over the rainbow', 
    'piece of cake', 
    'tip of the iceberg', 
    'cool as a cucumber' ,
    'fit as a fiddle'
];


/* Function to randomly choose a phrase from the phrases array. Split the phrase into a new array
of characters then return the new character array */

// Create a variable to store a random number based on the length of the array

function getRandomPhraseAsArray(arr){
    let randomNumber = Math.floor(Math.random() * phrases.length); 
    return arr[randomNumber].split([,]);
   
} 


const splitString = getRandomPhraseAsArray(phrases);


//addPhraseToDisplay function that loops through an array of characters

function addPhraseToDisplay(arr){
    let phraseUl = document.querySelector('#phrase ul');

    for (let i=0; i<arr.length; i++){

        let li = document.createElement('li');
    
        phraseUl.appendChild(li);
        li.textContent = arr[i]; // adding the text content as a seperate li element
    if (arr[i] === ' ') {
      li.classList.add("space"); // this is for the spaces
    } else {
        li.classList.add("letter");
    }
    }

}
addPhraseToDisplay(splitString); 



const letters = document.querySelectorAll('.letter');


// make sure the letters are lowercase, also use their length to check and run through the phrases letters
// give the correct letters a class of show, the matched variable is updated
const checkLetter = (button) => {
    let matched = null;
    for (i = 0; i < letters.length; i++) {
      if (button === letters[i].textContent.toLowerCase()) {
        letters[i].classList.add("show"); 
        matched = true;
      }
    }
  
    return matched;
  };

const hearts =  document.querySelectorAll(".tries img");


// event listener on the keyboard using the click event on the keyboard in the game
// adding the class of chosen on the key that's pressed store these values in the variable match
// check if match equals null then replace one of the full hearts with the empty heart image
// increment by 1 each time up to the 5 missed hearts

//calling the checkwin and the reset functions here as well when they are needed

  keyboardQuerty.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      e.target.className = "chosen ";
      e.target.disabled = true;
      const match = checkLetter(e.target.textContent.toLowerCase());
      if (match === null) {
        // code to change heart icon from liveHeart.png to lostHeart.png would go here
        hearts[missed].src = 'images/lostHeart.png';
        missed++;
        
       
      }
      checkWin(); 
    }
    reset();
  }); 

// using the length property to check if the value of the two variables are the same
// create the overlay by adding the class of win to the start overlay, update the headline and change the
// display property to flex 
// or if  (the value in the missed variable is greater than 4) create the overlay an add the class of lose
// change the headline to display the sorry message
// change the display property of the overlay to flex


function checkWin () {
  const show = document.querySelectorAll('.show'); // letters have matched show these letters checkletter function
  let title = document.querySelector('.title');  // grabbing the title of the overlay 
  if(letters.length === show.length) {
    hideOverlay.classList.add("win");
    title.textContent = 'You Have Won!';
    hideOverlay.style.display = 'flex';
    
  } else if (missed > 4) {
    hideOverlay.classList.add("lose");
    title.textContent = 'Sorry, please try again.';
    hideOverlay.style.display = 'flex';
    
  }

}

// adds the reload function to the game to refesh the page back to start
function reset() {
  startButton.textContent = 'Reset The Game';
  //if you have the win or lose overlay show the reset button
  startButton.addEventListener("click", ()  => {
    hideOverlay.style.display = 'flex';
    window.location.reload();
   
  });
}
