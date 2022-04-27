import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import '../css/score.css'

const Score = ({ isScoreOpen, setIsScoreOpen }) => {

    const [now, setNow] = useState(new Date())

    useEffect(() => {
        getGameStats()
    }, [])

    document.body.addEventListener("click", function(e) {
        let el = e.target.className;
        let el2 = e.target.tagName;
        if (el !== "container" && el !== "statistic-container" && el !== "statistic" && el !== "label" && el !== 'share-container' && el !== 'share-button' && el2 !== 'svg' && el2 !== 'path') {
            setIsScoreOpen(false)
        }
    }, true)

    const gamesPlayed = () => {
        if (localStorage.getItem('userScore') !== null) {
            return JSON.parse(localStorage.getItem('userScore')).length;
        }
    }

    const winPercent = () => {
        if (localStorage.getItem('gamesWon') !== null && localStorage.getItem('userScore') !== null) {
            return Math.round((parseInt(localStorage.getItem('gamesWon'))/JSON.parse(localStorage.getItem('userScore')).length)*100);
        }
    }

    const getGameStats = () => {
        var zeroErrorInt = 0;
        var oneErrorInt = 0;
        var twoErrorsInt = 0;
        var threeErrorsInt = 0;
        var errorValuesArr = [];

        for (let i in JSON.parse(localStorage.getItem('userScore'))) {
            if (JSON.parse(localStorage.getItem('userScore'))[i].filter(x => x === false).length === 1) {
                oneErrorInt++
            } else if (JSON.parse(localStorage.getItem('userScore'))[i].filter(x => x === false).length === 2) {
                twoErrorsInt++
            } else if (JSON.parse(localStorage.getItem('userScore'))[i].filter(x => x === false).length === 3) {
                threeErrorsInt++
            } else {
                zeroErrorInt++
            }
        }
        return errorValuesArr = [zeroErrorInt, oneErrorInt, twoErrorsInt, threeErrorsInt]
    }

    const currentStreak = () => {
        let currentStreakInt = 0;
        for (let i in JSON.parse(localStorage.getItem('userScore'))) {
            if (JSON.parse(localStorage.getItem('userScore'))[i].filter(x => x === false).length === 3) {
                currentStreakInt = 0;
            } else {
                currentStreakInt++
            }
        }
        if (localStorage.getItem('userMaxStreak') && parseInt(localStorage.getItem('userMaxStreak')) < currentStreakInt) {
            localStorage.setItem('userMaxStreak', currentStreakInt)
            console.log(localStorage.getItem('userMaxStreak'))
        }
        return currentStreakInt;
    }

    const onShareClick = () => {
        let sharingArr = ""
        // console.log(JSON.parse(localStorage.getItem('userScore')).length)
        // console.log(JSON.parse(localStorage.getItem('userScore'))[JSON.parse(localStorage.getItem('userScore')).length - 1])
        for (let element in JSON.parse(localStorage.getItem('userScore'))[JSON.parse(localStorage.getItem('userScore')).length - 1]) {
            // console.log(JSON.parse(localStorage.getItem('userScore'))[JSON.parse(localStorage.getItem('userScore')).length - 1][element])
            if (JSON.parse(localStorage.getItem('userScore'))[JSON.parse(localStorage.getItem('userScore')).length - 1][element] === false) {
                sharingArr += '🟥'
            } else {
                sharingArr += '🟩'
            }
        }

        const today = new Date();
        console.log(parseInt(today.getMonth()) + 1)
        navigator.clipboard.writeText('Chessle ' + today.getDate() + '/' + parseInt(today.getMonth() + 1) + '\n' + sharingArr)
        document.getElementsByClassName('alert')[0].style.display = 'flex';
        setTimeout(() => {
            document.getElementsByClassName('alert')[0].style.display = 'none';
        }, 2000);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000)

        return () => { // stops the interval when unmounting the component
            clearInterval(interval)
        }
    }, [setNow])

    const getTimer = () => {
        var displayedTimer = ''
        var timer = (Date.parse(midnight) - Date.parse(now))/1000
        var midnight = new Date();
        midnight.setHours(23,59,59,0);
        var midnightToTimeStamp = Date.parse(midnight)

        var h = Math.floor((Date.parse(midnight) - Date.parse(now))/1000 / 3600);
        var m = Math.floor((Date.parse(midnight) - Date.parse(now))/1000 % 3600 / 60);
        var s = Math.floor((Date.parse(midnight) - Date.parse(now))/1000 % 3600 % 60);

        if (h < 10) {
            h = '0' + h
        }

        if (m < 10) {
            m = '0' + m
        }

        if (s < 10) {
            s = '0' + s
        }

        displayedTimer =  h + ':' + m + ':' + s
        return displayedTimer
    }

    return (
        <div className="container">
            <div className="alert">
                Score copied to clipboard!
            </div> 
            <h3>Statistics</h3>
            <div id="statistics">
                <div className="statistic-container">
                    <div className="statistic">
                        {gamesPlayed()}
                    </div>
                    <div className="label">Played</div>
                </div>
                <div className="statistic-container">
                    <div className="statistic">
                        {winPercent()
                        ? winPercent()
                        : '0'}
                    </div>
                    <div className="label">Win %</div>
                </div>
                <div className="statistic-container">
                    <div className="statistic">
                        {currentStreak()}
                    </div>
                    <div className="label">Current<br></br> streak</div>
                </div>
                <div className="statistic-container">
                    <div className="statistic">
                        {localStorage.getItem('userMaxStreak')}
                    </div>
                    <div className="label">Max<br></br> streak</div>
                </div>
            </div>
            <div className="distribution">
                <h5>Error distribution</h5>
                <div className="graph-container">
                    <div className="distribution-label">0</div>
                    <div className="graph-bar" style={{width:getGameStats()[0]/gamesPlayed()*100 + '%'}}>
                        <div className="num-errors">{getGameStats()[0]}</div>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="distribution-label">1</div>
                    <div className="graph-bar"  style={{width:getGameStats()[1]/gamesPlayed()*100 + '%'}}>
                        <div className="num-errors">{getGameStats()[1]}</div>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="distribution-label">2</div>
                    <div className="graph-bar"  style={{width:getGameStats()[2]/gamesPlayed()*100 + '%'}}>
                        <div className="num-errors">{getGameStats()[2]}</div>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="distribution-label">3</div>
                    <div className="graph-bar"  style={{width:getGameStats()[3]/gamesPlayed()*100 + '%'}}>
                        <div className="num-errors">{getGameStats()[3]}</div>
                    </div>
                </div>
            </div>
            {localStorage.getItem('gameOver') ?
                <div className="share-container">
                <div className="timer-container">
                    next Chessle
                    <div className="timer">{getTimer()}</div>
                </div>
                <button className='share-button' onClick={() => onShareClick()}>
                    Share
                    <FontAwesomeIcon icon={faShareNodes}></FontAwesomeIcon>
                </button>
                </div>
                : null
            }
        </div>
    )
}

export default Score;