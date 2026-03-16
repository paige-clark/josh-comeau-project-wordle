import React from "react";

import { GAME_STATES } from "../../constants";

function Banner({ gameState, guessCount, answer }) {
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

export default Banner;
