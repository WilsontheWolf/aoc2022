const { getInput } = require('../lib');

const insts = getInput(10).split('\n').map(l => l.split(' '));

const width = process.env.SLIM ? 1 : 3;
let regX = 1;
let sum = 0;
let cycle = 1;
let buff = '';

const processCycle = () => {
    let calc = (cycle % 40 || 40) - regX;
    if (calc >= 0 && calc <= 2) buff += '█'.repeat(width);
    else buff += ' '.repeat(width); 
    if (!(cycle % 40)) {
        console.log(buff);
        buff = '';
    }
};

insts.forEach(([inst, arg], i) => {
    arg = parseInt(arg);
    processCycle();
    cycle++;
    if (inst !== 'noop') {
        processCycle();
        regX += arg;
        cycle++;
    }

});