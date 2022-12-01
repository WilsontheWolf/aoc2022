const { getInput } = require('../lib');

const input = getInput(1);

const foods = input.split('\n\n');


const totals = foods.map(f => {
    return f.split('\n').reduce((acc, num) => {
        console.log('e',num)
        return acc + parseInt(num)
    }, 0);

});

console.log(totals)

console.log(totals.reduce((highest, curr) => {
    if (curr > highest) return curr;
    return highest;
}));