import '../css/checkbox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const Checkbox = ({ checkBox }) => {
    return (
        <div className="grid-container">
            <div className="grid-item">
                { checkBox[0] === undefined
                    ? console.log(checkBox)
                    : checkBox[0] === true
                        ? <FontAwesomeIcon icon={faCheck} />
                        : <FontAwesomeIcon icon={faXmark} />
                }  
            </div>
            <div className="grid-item">
            { checkBox[1] === undefined
                    ? console.log(checkBox)
                    : checkBox[1] === true
                        ? <FontAwesomeIcon icon={faCheck} />
                        : <FontAwesomeIcon icon={faXmark} />
                }  
            </div>
            <div className="grid-item">
            { checkBox[2] === undefined
                    ? console.log(checkBox)
                    : checkBox[2] === true
                        ? <FontAwesomeIcon icon={faCheck} />
                        : <FontAwesomeIcon icon={faXmark} />
                }  
            </div>
            <div className="grid-item">
            { checkBox[3] === undefined
                    ? console.log(checkBox)
                    : checkBox[3] === true
                        ? <FontAwesomeIcon icon={faCheck} />
                        : <FontAwesomeIcon icon={faXmark} />
                }  
            </div>
            <div className="grid-item">
            { checkBox[4] === undefined
                    ? console.log(checkBox)
                    : checkBox[4] === true
                        ? <FontAwesomeIcon icon={faCheck} />
                        : <FontAwesomeIcon icon={faXmark} />
                }  
            </div>
        </div>
    )
}

export default Checkbox;