const { getInput } = require('../lib');

const input = getInput(4).split('\n');

let score = 0;

const calc = (a, b) => b[0] >= a[0] && b[0] <= a[1] || b[1] <= a[1] && b[1] >= a[0]
input.forEach(line => {
    const [a, b] = line.split(',').map(d => d.split('-').map(n => parseInt(n)));

    if (calc(a,b) || calc(b, a)) {
        score++
    } else
        console.log(line)
})

console.log(score)