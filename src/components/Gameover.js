import React from 'react';
import './Gameover.css';

const Gameover = ({ gameWon }) => {
    const visibility = {
        visibility: gameWon === -1 ? 'visible' : 'hidden'
    };

    return (
        <div className="gameover" style={visibility}>
            <div className="gameover-modal flex">
                <p>Game Over</p>
                <button className="restart-btn">Go again!</button>
            </div>
        </div>
    );
};

export default Gameover;
