import React from "react";

import { GUESS_LENGTH, GAME_STATES } from "../../constants";

function GuessInput({ handleSetGuess, gameState }) {
  const [guess, setGuess] = React.useState("");
  const [guessError, setGuessError] = React.useState("");

  const guessErrors = {
    tooShort: "Guess is too short!",
    nonLetterChars: "Guess contains non letter characters!",
  };

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
        disabled={gameState !== GAME_STATES.PLAYING}
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

export default GuessInput;
