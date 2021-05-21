import React from 'react';
import './Answer.css';
import AnswerCharSpace from './AnswerCharSpace';
import History from './History';

const Answer = ({ word, answerValues }) => {
    return (
        <div className="answers-container flex">
            <History className="answers flex" answerValues={answerValues} />
            <section className="answers flex">
                {word &&
                    word
                        .split('')
                        .map((char, i) => (
                            <AnswerCharSpace
                                key={`${char}-at-${i}`}
                                char={char}
                                charArr={
                                    answerValues ? answerValues.correct : []
                                }
                            />
                        ))}
            </section>
        </div>
    );
};

export default Answer;
