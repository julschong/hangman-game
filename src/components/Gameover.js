import axios from 'axios';
import React from 'react';
import { GameResult } from '../utils/helper';
import './Gameover.css';

const Gameover = ({ gameWon, setAnswerValues, word }) => {
    // set to visible only when game is won or lost
    const visibility = {
        visibility:
            gameWon.current === GameResult.PLAYING ? 'hidden' : 'visible'
    };

    // if game is lost, set to Game Over, else just remain You Won!
    let result =
        gameWon.current === GameResult.LOST ? 'Game Over!' : 'You Won!';

    // Function called by restart button when pressed
    const restart = () => {
        // refetch another word and set the word
        axios
            .get('https://random-word-api.herokuapp.com/word?number=1')
            .then((res) => {
                // reset game logic
                setAnswerValues({
                    correct: [],
                    tried: [],
                    triesLeft: 6,
                    word: res.data[0]
                });
            });
        gameWon.current = GameResult.PLAYING;
    };

    return (
        <div className="gameover" style={visibility}>
            <div className="gameover-modal flex">
                <p>{result}</p>
                <p>{`The word is ${word}`}</p>
                <button onClick={restart} className="restart-btn">
                    Go again!
                </button>
            </div>
        </div>
    );
};

export default Gameover;
