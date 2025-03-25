import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClose, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress.js';

// 数据结构用的 Bootstrap 的 list-group-flush

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    const [ editStatus, setEditStatus ] = useState(false);
    const [ value, setValue ] = useState('');
    const enterPressed = useKeyPress(13);
    const escPressed = useKeyPress(27);

    const closeFileSearch = () => {
        setEditStatus(false);
        setValue('')
    }

    useEffect(() => {
        if (enterPressed && editStatus) {
            const editFile = files.find(file => file.id === editStatus);
            onSaveEdit(editFile.id, value);
            setEditStatus(false);
            setValue('');
        }

        if (escPressed && editStatus) {
            closeFileSearch();
        }
    }, [editStatus, value, onSaveEdit, enterPressed, escPressed, files])

    return (
        <ul className="list-group file-list pe-auto">
            {
                files.map(file => (
                    <li
                        className="list-group-item bg-light d-flex align-items-center file-item row me-0 py-2 hover-shadow"
                        key={file.id}
                        style={{ transition: 'all 0.2s ease' }}
                    >
                        { (file.id !== editStatus) &&
                            <>
                                <span className="col-1 text-center">
                                    <FontAwesomeIcon
                                        icon={faMarkdown}
                                        size="lg"
                                        title="markdown"
                                        className="text-primary"
                                    />
                                </span>
                                <span
                                    className='col-8 c-link text-truncate ps-3'
                                    onClick={() => {
                                        onFileClick(file.id)
                                    }}
                                >
                                    {file.title}
                                 </span>
                                 <div className="col-3 d-flex justify-content-end">
                                    <button
                                        type='button'
                                        className='icon-button btn-hover p-2 me-2'
                                        onClick={() => {
                                            setEditStatus(file.id);
                                            setValue(file.title);
                                        }}>
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            size="sm"
                                            title="edit"
                                            className="text-secondary"
                                        />
                                    </button>
                                    <button
                                        type='button'
                                        className='icon-button btn-hover p-2'
                                        onClick={() => onFileDelete(file.id)}>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size="sm"
                                            title="trash"
                                            className="text-danger"
                                        />
                                    </button>
                                </div>
                            </>
                        }
                        { (file.id === editStatus) &&
                            <div className="row align-items-center">
                                <div className="col-9">
                                    <input
                                        className='form-control form-control-sm'
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="col-3 text-end">
                                    <button
                                        type='button'
                                        className='icon-button btn-hover p-2'
                                        onClick={closeFileSearch}>
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            size="sm"
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
