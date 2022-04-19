import '../css/checkbox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const Checkbox = ({ checkBox }) => {
    return (
        <div className="grid-container">
            { checkBox.map(index => (
                index
                ? <div className='grid-item'><FontAwesomeIcon icon={faCheck} /></div>
                : <div className='grid-item'><FontAwesomeIcon icon={faXmark} /></div>
            ))}
        </div>
    )
}

export default Checkbox;