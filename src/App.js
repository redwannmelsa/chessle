import React, { useState } from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import Navbar from './components/Navbar'

import "./css/App.css";

var indexOfComputer = 0;
var indexOfPlayer = 0;

const App = () => {

  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeNewMove() {
    if (game.game_over() || game.in_draw())
      return setIsScoreOpen(true); // exit if the game is over
    const moveSet = [
      'c5', 'd6', 'cxd4'
    ]
    safeGameMutate((game) => {
      game.move(moveSet[indexOfComputer])
      indexOfComputer += 1;
    })
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return setIsScoreOpen(true); // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    const playerMoveSet = [
      'e4', 'f3', 'd4', 'd4'
    ]
    console.log(playerMoveSet[indexOfPlayer])
    console.log(targetSquare)
    if (targetSquare == playerMoveSet[indexOfPlayer]) {
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
      return true;
    } else {
      console.log('wrong move')
    }
  }

  return (
    <div className="App-header">
      <Navbar isScoreOpen={isScoreOpen} setIsScoreOpen={setIsScoreOpen} />
      <div className="board">
       <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      </div>
    </div>
  );
};

export default App;