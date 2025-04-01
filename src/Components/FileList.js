import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress.js';
import { Nav } from 'react-bootstrap';
import { FileText, Circle } from 'lucide-react';

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
        <Nav variant="pills" className="flex-column gap-2">
            {
                files.map(file => (
                    <Nav.Item
                        className="file-card"
                        key={file.id}
                    >
                        <Nav.Link
                            // active={activeTab === file.id}
                            // onClick={() => handleFileClick(file.id)}
                            className="d-flex align-items-center rounded-3 
                                        py-2 px-3 position-relative"
                    >
                        <FileText size={16} className="me-2" />
                    <div className="d-flex flex-column">
                      <span className="text-truncate">{`${file.title}.md`}</span>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                        {`Last saved: ${new Date().toLocaleTimeString()}`}
                      </small>
                    </div>
                    
                    <Circle size={8} className="position-absolute" style={{ right: '12px', top: '12px', fill: '#fbbf24' }} />
                    
                        {/* { (file.id !== editStatus) &&
                            <>
                                <span className="col-1 text-center">
                                    <FontAwesomeIcon
                                        icon={faMarkdown}
                                        size="lg"
                                        title="markdown"
                                        className="text-primary opacity-75"
                                    />
                                </span>
                                <span
                                    className='col-8 c-link text-truncate ps-3 fw-medium text-dark'
                                    onClick={() => {
                                        onFileClick(file.id)
                                    }}
                                >
                                    {file.title}
                                 </span>
                                 <div className="col-3 d-flex justify-content-end gap-2">
                                    <button
                                        type='button'
                                        className='icon-button btn-hover p-2 rounded-2'
                                        onClick={() => {
                                            setEditStatus(file.id);
                                            setValue(file.title);
                                        }}>
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            size="sm"
                                            title="edit"
                                            className="text-secondary opacity-75 hover-opacity-100"
                                        />
                                    </button>
                                    <button
                                        type='button'
                                        className='icon-button btn-hover p-2 rounded-2'
                                        onClick={() => onFileDelete(file.id)}>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size="sm"
                                            title="trash"
                                            className="text-danger opacity-75 hover-opacity-100"
                                        />
                                    </button>
                                </div>
                            </>
                        }
                        { (file.id === editStatus) &&
                            <div className="row align-items-center w-100">
                                <div className="col-9">
                                    <input
                                        className='form-control form-control-sm 
                                                    border-primary-subtle focus-ring focus-ring-primary ps-2'
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="col-3 text-end">
                                    <button
                                        type='button'
                                        className='icon-button btn-hover p-2 rounded-2'
                                        onClick={closeFileSearch}>
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            size="sm"
                                            title="close"
                                            className="text-body-secondary hover-text-primary"
                                        />
                                    </button>
                                </div>
                            </div>
                        } */}
                        </Nav.Link>    
                    </Nav.Item>
                ))
            }
        </Nav>
    )
}

FileList.propTypes = {
    files: PropTypes.array.isRequired,
    onFileClick: PropTypes.func.isRequired,
    onSaveEdit: PropTypes.func.isRequired,
    onFileDelete: PropTypes.func.isRequired,
}

export default FileList;
