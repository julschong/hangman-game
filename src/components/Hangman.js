import React, { useEffect, useRef } from 'react';
import { drawCircle, drawLine } from '../utils/draw';
const Hangman = ({ triesLeft }) => {
    const canvas = useRef();

    // rerender when triesLeft changes
    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, 400, 400);
        drawLine(ctx, 50, 50, 50, 390, 10, 'white');
        drawLine(ctx, 45, 50, 200, 50, 10, 'white');
        drawLine(ctx, 195, 50, 195, 75, 10, 'white');
        drawLine(ctx, 0, 390, 100, 390, 10, 'white');

        if (triesLeft < 6) {
            // draw head
            drawCircle(ctx, 195, 100, 25, 5, 'white');
        }
        if (triesLeft < 5) {
            // draw body
            drawLine(ctx, 195, 125, 195, 230, 5, 'white');
        }
        if (triesLeft < 4) {
            // draw left arm
            drawLine(ctx, 195, 180, 150, 150, 5, 'white');
        }
        if (triesLeft < 3) {
            // draw right arm
            drawLine(ctx, 195, 180, 240, 150, 5, 'white');
        }
        if (triesLeft < 2) {
            // draw left leg
            drawLine(ctx, 195, 230, 160, 295, 5, 'white');
        }
        if (triesLeft < 1) {
            // draw right leg
            drawLine(ctx, 195, 230, 230, 295, 5, 'white');
        }
    }, [triesLeft]);

    return (
        <div className="hangman-figure-container">
            <canvas ref={canvas} height="400" width="400"></canvas>
        </div>
    );
};

export default Hangman;
