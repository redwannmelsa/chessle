import React, { useState, useEffect } from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import Navbar from './components/Navbar'
import Checkbox from './components/Checkbox'
import moveSets from "./openings";

import "./css/App.css";

var checkBoxArray = [];
var indexOfComputer = 0;
var indexOfPlayer = 0;
var wrongMoves = 0;
var gameIndex = Math.floor(Math.random() * 5)

const moveSet = moveSets.ComputerMoveSets[gameIndex]

const App = () => {

  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [game, setGame] = useState(new Chess());
  const [checkBox, setCheckBox] = useState([]);
  const [gameActive, setGameActive] = useState(null);

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const boardOrientation = 'white'

  useEffect(() => {
    
  }, [])

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
      if (!localStorage.getItem('userMaxStreak')) {
        localStorage.setItem('userMaxStreak', 1)
      }
      
      return setIsScoreOpen(true); // exit if the game is over
    }
    safeGameMutate((game) => {
      game.move(moveSet[indexOfComputer])
      indexOfComputer += 1;
    })
  }

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    const playerMoveSet = moveSets.playerMoveSets[gameIndex]
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
      <h5>Today's Chessle is:</h5>
      <h2>{moveSets.nameOfOpening[gameIndex]}</h2>
      <h3>{moveSets.nameOfVariation[gameIndex]}</h3>
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