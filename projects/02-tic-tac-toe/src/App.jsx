import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { Board } from "./components/Board";
import { saveGameStorage, resetGameStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });

  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  });
  //null: no hay ganador
  //false: hay un empate
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    //No actualizamos esta posicion si ya tiene algo
    if (board[index] || winner) return;

    //siempre hay que pasar un dato nuevo sin modificar el original para renderizar. A lo sumo el original pero sin modificaciones. Por eso hacemos una copia del original. Esto evita problemas en el renderizado sin llamar el setBoard. Puede haber discrepansias en el renderizado.
    //nunca hay que mutar los props y los estados. Hay que tratarlos como inmutables

    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar partida
    saveGameStorage({
      board: newBoard, 
      turn: newTurn
    })

    //revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner); // el renderizado en react es asincrono. No bloquea la ejecucion de la linea siguiente
      //alert(`El ganador es: ${newWinner}`);
    } else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  };

  return (
    <main className="board">
      <h1>TA-TE-TI</h1>
      <button on onClick={resetGame}>Empezar de nuevo</button>
      <Board board={board} updateBoard={updateBoard}/>
      
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  );
}

export default App;
