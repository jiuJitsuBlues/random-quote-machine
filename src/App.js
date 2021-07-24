import React, {useState, useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json "

/* First we are setting our initial state with a quote and an author and a random Number*/
function App() {
  const[quote, setQuote ] = useState("Life is 10% of what happens to me and 90% of how I react to it.")

  const[author, setAuthor] = useState("Charles Swindoll");

  const [randomNumber, setRandomNumber] = useState(0);

  const [quotesArray, setQuotesArray] = useState(null)

  const[accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(quoteDBUrl)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }
  
  useEffect(() => {
   fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length*Math.random()) /*Use quotesArray.length to get length of array to generate a random number*/
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }


  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color:accentColor}}>
          {/* <h1>Random Number: {randomNumber}</h1> */}
          
          
          <p id="text" class="quote-icon" style={{color: accentColor}}><FontAwesomeIcon icon={faQuoteLeft} />"{quote}"</p>
          
          <p id="author" > - {author}</p>
          <div className="buttons" >
          <a id="tweet-quote" style={{backgroundColor: accentColor}} href={encodeURI("https://www.twitter.com/intent/tweet?text=${quote} -${author}")}> <FontAwesomeIcon icon={faTwitter} /> </a>
          
          <button id="new-quote" style={{backgroundColor: accentColor}} onClick={()=>getRandomQuote()}>New Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
