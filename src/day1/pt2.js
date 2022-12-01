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

const highest = totals.reduce((highest, curr) => {
    if(highest.length < 3) {
        highest.push(curr);
    }
    else {
        let filter =highest.filter(v => v < curr);
        if(filter.length) {
            const lowest = highest.indexOf(filter.sort((a, b) => a - b)[0]);
            highest[lowest] = curr;
        }
    }
    return highest;
}, []);

console.log(highest[0] + highest[1] + highest[2])