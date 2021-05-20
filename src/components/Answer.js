import React from 'react';
import './Answer.css';
import AnswerCharSpace from './AnswerCharSpace';

const Answer = ({ word, answerValues }) => {
    return (
        <div className="answers-container flex">
            <section className="answers flex">
                {word &&
                    word
                        .split('')
                        .map((char, i) => (
                            <AnswerCharSpace
                                key={`${char}-at-${i}`}
                                char={char}
                                answerValues={answerValues}
                            />
                        ))}
            </section>
        </div>
    );
};

export default Answer;
