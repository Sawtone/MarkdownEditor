import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import useKeyPress from '../hooks/useKeyPress.js';
import './TabList.scss'

const TabList = ({ files, activeId, unsavedIds, onTabClick, onCloseTab }) => {
    
    return (
        <ul class="nav nav-pills tablist-component">
            {
                files.map(file => {
                    const unsavedMark = unsavedIds.includes(file.id);
                    const finalClassName = classNames({
                        'nav-link': true,
                        'active': file.id === activeId,
                        'unsaved': unsavedMark,
                    })
                    return (
                        <li class="nav-item" key={file.id}>
                            <a 
                                className={finalClassName}
                                aria-current="page" 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onTabClick(file.id);
                                }}
                            >
                                {file.title}
                                <span 
                                    className="ml-2 close-icon"
                                    onClick={(e) => {
                                        // 事件会冒泡到父元素，导致触发Tab点击事件，需要阻止
                                        e.stopPropagation();
                                        onCloseTab(file.id);
                                    }}
                                >
                                    <button
                                        type='button'
                                        className='icon-button btn-hover'
                                        onClick={console.log("")}>
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            size="sm"
                                            title="close"
                                        />
                                    </button>
                                </span>
                                {   unsavedMark && (
                                     // 这里的ml-2似乎无作用，只能在.scss里面强制覆盖了
                                    <span className="ml-2 unsaved-icon rounded-circle"></span>
                                )}
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