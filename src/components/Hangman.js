import React, { useEffect, useRef } from 'react';
const Hangman = () => {
    const canvas = useRef();
    useEffect(() => {});

    return (
        <div className="hangman-figure-container">
            <canvas ref={canvas} height="250" width="200"></canvas>
        </div>
    );
};

export default Hangman;
