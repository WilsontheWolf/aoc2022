const { getInput } = require('../lib');

const [data, inst] = getInput(5, false).split('\n\n');

/** @type {string[][]} */
const stacks = [];
const regex = /^move (\d+) from (\d+) to (\d+)$/

const push = (item, index) => stacks[index]?.push(item) ?? (stacks[index] = [item]);

data.split('\n').slice(0, -1).forEach(line => {
    for (let i = 1; i < line.length; i += 4) {
        const char = line[i];
        if (char !== ' ') push(char, (i - 1) / 4)
    }
});

inst.split('\n').forEach((v) => {
    const [, loop, from, to] = v.match(regex)?.map(v => parseInt(v)) || [];

    for (let i = 0; i < loop; i++) {
        const val = stacks[from - 1].shift();
        stacks[to - 1].unshift(val);
    }
});

console.log(stacks.map(s => s[0]).join(''))