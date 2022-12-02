const { getInput } = require('../lib');

const input = getInput(2).split('\n');

const them = ['A', 'B', 'C'];
const me = ['X', 'Y', 'Z']
let score = 0;
input.forEach(s => {
    const [t, m] = s.split(' ');
    const mi = me.indexOf(m);
    const ti = them.indexOf(t);

    score += mi + 1;

    if (mi === ti) score += 3;
    else if ((mi + 1) % 3 !== ti) score += 6;
})

console.log(score)