import '../css/checkbox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const Checkbox = () => {
    return (
        <div className="grid-container">
            <div className="grid-item">
                <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="grid-item">
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
        </div>
    )
}

export default Checkbox;