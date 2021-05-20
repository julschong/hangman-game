import React from 'react';
import './AnswerCharSpace.css';

const AnswerCharSpace = ({ char, answerValues }) => {
    return (
        <div className="answer-space">
            {answerValues.correct.includes(char) ? char : ''}
        </div>
    );
};

export default AnswerCharSpace;
