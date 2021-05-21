export const drawCircle = (
    ctx,
    ctrx,
    ctry,
    r,
    lw = 1,
    color = 'black',
    startAngleInRad = 0,
    endAngleInRad = 2 * Math.PI
) => {
    ctx.lineWidth = lw;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(ctrx, ctry, r, startAngleInRad, endAngleInRad);
    ctx.stroke();
};

export const drawLine = (ctx, px1, py1, px2, py2, lw = 1, color = 'black') => {
    ctx.lineWidth = lw;
    ctx.strokeStyle = color;
    ctx.moveTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.stroke();
};
