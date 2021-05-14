/* Get the element with the ID of querty and save it to a variable */
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

// call the getRandomPhraseAsArray function passing the phrases array as an argument into it
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

// from office hours session 

/* we have to check for the user's keyboard selection to match one of the letters in the 
phrase. Store this selection in the match variable which has a default value of null. 

*/

/* 
* letters changed to splitString since this is the array of single letters
* use SplitString to calculate the length of the phrases letters
* 
*
*/
const letters = document.querySelectorAll('.letter');

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


function reset() {
  startButton.textContent = 'Reset The Game';
  //if you have the win or lose overlay show the reset button
  startButton.addEventListener("click", ()  => {
    window.location.reload();
   
  });
}
