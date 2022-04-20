import '../css/score.css'

const Score = ({ isScoreOpen, setIsScoreOpen }) => {

    document.body.addEventListener("click", function(e) {
        let el = e.target.className;
        if (el != "container" && el != "statistic-container" && el != "statistic" && el != "label") {
            setIsScoreOpen(false)
        }
    }, true)

    const gamesPlayed = () => {
        return JSON.parse(localStorage.getItem('userScore')).length;
    }

    const winPercent = () => {
        return Math.round((parseInt(localStorage.getItem('gamesWon'))/JSON.parse(localStorage.getItem('userScore')).length)*100);
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
                        {winPercent()}
                    </div>
                    <div className="label">Win %</div>
                </div>
                <div className="statistic-container">
                    <div className="statistic">
                        34
                    </div>
                    <div className="label">Current streak</div>
                </div>
                <div className="statistic-container">
                    <div className="statistic">
                        34
                    </div>
                    <div className="label">Max streak</div>
                </div>
            </div>
        </div>
    )
}

export default Score;