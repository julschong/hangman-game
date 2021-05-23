import { useEffect, useRef, useState, useMemo } from 'react';
import Answer from './Answer';
import './App.css';
import Gameover from './Gameover';
import Hangman from './Hangman';
import Header from './Header';
import axios from 'axios';
import { GameResult } from '../utils/helper';

const App = () => {
    // states that stores game logic
    const [answerValues, setAnswerValues] = useState({
        correct: [],
        tried: [],
        triesLeft: 6,
        word: ''
    });

    // destruct only the word
    const { word } = answerValues;

    // gameWon using useRef to prevent infinite loop
    let gameWon = useRef(GameResult.PLAYING);

    // initial fetching the first word
    useEffect(() => {
        axios
            .get('https://random-word-api.herokuapp.com/word?number=1')
            .then((res) => {
                setAnswerValues({ ...answerValues, word: res.data[0] });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Check if game is won or lost only when answerValue changes using useMemo
    useMemo(() => {
        if (
            word.length &&
            word.split('').every((ch) => answerValues.correct.includes(ch))
        ) {
            gameWon.current = GameResult.WON;
        }
        if (answerValues.triesLeft === 0) {
            gameWon.current = GameResult.LOST;
        }
        console.log(`useMemo ran`);
    }, [answerValues, word]);

    // Function called by keyPressed window event listener when user press a key
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const keyPressed = (e) => {
        const key = e.key.toLowerCase();

        // only check logic when word is not empty and gameWon ref is not won or lost
        if (word.length && gameWon.current === 0) {
            const { correct, tried, triesLeft } = answerValues;

            // if key pressed is a-z and has not tried yet
            if (key.match(/[a-z]/) && !tried.includes(key)) {
                const newCorrect = word.includes(key)
                    ? correct.concat(key)
                    : correct;

                if (word.includes(key)) {
                    // if keypress is in the word
                    // add the word to correct && add the word to tried
                    setAnswerValues({
                        ...answerValues,
                        correct: newCorrect,
                        tried: tried.concat(e.key.toLowerCase())
                    });
                } else {
                    // if key is not in the word >> add the word to tried
                    setAnswerValues({
                        ...answerValues,
                        triesLeft: triesLeft - 1,
                        tried: tried.concat(e.key.toLowerCase())
                    });
                }
            } else if (tried.includes(key)) {
                // if word already tried
                console.log(`already tried ${key}`);
            }
        }
    };

    // attached eventlistener on initial render
    useEffect(() => {
        window.addEventListener('keypress', keyPressed);

        // cleanup when unmount
        return () => {
            window.removeEventListener('keypress', keyPressed);
        };
    }, [keyPressed]);

    return (
        <div className="hangman-game" onKeyPress={keyPressed} tabIndex={-1}>
            <Header />
            <Hangman triesLeft={answerValues.triesLeft} />
            <Answer word={word} answerValues={answerValues} />
            <Gameover
                gameWon={gameWon}
                setAnswerValues={setAnswerValues}
                word={word}
            />
        </div>
    );
};

export default App;
