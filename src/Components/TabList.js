import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress.js';

const TabList = ({ files, activeId, unsavedIds, onTabClick, onCloseTab }) => {
    
    return (
        <ul class="nav">
            {
                files.map(file => {
                    return (
                        <li class="nav-item" key={file.id}>
                            <a 
                                class="nav-link active" 
                                aria-current="page" 
                                href="#"
                            >
                                {file.title}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

TabList.propTypes = {
    files: PropTypes.array.isRequired,
    activeId: PropTypes.string,
    unsavedIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onCloseTab: PropTypes.func,
}

TabList.defaultProps = {
    unsavedIds: [],
}
export default TabList;