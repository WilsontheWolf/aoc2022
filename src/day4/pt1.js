const { getInput } = require('../lib');

const input = getInput(4).split('\n');

let score = 0;
input.forEach(line => {
    const parsed = line.split(',').map(d => d.split('-').map(n => parseInt(n)));

    score += parsed.find((pair, pairIndex) => {
        return parsed.find((p, i) => {
            return pairIndex !== i && p[0] <= pair[0] && p[1] >= pair[1]
        })
    }) ? 1 : 0
})

console.log(score)