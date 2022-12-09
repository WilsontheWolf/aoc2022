const { getInput } = require('../lib');

const inst = getInput(9).split('\n').map(i => i.split(' '));

const nots = [...new Array(10)].map(() => [0, 0]);

const dirMap = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, 1],
    D: [0, -1],
}

const visited = new Set();

const move = (dir) => {
    const n = dirMap[dir];
    nots[0][0] += n[0];
    nots[0][1] += n[1];
    for (const i in nots) {
        if (i == 0) continue;
        // Sadly my cheat from part one no longer works
        const cur = nots[i];
        const prev = nots[i - 1];
        const diff = cur.map((v, i) => v - prev[i]);
        const diffAbs = diff.map((v, i) => Math.abs(v));
        const move = [0, 0];

        if (diffAbs[0] > 1 && diffAbs[1] < 2) {
            move[0] -= Math.sign(diff[0]);
            move[1] -= diff[1];
        } else if (diffAbs[1] > 1 && diffAbs[0] < 2) {
            move[1] -= Math.sign(diff[1]);
            move[0] -= diff[0];
        }
        else if (diffAbs[1] > 1 && diffAbs[0] > 1) {
            move[0] -= Math.sign(diff[0]);
            move[1] -= Math.sign(diff[1]);
        }

        cur[0] += move[0]
        cur[1] += move[1]
    }
    visited.add(nots[nots.length - 1].join(','));

    // Leaving this here cause it took a lot of work
    // console.log(
    //     [...new Array(5)].map((a, i) => [...new Array(6)].map((b, j) => {
    //         let index = nots.findIndex(n => n.join(',') === `${j},${4 - i}`) || 'H';
    //         if (nots.length === 2 && index === 1) index = 'T'
    //         return index + 1 ? index : '.'
    //     }).join('')).join('\n') + '\n'
    // )

}
visited.add(nots[0].join(','));

inst.forEach(([dir, amount]) => {
    amount = parseInt(amount);

    for (let i = 0; i < amount; i++) {
        move(dir);
    }

});

console.log(visited.size);