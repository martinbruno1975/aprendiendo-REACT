import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boradToCheck) => {
    //revisamos todas las combinaciones posibles
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boradToCheck[a] &&
        boradToCheck[a] === boradToCheck[b] &&
        boradToCheck[a] === boradToCheck[c]
      )
        return boradToCheck[a];
    }

    //si no hay ganador
    return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}