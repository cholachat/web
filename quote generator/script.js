const container = document.getElementById('container')
const text = document.getElementById('quote')
const author = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

// Loading Spinner Show
function loading() {
  loader.hidden = false;
  container.hidden = true;
}

// Removing Loading Spinner
function complete() {
  loader.hidden = true;
  container.hidden = false;
}

// show new quote
function newQuote() {
  loading();
  // to pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)];
  // Check if Author field is blank and replaced it with 'unknown'
  if (quote.author){
    author.textContent = ', type.fit';
  }
  else {
    author.textContent = 'unknown';
  }
  // Check Quote length to determine styling
  if (quote.text.length > 50){
    text.classList.add('long-quote');
  }
  else {
    text.classList.remove('long-quote');
  }

  author.textContent = quote.author;
  // set quote, hide loader
  text.textContent = quote.text;
  complete();
  // console.log(quote)

  // Call the removeText function to remove unwanted text from the author element
  removeText();
}

// Function to remove unwanted text from the author element
function removeText(){
  if(author.textContent.includes(', type.fit')) {
    author.textContent = author.textContent.replace(', type.fit', '');
  }
}

// Get Quotes from API
 async function getQuotes(){
  loading();
  const apiurl='https://type.fit/api/quotes';
  try{
    const response = await fetch(apiurl);
    apiQuotes = await response.json();
    newQuote();
  }
  catch (error){
    // Catch Error Here
  }
 }

// twitter lnking
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text.textContent} - ${author.textContent}`;

window.open(twitterUrl, '_blank');
}

// Evevts Listners
  newQuoteBtn.addEventListener('click', newQuote);
 twitterBtn.addEventListener('click', tweetQuote);

//  On Load
 getQuotes();

