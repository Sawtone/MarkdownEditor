import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress.js';

const FileSearch = ({ title, onFileSearch}) => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const enterPressed = useKeyPress(13);
    const escPressed = useKeyPress(27);
    let node = useRef(null);
    
    const closeFileSearch = () => {
        setIsActive(false);
        setValue('');
    }

    useEffect(() => {
        if (enterPressed && isActive) {
            onFileSearch(value);
        }
        if (escPressed && isActive) {
            closeFileSearch();
        }
    }, [isActive, value, onFileSearch, enterPressed, escPressed])

    useEffect(() => {
        if(isActive){
            node.current.focus();
        }
    }, [isActive]);

    return(
        <div className='alert alert-primary d-flex justify-content-between align-items-center'
             style={{
                 marginTop: '10px',
                 marginBottom: '10px',
             }}
        >
            {
                !isActive && (
                    <>
                        <span>{title}</span>
                        <button
                            type='button'
                            className='icon-button'
                            onClick={() => {
                                setIsActive(true);
                            }}>
                            <FontAwesomeIcon
                                icon={faSearch}
                                size="lg"
                                title="search"
                            />
                        </button>
                    </>
                )
            }
            {
                isActive && (
                    <>
                        <input
                            className='form-control'
                            value={value}
                            ref={node}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button
                            type='button'
                            className='icon-button'
                            onClick={closeFileSearch}>
                            <FontAwesomeIcon
                                icon={faClose}
                                size="xl"
                                title="close"
                            />
                        </button>
                    </>
                )
            }
        </div>
    )
}

FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired,
}

FileSearch.defaultProps = {
    title: '默认名称',
}

export default FileSearch;