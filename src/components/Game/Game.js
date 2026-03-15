import React from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, GUESS_LENGTH } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);

// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState(["BINGO"]);

  function handleSetGuess(guess) {
    // For now just alert that no more submissions are allowed
    if (guesses.length >= NUM_OF_GUESSES_ALLOWED) {
      window.alert("Game is over!");
      return;
    }

    const newGuesses = [...guesses, guess];

    setGuesses(newGuesses);
  }

  return (
    <>
      <GuessResults guesses={guesses} />
      <GuessInput handleSetGuess={handleSetGuess} />
    </>
  );
}

function GuessResults({ guesses }) {
  return (
    <div className="guess-results">
      {range(0, NUM_OF_GUESSES_ALLOWED).map((index) => {
        return <Guess key={index} guess={guesses[index] || ""} />;
      })}
    </div>
  );
}

function Guess({ guess }) {
  return (
    <p className="guess">
      {range(0, GUESS_LENGTH).map((index) => {
        return (
          <span className="cell" key={index}>
            {guess[index] || ""}
          </span>
        );
      })}
    </p>
  );
}

const guessErrors = {
  tooShort: "Guess is too short!",
  nonLetterChars: "Guess contains non letter characters!",
};

function GuessInput({ handleSetGuess }) {
  const [guess, setGuess] = React.useState("");
  const [guessError, setGuessError] = React.useState("");

  function guessIsNotLetters() {
    return !/^[A-Z]+$/.test(guess);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (guess.length < GUESS_LENGTH) {
      setGuessError(guessErrors.tooShort);
      return;
    }

    if (guessIsNotLetters()) {
      setGuessError(guessErrors.nonLetterChars);
      return;
    }

    handleSetGuess(guess);
    setGuess("");
  }

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <label htmlFor="guess-input">Enter a {GUESS_LENGTH}-letter guess: </label>
      <input
        required
        id="guess-input"
        type="text"
        maxLength={GUESS_LENGTH}
        value={guess}
        onChange={(e) => {
          setGuess(e.target.value.toUpperCase());
          setGuessError("");
        }}
      />
      {guessError !== "" && (
        <p style={{ alignSelf: "center", color: "red" }}>{guessError}</p>
      )}
    </form>
  );
}

export default Game;
