const { getInput } = require('../lib');

const input = getInput(3).split('\n');

const scores = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

let groupData, score = 0;
for (let i = 0; i < input.length; i++) {
    if (!(i % 3)) groupData = [];
    groupData.push(input[i].split(''));
    if (i % 3 === 2) {
        const dup = input[i].split('').find(b => groupData[0].includes(b) && groupData[1].includes(b));
        score += scores.indexOf(dup)
    }
}
console.log(score);