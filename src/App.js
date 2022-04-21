import React, { useState, useEffect } from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import Navbar from './components/Navbar'
import Checkbox from './components/Checkbox'

import "./css/App.css";

var checkBoxArray = [];
var indexOfComputer = 0;
var indexOfPlayer = 0;
var wrongMoves = 0;
const moveSet = [
  'c5', 'd6', 'cxd4', 'gameEnd'
]

const App = () => {

  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [game, setGame] = useState(new Chess());
  const [checkBox, setCheckBox] = useState([]);
  const [gameActive, setGameActive] = useState(null);

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const boardOrientation = 'white'

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  const setUserScore = () => {
      if (localStorage.getItem('userScore')) {
        let scoreArray = JSON.parse(localStorage.getItem('userScore'))
        scoreArray.push(checkBoxArray)
        localStorage.setItem('userScore', JSON.stringify(scoreArray))
      } else {
        localStorage.setItem('userScore', JSON.stringify([checkBoxArray]))
      }
  }

  function makeNewMove() {
    if (moveSet[indexOfComputer] === 'gameEnd' || wrongMoves === 3) {
      setUserScore();
      if (localStorage.getItem('gamesWon') !== null) {
        localStorage.setItem('gamesWon', parseInt(localStorage.getItem('gamesWon')) + 1)
      } else {
        localStorage.setItem('gamesWon', 1);
      }
      localStorage.setItem('userMaxStreak', 1)
      
      return setIsScoreOpen(true); // exit if the game is over
    }
    safeGameMutate((game) => {
      game.move(moveSet[indexOfComputer])
      indexOfComputer += 1;
    })
  }

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    const playerMoveSet = [
      ['e2', 'e4'],
      ['g1', 'f3'],
      ['d2', 'd4'],
      ['f3', 'd4']
    ];
    if (sourceSquare === playerMoveSet[indexOfPlayer][0] && targetSquare === playerMoveSet[indexOfPlayer][1] && wrongMoves < 3) {
      safeGameMutate((game) => {
        move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q", // always promote to a queen for example simplicity
        });
      });
      if (move === null) return false; // illegal move
      setTimeout(makeNewMove, 200);
      indexOfPlayer++
      checkBoxArray = [...checkBox, true]
      setCheckBox(checkBoxArray)
      return true;
    } else {
      if (wrongMoves === 3) {
        return setIsScoreOpen(true); // exit if the game is over
      } else {
        checkBoxArray = [...checkBox, false]
        setCheckBox(checkBoxArray)
        wrongMoves++
        if (wrongMoves === 3) {
          setUserScore();
          return setIsScoreOpen(true);
        }
      }
      
    }
  }

  return (
    <div className="App-header">
      <Navbar isScoreOpen={isScoreOpen} setIsScoreOpen={setIsScoreOpen} />
      <div className="board">
        {vw > 600
          ? <Chessboard position={game.fen()} onPieceDrop={onDrop} boardOrientation={boardOrientation}/>
          : <Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth={360} />}
      </div>
      <Checkbox checkBox={checkBox} />
    </div>
  );
};

export default App;