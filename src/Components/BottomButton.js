import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// Stateless Functional Components，这种写法省略了 {} 和 return
const BottomButton = ({ text, colorClass, icon, onBtnClick }) => (
    <button
        type="button"
        // 如果不使用模板字符串，则为：className={"btn btn-block no-border " + colorClass}
        className={`btn btn-block no-border ${colorClass}`}
        onClick={onBtnClick}
    >
        <FontAwesomeIcon
            className="mr-2"
            icon={icon}
            size="lg"
        />
        {'  ' + text}
    </button>
)
BottomButton.propTypes = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    icon: PropTypes.element.isRequired,
    onBtnClick: PropTypes.func,
}

BottomButton.defaultProps = {
    text: '新建按钮',
    colorClass: 'btn-success',
}

export default BottomButton;