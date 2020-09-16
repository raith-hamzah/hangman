import React, { useEffect, useState } from "react";
import "./App.css";
import img6 from "./assets/6.jpg";
import img5 from "./assets/5.jpg";
import img4 from "./assets/4.jpg";
import img3 from "./assets/3.jpg";
import img2 from "./assets/2.jpg";
import img1 from "./assets/1.jpg";
import img0 from "./assets/0.jpg";

const hangmanUrls = [img0, img1, img2, img3, img4, img5, img6];

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [isWordChosen, setIsWordChosen] = useState(false);
  const [wordGuess, setWordGuess] = useState("");
  const [triesLeft, setTriesLeft] = useState(6);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  const tryLetter = (letter) => () => {
    if (guessedLetters.includes(letter)) return;
    if (!chosenWord.includes(letter)) setTriesLeft(triesLeft - 1);
    setGuessedLetters([...guessedLetters, letter]);
  };

  const resetGame = () => {
    setChosenWord("");
    setIsWordChosen(false);
    setWordGuess("");
    setGuessedLetters([]);
    setHasWon(false);
    setTriesLeft(6);
  };

  const guessWord = () => {
    if (wordGuess === chosenWord) {
      setHasWon(true);
    } else {
      setTriesLeft(triesLeft - 1);
    }
  };

  useEffect(() => {
    if (triesLeft < 1) {
      alert("You have lost.");
      resetGame();
    }
  }, [triesLeft]);

  useEffect(() => {
    if (hasWon) {
      alert("You have won!");
      resetGame();
    }
  });

  return (
    <>
      <header>
        <h1>Hangman</h1>
        <strong>By Raith Hamzah (CSE 329E)</strong>
      </header>
      <main>
        <div className="wrapper">
          {!isWordChosen && (
            <>
              <h2>Enter a word to be guessed!</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (chosenWord.length > 0) {
                    setChosenWord(
                      chosenWord.trim().split(" ").join("").toLowerCase()
                    );
                    setIsWordChosen(true);
                  }
                }}
              >
                <input
                  className="wordChoice"
                  value={chosenWord}
                  placeholder="single word"
                  onChange={(e) => setChosenWord(e.target.value)}
                />
              </form>
            </>
          )}
          {isWordChosen && (
            <>
              <div className="grid">
                <div className="hangman-image">
                  <h2>Tries left: {triesLeft}</h2>
                  <img className="hangman-image" src={hangmanUrls[triesLeft]} />
                </div>
                <div className="hangman-tries">
                  <h1>
                    {chosenWord.split("").map((letter) => {
                      if (guessedLetters.includes(letter)) return letter;
                      else return "X";
                    })}
                  </h1>
                  <menu>
                    {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => {
                      return (
                        <button
                          key={letter}
                          className={`keyboard-button ${
                            guessedLetters.includes(letter) &&
                            "keyboard-button__guessed"
                          }`}
                          onClick={tryLetter(letter)}
                        >
                          {letter.toUpperCase()}
                        </button>
                      );
                    })}
                  </menu>
                  <h2>Guess the word?</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      guessWord();
                    }}
                  >
                    <input
                      className="wordChoice"
                      value={wordGuess}
                      placeholder="your guess"
                      onChange={(e) => setWordGuess(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
