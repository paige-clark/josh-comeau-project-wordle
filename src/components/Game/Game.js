import React from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, GUESS_LENGTH } from "../../constants";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);

// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const GAME_STATES = {
  PLAYING: "playing",
  WIN: "win",
  LOSE: "lose",
};

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
      <GuessResults guesses={guesses} />
      <GuessInput handleSetGuess={handleSetGuess} gameState={gameState} />
      <Banner gameState={gameState} guessCount={guesses.length} />
    </>
  );
}

function GuessResults({ guesses }) {
  return (
    <div className="guess-results">
      {range(0, NUM_OF_GUESSES_ALLOWED).map((index) => {
        return <Guess key={index} guess={guesses[index] || null} />;
      })}
    </div>
  );
}

function Guess({ guess }) {
  const validatedGuess = guess ? checkGuess(guess, answer) : null;

  return (
    <p className={"guess"}>
      {range(0, GUESS_LENGTH).map((index) => {
        const { letter, status } = validatedGuess?.[index] ?? {
          letter: "",
          status: "",
        };

        return (
          <span className={`cell ${status}`} key={index}>
            {letter}
          </span>
        );
      })}
    </p>
  );
}

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

function Banner({ gameState, guessCount }) {
  if (gameState === GAME_STATES.WIN) {
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{guessCount} guesses</strong>.
        </p>
      </div>
    );
  }

  if (gameState === GAME_STATES.LOSE) {
    return (
      <div className="sad banner">
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      </div>
    );
  }

  return null;
}

export default Game;
