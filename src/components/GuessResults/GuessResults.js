import React from "react";
import Guess from "../Guess/Guess";

import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function GuessResults({ guesses, answer }) {
  return (
    <div className="guess-results">
      {range(0, NUM_OF_GUESSES_ALLOWED).map((index) => {
        return (
          <Guess answer={answer} key={index} guess={guesses[index] || null} />
        );
      })}
    </div>
  );
}

export default GuessResults;
