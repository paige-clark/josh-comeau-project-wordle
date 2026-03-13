import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { GUESS_LENGTH, MAX_INPUT_CHARS } from "../../constants";

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

function GuessInput() {
  const [guess, setGuess] = React.useState("");

  const guessPatternRegex = `[a-zA-Z]{${GUESS_LENGTH}}`;

  function handleSubmit(event) {
    event.preventDefault();
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
      <label htmlFor="guess-input">Enter a {GUESS_LENGTH} letter guess: </label>
      <input
        required
        id="guess-input"
        type="text"
        maxLength={GUESS_LENGTH}
        pattern={guessPatternRegex}
        value={guess}
        onChange={(event) => {
          const updatedGuess = event.target.value.toUpperCase();
          setGuess(updatedGuess);
        }}
      />
    </form>
  );
}

export default Game;
