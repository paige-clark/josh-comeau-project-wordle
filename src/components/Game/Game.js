import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { GUESS_LENGTH } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);

// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  return (
    <>
      <GuessInput />
    </>
  );
}

const guessErrors = {
  tooShort: "Guess is too short!",
  nonLetterChars: "Guess contains non letter characters!",
};

function GuessInput() {
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

    const submission = { guess };
    console.log(submission);
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
