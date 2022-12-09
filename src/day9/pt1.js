const { getInput } = require('../lib');

const inst = getInput(9).split('\n').map(i => i.split(' '));

let posH = [0, 0];
let posT = [0, 0];

const dirMap = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, 1],
    D: [0, -1],
}

const visited = new Set();

const move = (dir) => {
    const n = dirMap[dir];
    posH[0] += n[0];
    posH[1] += n[1];
    if (Math.abs(posH[0] - posT[0]) > 1 || Math.abs(posH[1] - posT[1]) > 1) {
        posT[0] = posH[0] - n[0];
        posT[1] = posH[1] - n[1];
    }
    visited.add(posT.join(','));
    console.log(
        [...new Array(5)].map((a, i) => [...new Array(6)].map((b, j) => {
            if(posH[0] === j && posH[1] === 4 - i) return 'H';
            else if (posT[0] === j && posT[1] === 4 - i) return 'T';
            return '.';
        }).join('')).join('\n'),'\n'
    )
}
visited.add(posH.join(','));

inst.forEach(([dir, amount]) => {
    amount = parseInt(amount);

    for (let i = 0; i < amount; i++) {
        move(dir);

    }

});


console.log(visited.size);