import React from "react";

import GuessResults from "../GuessResults";
import GuessInput from "../GuessInput/GuessInput";
import Banner from "../Banner/Banner";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, GAME_STATES } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);

// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [gameState, setGameState] = React.useState(GAME_STATES.PLAYING);

  function handleSetGuess(guess) {
    if (gameState !== GAME_STATES.PLAYING) {
      return;
    }

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);

    if (guess === answer) {
      setGameState(GAME_STATES.WIN);
    } else if (newGuesses.length === NUM_OF_GUESSES_ALLOWED) {
      setGameState(GAME_STATES.LOSE);
    }
  }

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput handleSetGuess={handleSetGuess} gameState={gameState} />
      <Banner
        gameState={gameState}
        guessCount={guesses.length}
        answer={answer}
      />
    </>
  );
}

export default Game;
