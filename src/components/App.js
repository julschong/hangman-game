import { useEffect, useRef, useState } from 'react';
import Answer from './Answer';
import './App.css';
import Gameover from './Gameover';
import Hangman from './Hangman';
import Header from './Header';
import { useAxios } from './hooks/useAxios';

const App = () => {
    // const app = useRef();

    const [answerValues, setAnswerValues] = useState({
        correct: [],
        tried: [],
        triesLeft: 6
    });

    let gameWon = useRef(0);

    const { data, loading } = useAxios(
        'https://random-word-api.herokuapp.com/word?number=1'
    );
    const word = !loading ? data[0] : '';

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const keyPressed = (e) => {
        const key = e.key.toLowerCase();
        if (!loading) {
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
        // app.current.focus();
        window.addEventListener('keypress', keyPressed);
        return () => {
            window.removeEventListener('keypress', keyPressed);
        };
    }, [keyPressed]);

    return (
        <div
            // ref={app}
            className="hangman-game"
            onKeyPress={keyPressed}
            tabIndex={-1}
        >
            {/* {gameWon.current + word + JSON.stringify(answerValues, null, 2)} */}
            <Header />
            <Hangman triesLeft={answerValues.triesLeft} />
            <Answer word={word} answerValues={answerValues} />
            <Gameover gameWon={gameWon.current} />
        </div>
    );
};

export default App;
