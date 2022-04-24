import React, { useState, useEffect } from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useCookies } from "react-cookie";

import Navbar from './components/Navbar'
import Checkbox from './components/Checkbox'
import { key } from "./key/key";

import "./css/App.css";

var checkBoxArray = [];
var indexOfComputer = 2;
var indexOfPlayer = 0;
var wrongMoves = 0;

const App = () => {


  const [cookies, setCookie, removeCookie] = useCookies(['gameOver'])
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [game, setGame] = useState(new Chess());
  const [moveSet, setMoveSet] = useState(null)
  const [checkBox, setCheckBox] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState(null);
  const [gameActive, setGameActive] = useState(null);



  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'chess-puzzles.p.rapidapi.com',
        'X-RapidAPI-Key': key
      }
    };
    console.log(document.cookie)
    if (document.cookie !== 'gameOver=true') {
      fetch('https://chess-puzzles.p.rapidapi.com/?rating=1500&themesType=ALL&playerMoves=4&count=1', options)
      .then(response => response.json())
      .then(response => {
        setGame(new Chess(response.puzzles[0].fen))
        setMoveSet(response.puzzles[0].moves)
        console.log(response.puzzles[0].fen.charAt(response.puzzles[0].fen.length - 10))
        if (response.puzzles[0].fen.charAt(response.puzzles[0].fen.length - 10) === 'w') {
          setBoardOrientation('black')
        } else {
          setBoardOrientation('white')
        }
        console.log(boardOrientation)
        
      })
      .catch(err => console.error(err));
    } else {
      setIsScoreOpen(true)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      makeFirstMove()
    }, 2000);
  }, [moveSet])


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

  async function makeFirstMove() {
    if(moveSet !== null) {
      safeGameMutate((game => {
        game.move({
          from: moveSet[0].substring(0, 2),
          to: moveSet[0].substring(2, 4)
        })
      }))
    }
  }

  function makeNewMove() {
    console.log(moveSet[indexOfComputer])
    if (moveSet[indexOfComputer] === undefined || wrongMoves === 3) {
      setUserScore();
      var midnight = new Date();
      midnight.setHours(23,59,59,0);
      setCookie('gameOver', true, { expires: midnight, sameSite: true })
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
        to: moveSet[indexOfComputer].substring(2, 4)
      })
      indexOfComputer += 2;
    })
  }

  const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1)

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    const playerSourceSquareMoveSet = every_nth(moveSet.map(s => s.substring(0, 2)), 2)
    const playerTargetSquareMoveSet = every_nth(moveSet.map(s => s.substring(2, 4)), 2)
    if (sourceSquare === playerSourceSquareMoveSet[indexOfPlayer] && targetSquare === playerTargetSquareMoveSet[indexOfPlayer] && wrongMoves < 3) {
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
          : <Chessboard position={game.fen()} onPieceDrop={onDrop} boardOrientation={boardOrientation} boardWidth={360} />}
      </div>
      <Checkbox checkBox={checkBox} />
    </div>
  );
};

export default App;