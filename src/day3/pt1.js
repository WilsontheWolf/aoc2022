const { getInput } = require('../lib');

const input = getInput(3).split('\n');

const scores = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const fin = input.reduce((acc, curr) => {
    const compartments = [curr.slice(0, curr.length / 2), curr.slice(curr.length / 2, curr.length)]
        .map(i => i.split(''));

    const dup = compartments[0].find(i => compartments[1].includes(i));
    return acc + scores.indexOf(dup);
}, 0)

console.log(fin);