import Score from "./Score";
import HowToPlay from "./Howtoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar, faGear } from "@fortawesome/free-solid-svg-icons";
const Navbar = ({ isScoreOpen, setIsScoreOpen, isHowToPlayOpen, setIsHowToPlayOpen }) => {

    const showScore = () => {
        setIsHowToPlayOpen(false)
        setIsScoreOpen(true)
    }

    const showSettings = () => {
        setIsScoreOpen(false)
        setIsHowToPlayOpen(true)
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
        {/* {
            isHowToPlayOpen ?
            <HowToPlay setIsHowToPlayOpen={setIsHowToPlayOpen} />
            : null
        } */}
        </>
    )
}

export default Navbar;