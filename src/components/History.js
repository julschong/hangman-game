import React from 'react';
import AnswerCharSpace from './AnswerCharSpace';

const History = ({ answerValues }) => {
    return (
        <div className=" answers history">
            Used Characters:
            {answerValues
                ? answerValues.tried.map((char, i) => (
                      <AnswerCharSpace
                          key={`${char}-at-${i}`}
                          char={char}
                          charArr={answerValues ? answerValues.tried : []}
                      />
                  ))
                : null}
        </div>
    );
};

export default History;
