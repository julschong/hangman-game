import React, { useEffect, useRef } from 'react';
import { drawCircle, drawLine } from '../utils/draw';
const Hangman = () => {
    const canvas = useRef();
    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, 400, 400);
        drawCircle(ctx, 100, 100, 25, 1);
        drawLine(ctx, 50, 20, 50, 100, 5, 'white');
    }, []);

    return (
        <div className="hangman-figure-container">
            <canvas ref={canvas} height="400" width="400"></canvas>
        </div>
    );
};

export default Hangman;
