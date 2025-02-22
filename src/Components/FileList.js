import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClose, faEdit, faSearch, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

// 数据结构用的 Bootstrap 的 list-group-flush

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    const [ editStatus, setEditStatus ] = useState(false);
    const [ value, setValue ] = useState('');

    const closeFileSearch = (e) => {
        e.preventDefault();
        setEditStatus(false);
        setValue('')
    }

    useEffect(() => {
        const handleInput = (e) => {
            const { keyCode } = e;
            if(keyCode === 13 && editStatus) { // Enter
                const editFile = files.find(file => file.id === editStatus);
                onSaveEdit(editFile.id, value);
                setEditStatus(false);
                setValue('');
            } else if (keyCode === 27 && editStatus) { // Esc
                closeFileSearch(e);
            }
        }

        document.addEventListener('keyup', handleInput);
        return (() => {
            document.removeEventListener('keyup', handleInput)
        })
    }, [editStatus, value, onSaveEdit])

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li
                        className="list-group-item bg-light d-flex align-items-center file-item row"
                        key={file.id}
                    >
                        { (file.id !== editStatus) &&
                            <>
                                <span className="col-2">
                                    <FontAwesomeIcon
                                        icon={faMarkdown}
                                        size="lg"
                                        title="markdown"
                                    />
                                </span>
                                <span
                                    className='col-8 c-link'
                                    onClick={() => {
                                        onFileClick(file.id)
                                    }}
                                >
                                    {file.title}
                                 </span>
                                <button
                                    type='button'
                                    className='icon-button col-1'
                                    onClick={() => {
                                        setEditStatus(file.id);
                                        setValue(file.title);
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        size="lg"
                                        title="edit"
                                    />
                                </button>
                                <button
                                    type='button'
                                    className='icon-button col-1'
                                    onClick={() => {
                                        onFileDelete(file.id);
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size="lg"
                                        title="trash"
                                    />
                                </button>
                            </>
                        }
                        { (file.id === editStatus) &&
                            <div className="row align-items-center">
                                <div className="col-11">
                                    <input
                                        className='form-control'
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                </div>
                                <div className="col-1">
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
                                </div>
                            </div>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array.isRequired,
    onFileClick: PropTypes.func.isRequired,
    onSaveEdit: PropTypes.func.isRequired,
    onFileDelete: PropTypes.func.isRequired,
}
export default FileList;
