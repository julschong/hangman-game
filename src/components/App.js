import { useEffect, useRef, useState } from 'react';
import Answer from './Answer';
import './App.css';
import Gameover from './Gameover';
import Hangman from './Hangman';
import Header from './Header';
import axios from 'axios';

const App = () => {
    // const app = useRef();

    const [answerValues, setAnswerValues] = useState({
        correct: [],
        tried: [],
        triesLeft: 6,
        word: ''
    });

    const { word } = answerValues;

    let gameWon = useRef(0);

    useEffect(() => {
        axios
            .get('https://random-word-api.herokuapp.com/word?number=1')
            .then((res) => {
                setAnswerValues({ ...answerValues, word: res.data[0] });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const keyPressed = (e) => {
        const key = e.key.toLowerCase();
        if (word.length && gameWon.current === 0) {
            const { correct, tried, triesLeft } = answerValues;
            if (key.match(/[a-z]/) && !tried.includes(key)) {
                const newCorrect = word.includes(key)
                    ? correct.concat(key)
                    : correct;

                if (word.includes(key)) {
                    setAnswerValues({
                        ...answerValues,
                        correct: newCorrect,
                        tried: tried.concat(e.key.toLowerCase())
                    });
                    if (word.split('').every((ch) => newCorrect.includes(ch))) {
                        gameWon.current = 1;
                    }
                } else {
                    if (triesLeft === 1) {
                        gameWon.current = -1;
                    }
                    setAnswerValues({
                        ...answerValues,
                        triesLeft: triesLeft - 1,
                        tried: tried.concat(e.key.toLowerCase())
                    });
                }
            } else if (tried.includes(key)) {
                console.log(`already tried ${key}`);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', keyPressed);
        return () => {
            window.removeEventListener('keypress', keyPressed);
        };
    }, [keyPressed]);

    return (
        <div className="hangman-game" onKeyPress={keyPressed} tabIndex={-1}>
            <Header />
            <Hangman triesLeft={answerValues.triesLeft} />
            <Answer word={word} answerValues={answerValues} />
            <Gameover gameWon={gameWon} setAnswerValues={setAnswerValues} />
        </div>
    );
};

export default App;
