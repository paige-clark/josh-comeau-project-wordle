import React from "react";

import { range } from "../../utils";
import { GUESS_LENGTH } from "../../constants";
import { checkGuess } from "../../game-helpers";

function Guess({ guess, answer }) {
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

export default Guess;
