import '../styles.css';
import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 

function Square({ value, onSquareClick, index }) {
  return (
    <button className="square" onClick={onSquareClick} data-index={index} >
      {value}
    </button>
  );
}

function animateWinningSquares(winningSquares) {
  winningSquares.forEach((index) => {
    const squareElement = document.querySelector(`.square[data-index="${index}"]`);
    if (squareElement) {
      squareElement.classList.add('winning-square');
    }
  });
}

function Board({ xIsNext, squares, onPlay }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        const autenticatedUser = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
    
        return () => autenticatedUser();
    }, []);

    const saveWinner = async (winner) => {
        if(winner == "O"){
            const docRef = doc(db, "users", user.uid);
            const item = await getDoc(docRef);
            if (!item.exists()){
                await setDoc(docRef, {O: 0});
            }
            let currentWinner = item.data().O;
            if(currentWinner == null){
                currentWinner = 0
            }
            await updateDoc(docRef, {
                O: currentWinner + 1
            });
        }else{
            const docRef = doc(db, "users", user.uid);
            const item = await getDoc(docRef);
            if (!item.exists()){
                await setDoc(docRef, {X: 0});
            }
            console.log(item.data())
            let currentWinner = item.data().X;
            if(currentWinner == null){
                currentWinner = 0
            }
            await updateDoc(docRef, {
                X: currentWinner + 1
            });
        }
    };

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const result = calculateWinner(squares);
  console.log(result)
  const winner = result ? result.winner : null;
  let status;
  if (winner) {
    saveWinner(winner)
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} index = {0}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} index = {1}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} index = {2}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} index = {3}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} index = {4}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} index = {5}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} index = {6}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} index = {7}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} index = {8}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      }).catch((error) => {
        console.log(error.message);
      });
    }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div onClick={(handleLogout)}>Logout</div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      animateWinningSquares([a, b, c]);
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return null;

}




