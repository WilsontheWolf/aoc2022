const { getInput } = require('../lib');

const input = getInput(2).split('\n');

const choice = ['A', 'B', 'C'];
const res = ['X', 'Y', 'Z']
let score = 0;
input.forEach(s => {
    const [t, r] = s.split(' ');
    const ti = choice.indexOf(t);
    const ri = res.indexOf(r);

    score += ri * 3;
    if (ri === 0) // Lose 
        score += ti ? ti : 3;
    else if (ri === 1) // Draw
        score += ti + 1;
    else // Win
        score += (ti + 1) % 3 + 1
});

console.log(score)