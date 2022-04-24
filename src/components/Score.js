import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import '../css/score.css'

const Score = ({ isScoreOpen, setIsScoreOpen }) => {

    useEffect(() => {
        oneErrorPercent()
    })

    document.body.addEventListener("click", function(e) {
        let el = e.target.className;
        if (el !== "container" && el !== "statistic-container" && el !== "statistic" && el !== "label" && el !== 'share-container' && el !== 'share-button' && el !== 'svg-inline--fa fa-share-nodes share-button') {
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

    const oneErrorPercent = () => {
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

    return (
        <div className="container">
            <div class="alert">
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
                    <div className="label">Current streak</div>
                </div>
                <div className="statistic-container">
                    <div className="statistic">
                        {localStorage.getItem('userMaxStreak')}
                    </div>
                    <div className="label">Max streak</div>
                </div>
            </div>
            <div className="distribution">
                <h5>Error distribution</h5>
                <div className="graph-container">
                    <div className="distribution-label">0</div>
                    <div className="graph-bar" style={{width:oneErrorPercent()[0]/gamesPlayed()*100 + '%'}}>
                        <div className="num-errors">{oneErrorPercent()[0]}</div>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="distribution-label">1</div>
                    <div className="graph-bar"  style={{width:oneErrorPercent()[1]/gamesPlayed()*100 + '%'}}>
                        <div className="num-errors">{oneErrorPercent()[1]}</div>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="distribution-label">2</div>
                    <div className="graph-bar"  style={{width:oneErrorPercent()[2]/gamesPlayed()*100 + '%'}}>
                        <div className="num-errors">{oneErrorPercent()[2]}</div>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="distribution-label">3</div>
                    <div className="graph-bar"  style={{width:oneErrorPercent()[3]/gamesPlayed()*100 + '%'}}>
                        <div className="num-errors">{oneErrorPercent()[3]}</div>
                    </div>
                </div>
            </div>
            <div className="share-container">
                <button class='share-button' onClick={() => onShareClick()}>
                    Share
                </button>
            </div>
        </div>
    )
}

export default Score;