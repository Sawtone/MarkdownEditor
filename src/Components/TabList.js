import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TabList.scss'
import { Button, Nav } from 'react-bootstrap';
import { FileText, X, Save, Circle } from 'lucide-react';

const TabList = ({ files, activeId, unsavedIds, onTabClick, onCloseTab }) => {
    
    return (
        <Nav variant="tabs" className="px-2 pt-1 gap-1">
            {
                files.map(file => {
                    const unsavedMark = unsavedIds.includes(file.id);
                    const finalClassName = classNames({
                        'd-flex align-items-center px-3 py-2': true,
                        'active': file.id === activeId,
                        'unsaved': unsavedMark,
                    })
                    return (
                        <Nav.Item className="position-relative" key={file.id}>
                            <Nav.Link 
                                className={finalClassName}
                                aria-current="page" 
                                // href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onTabClick(file.id);
                                }}
                            >
                                <FileText size={14} className="me-2" />
                                <span className="text-truncate" style={{ maxWidth: '120px' }}>
                                    {`${file.title}.md`}
                                </span>
                                { unsavedMark && (
                                    <Circle size={6} className="mx-2" style={{ fill: '#fbbf24' }} />
                                )}
                                <div className="tab-actions ms-2 d-flex gap-1">
                                    {unsavedMark && (
                                        <Button
                                            variant="link"
                                            className="p-0 text-primary"
                                            onClick={(e) => {
                                                // 事件会冒泡到父元素，导致触发Tab点击事件，需要阻止
                                                e.stopPropagation();
                                                console.log(file.id);
                                            }}
                                            style={{ width: '20px', height: '20px' }}
                                        >
                                            <Save size={14} />
                                        </Button>
                                    )}
                                    <Button
                                        variant="link"
                                        className="p-0 text-muted"
                                        onClick={(e) => {
                                            // 事件会冒泡到父元素，导致触发Tab点击事件，需要阻止
                                            e.stopPropagation();
                                            onCloseTab(file.id)
                                        }}
                                        style={{ width: '20px', height: '20px' }}
                                    >
                                        <X size={14} />
                                    </Button>
                                </div>   
                            </Nav.Link>
                        </Nav.Item>
                    )
                })
            }
        </Nav>
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