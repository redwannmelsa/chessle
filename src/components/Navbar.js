import Score from "./Score";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar, faGear } from "@fortawesome/free-solid-svg-icons";
const Navbar = ({ isScoreOpen, setIsScoreOpen }) => {

    const showScore = () => {
        setIsScoreOpen(true)
    }

    const showSettings = () => {
        console.log('show settings')
    }

    return (
        <>
        <navbar>
            <button onClick={showScore} className="score">
                <FontAwesomeIcon icon={faRankingStar} size="xl" inverse />
            </button>
            <div className="title">Chessle</div>
            <button onClick={showSettings} className="menu">
                <FontAwesomeIcon icon={faGear} size="xl" inverse />
            </button>
        </navbar>
        { isScoreOpen ? 
            <Score isScoreOpen={isScoreOpen} setIsScoreOpen={setIsScoreOpen}/>
            : null
        }
        </>
    )
}

export default Navbar;