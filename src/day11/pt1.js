const { getInput } = require('../lib');

const regex = /^Monkey \d:\n  Starting items: ([\d, ]+)\n  Operation: (new = [\w\d+*-\/ ]+)\n  Test: divisible by (\d+)\n    If true: throw to monkey (\d)\n    If false: throw to monkey (\d)\n?$/
const input = getInput(11).split('\n\n').map((m, i) => {
    let [, starting, op, test, truePass, falsePass] = m.match(regex) || [];
    if (!starting) console.error('Shits erroring. Monke:', i, m) || process.exit(1);
    starting = starting.split(', ').map(v => parseInt(v));
    op = op.replaceAll('new', 'fin'); // new is a reserved keyword
    test = parseInt(test);
    truePass = parseInt(truePass);
    falsePass = parseInt(falsePass);

    return {
        items: starting,
        index: i,
        op,
        test,
        truePass,
        falsePass,
        inspected: 0,
    }

});

const moveMonkey = (i, v) => {
    input[i].items.push(v);
}

for (let i = 0; i < 20; i++)

    for (const monke of input) {
        monke.items.forEach(i => {
            let fin;
            let old = i;
            eval(monke.op);
            fin = Math.floor(fin / 3);
            fin % monke.test ? moveMonkey(monke.falsePass, fin) : moveMonkey(monke.truePass, fin);
            monke.inspected++;
        });
        monke.items = [];
    }

console.log(input.map(m => m.inspected).sort((a, b) => b - a).reduce((acc, cur, index) => {
    if (index > 1) return acc;
    return acc * cur;
}));