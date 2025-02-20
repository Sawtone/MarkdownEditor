import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const FileSearch = ({ title, onFileSearch}) => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    let node = useRef(null);
    const closeFileSearch = (e) => {
        e.preventDefault();
        setIsActive(false);
        setValue('');
    }

    useEffect(() => {
        const handleInput = (e) => {
            const { keyCode } = e;
            if(keyCode === 13 && isActive) { // Enter
                onFileSearch(value);
            } else if (keyCode === 27 && isActive) { // Esc
                closeFileSearch(e);
            }
        }

        document.addEventListener('keyup', handleInput);
        return (() => {
            document.removeEventListener('keyup', handleInput)
        })
    }, [isActive, value, onFileSearch])

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