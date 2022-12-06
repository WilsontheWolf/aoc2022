const { getInput } = require('../lib');

const input = getInput(6).split('');

const buff = [];
const addToBuff = (v) => {
    if (buff.length >= 4) buff.shift();
    buff.push(v);
}

const checkBuff = () => buff.length > 3 && !buff.find((v, i) => buff.indexOf(v) !== i);

for (let i = 0; i < input.length; i++) {
    addToBuff(input[i]);
    if (checkBuff()) {
        console.log(i + 1)
        break
    }
}