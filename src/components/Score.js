import '../css/score.css'

const Score = ({ isScoreOpen, setIsScoreOpen }) => {

    document.body.addEventListener("click", function(e) {
        let el = e.target.className;
        if (el != "container" && el != "statistic-container" && el != "statistic" && el != "label") {
            setIsScoreOpen(false)
        }
    }, true)

    return (
        <div className="container">
            <h3>Statistics</h3>
            <div id="statistics">
                <div className="statistic-container">
                    <div className="statistic">
                        34
                    </div>
                    <div className="label" value='score'>Played</div>
                </div>
                <div className="statistic-container" value='score'>
                    <div className="statistic">
                        100
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