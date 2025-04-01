import { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { Search } from 'lucide-react';
import PropTypes from 'prop-types';
// import useKeyPress from '../hooks/useKeyPress.js';

const FileSearch = ({ onFileSearch }) => {
    const [value, setValue] = useState('');
    // const enterPressed = useKeyPress(13);
    // const escPressed = useKeyPress(27);
    // let node = useRef(null);    
    // useEffect(() => {
    //     if(isActive){
    //         node.current.focus();
    //     }
    // }, [isActive]);

    return(
        <Form.Group className="position-relative mb-4">
            <div className="search-wrapper position-relative">
                <Search className="position-absolute text-muted" 
                    style={{ top: '50%', left: '12px', transform: 'translateY(-50%)' }} 
                    size={16} 
                />
                <Form.Control
                    type="search"
                    placeholder="Search files..."
                    className='ps-5 rounded-3 border-0 bg-white shadow-sm'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ height: '42px' }}
                />
            </div>
        </Form.Group>          
    )
}

FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired,
}

export default FileSearch;