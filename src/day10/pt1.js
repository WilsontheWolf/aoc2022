const { getInput } = require('../lib');

const insts = getInput(10).split('\n').map(l => l.split(' '));

let regX = 1;
let sum = 0;
let cycle = 1;

const processCycle = () => {
    if (!((cycle - 20) % 40)) {
        sum += cycle * regX;
    }
};

insts.forEach(([inst, arg], i) => {
    arg = parseInt(arg);
    cycle++;
    processCycle();
    if (inst !== 'noop') {
        regX += arg;
        cycle++;
        processCycle();
    }

});
console.log(sum);