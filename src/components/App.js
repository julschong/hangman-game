import { useEffect, useRef, useState } from 'react';
import { getWord } from '../utils/helper';
import Answer from './Answer';
import './App.css';
import Header from './Header';

const App = () => {
    const [word, setWord] = useState('');
    const app = useRef();

    const [answerValues, setAnswerValues] = useState({
        correct: [],
        incorrect: [],
        triesLeft: 6
    });

    useEffect(() => {
        getWord().then((word) => setWord(word));
        app.current.focus();
    }, []);

    const keyPressed = (e) => {
        setAnswerValues({
            ...answerValues,
            correct: answerValues.correct.concat(e.key.toLowerCase())
        });
    };

    return (
        <div
            ref={app}
            className="hangman-game"
            onKeyPress={keyPressed}
            tabIndex={-1}
        >
            {word + JSON.stringify(answerValues)}
            <Header />
            <Answer word={word} answerValues={answerValues} />
        </div>
    );
};

export default App;
