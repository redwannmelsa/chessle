import '../css/score.css'

const Score = ({ isScoreOpen, setIsScoreOpen }) => {

    document.body.addEventListener("click", function(e) {
        let el = e.target.className;
        if (el !== "container" && el !== "statistic-container" && el !== "statistic" && el !== "label") {
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

    const currentStreak = () => {
        let currentStreakInt = 0;
        // console.log(JSON.parse(localStorage.getItem('userScore'))[0].filter(x => x === false).length)
        for (let i in JSON.parse(localStorage.getItem('userScore'))) {
            console.log(JSON.parse(localStorage.getItem('userScore'))[i])
            if (JSON.parse(localStorage.getItem('userScore'))[i].filter(x => x === false).length === 3) {
                currentStreakInt = 0;
            } else {
                currentStreakInt++
            }
        }
        if (localStorage.getItem('userMaxStreak') && parseInt(localStorage.getItem('userMaxStreak')) < currentStreakInt) {
            localStorage.setItem('userMaxStreak', currentStreakInt)
        }
        return currentStreakInt;
    }

    return (
        <div className="container">
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
        </div>
    )
}

export default Score;