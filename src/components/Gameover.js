import axios from 'axios';
import React from 'react';
import './Gameover.css';

const Gameover = ({ gameWon, setAnswerValues }) => {
    const visibility = {
        visibility: gameWon.current === -1 ? 'visible' : 'hidden'
    };

    const restart = (e) => {
        e.preventDefault();
        axios
            .get('https://random-word-api.herokuapp.com/word?number=1')
            .then((res) => {
                setAnswerValues({
                    correct: [],
                    tried: [],
                    triesLeft: 6,
                    word: res.data[0]
                });
            });
        gameWon.current = 0;
    };

    return (
        <div className="gameover" style={visibility}>
            <div className="gameover-modal flex">
                <p>Game Over</p>
                <button onClick={restart} className="restart-btn">
                    Go again!
                </button>
            </div>
        </div>
    );
};

export default Gameover;
