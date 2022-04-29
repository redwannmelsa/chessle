import React, { useState, useEffect } from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useCookies } from "react-cookie";

import Navbar from './components/Navbar'
import Checkbox from './components/Checkbox'

import { puzzles } from "./puzzleDb";
import "./css/App.css";

var checkBoxArray = [];
var indexOfComputer = 2;
var indexOfPlayer = 0;
var wrongMoves = 0;
var dailyPuzzle = Math.trunc(Date.now()/ (1000 * 3600 * 24) - 19107);
var pieceInCheck = ''
// var dailyPuzzle = 3;
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['gameOver'])
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [game, setGame] = useState(new Chess());
  const [moveSet, setMoveSet] = useState(null)
  const [checkBox, setCheckBox] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState(null);
  const [moveSquares, setMoveSquares] = useState({});
  const [checkedSquares, setCheckedSquares] = useState({})

  // setting up the daily game on component load
  useEffect(() => {
    if (localStorage.getItem('gameOver') !== JSON.stringify(dailyPuzzle)) {
      setGame(new Chess(puzzles[getDailyPuzzleNumber()].fen))
      setMoveSet(puzzles[getDailyPuzzleNumber()].moves)
      if (puzzles[getDailyPuzzleNumber()].fen.charAt(puzzles[getDailyPuzzleNumber()].fen.length - 10) === 'w') { // could use a regex instead -- could pass it directly in the boardoritnetation argument
        setBoardOrientation('black')
      } else {
        setBoardOrientation('white')
      }
    } else {
      setIsScoreOpen(true)
      let oldCheckBoxArray = JSON.parse(localStorage.getItem('userScore'))[JSON.parse(localStorage.getItem('userScore')).length - 1]
      setCheckBox(oldCheckBoxArray)
    }
  }, [])

  // makes the first move on setMoveSet after 2s
  useEffect(() => {
    setTimeout(() => {
      makeFirstMove()
    }, 2000);
  }, [moveSet])

  // function used to generate a move
  const safeGameMutate = (modify) => {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  // this will return a number between 0 and 99 (inclusive) to cycle through the puzzleDb
  const getDailyPuzzleNumber = () => {
    while (dailyPuzzle > 99) {
      dailyPuzzle = dailyPuzzle - 100
    }
    return dailyPuzzle
  }

  // makes the first computer move of the puzzle
  // called in useEffect 2s after component loads
  const makeFirstMove = () => {
    if(moveSet !== null) {
      safeGameMutate((game => {
        game.move({
          from: moveSet[0].substring(0, 2),
          to: moveSet[0].substring(2, 4)
        })
      }))
      setMoveSquares({ // this changes the color of the last computer move
        [moveSet[0].substring(0, 2)]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        [moveSet[0].substring(2, 4)]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
      });
    }
  }

  // called on game ending to save the user score to localStorage
  const setUserScore = () => {
      if (localStorage.getItem('userScore')) {
        let scoreArray = JSON.parse(localStorage.getItem('userScore'))
        scoreArray.push(checkBoxArray)
        localStorage.setItem('userScore', JSON.stringify(scoreArray))
      } else {
        localStorage.setItem('userScore', JSON.stringify([checkBoxArray]))
      }
  }

  // functions runs after every valid player move
  // plays the following computer move
  // if the game is ended, saves some data in localStorage and shows the scoreboard
  function makeNewMove() {
    if (moveSet[indexOfComputer] === undefined || wrongMoves === 3) {
      setUserScore();
      localStorage.setItem('gameOver', dailyPuzzle)
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
      game.move({
        from: moveSet[indexOfComputer].substring(0, 2),
        to: moveSet[indexOfComputer].substring(2, 4),
        promotion: "q" //for simplicity //! this might cause a bug if the solution is to promote something other than queen - don't wanna check
      })
    })
    setMoveSquares({ // this changes the color of the last computer move
      [moveSet[indexOfComputer].substring(0, 2)]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [moveSet[indexOfComputer].substring(2, 4)]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    });
    setCheckedSquares({})
    if (game.in_check) {
      setCheckedSquares({e3: {backgroundColor: 'pink'}})
    }
    indexOfComputer += 2;
  }

  const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1) //filters half of the moves (used to get only player moves in object)

  // runs on player move
  // on wrong move => sets the checkbox state to one more X
  // on correct move => set the checkbox state to one more ✔ + runs the function to play the following computer move
  function onDrop(sourceSquare, targetSquare) {
    let move = null;

    // these 2 consts are set as the correct moves to check against user move
    const playerSourceSquareMoveSet = every_nth(Object.values(moveSet).map(s => s.substring(0, 2)), 2) 
    const playerTargetSquareMoveSet = every_nth(Object.values(moveSet).map(s => s.substring(2, 4)), 2)

    if (sourceSquare === playerSourceSquareMoveSet[indexOfPlayer] && targetSquare === playerTargetSquareMoveSet[indexOfPlayer] && wrongMoves < 3) {
      safeGameMutate((game) => {
        move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q", // always promote to a queen for example simplicity
        });
      });
      if (move === null) return false; // illegal move
      setTimeout(makeNewMove, 2000); // runs next computer move
      indexOfPlayer++
      checkBoxArray = [...checkBox, true]
      
      setCheckedSquares({})
      if (game.in_check) {
        return setCheckedSquares({e3: {backgroundColor: 'pink'}})
      }
      setCheckBox(checkBoxArray) // allowing the checkbox component to update in real time
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
          var midnight = new Date();
          midnight.setHours(23,59,59,0);
          var midnightToTimeStamp = Date.parse(midnight)
          localStorage.setItem('gameOver', dailyPuzzle) //setting daily cookie - only one game per day
          return setIsScoreOpen(true);
        }
      }
      
    }
  }

  return (
    <div className="App-header">
      <Navbar isScoreOpen={isScoreOpen} setIsScoreOpen={setIsScoreOpen} isHowToPlayOpen={isHowToPlayOpen} setIsHowToPlayOpen={setIsHowToPlayOpen} />
      <div className="board">
        {vw > 600
          ? <Chessboard position={game.fen()} onPieceDrop={onDrop} boardOrientation={boardOrientation} customSquareStyles={{ ...moveSquares, ...checkedSquares }} /> // customsquare syntax => e3: {backgroundColor: 'pink'}
          : <Chessboard position={game.fen()} onPieceDrop={onDrop} boardOrientation={boardOrientation} boardWidth={360} />}
      </div>
      <Checkbox checkBox={checkBox} />
    </div>
  );
};

export default App;