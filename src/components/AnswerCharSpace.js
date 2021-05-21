import React from 'react';
import './AnswerCharSpace.css';

const AnswerCharSpace = ({ char, charArr }) => {
    return (
        <div className="answer-space">{charArr.includes(char) ? char : ''}</div>
    );
};

export default AnswerCharSpace;
