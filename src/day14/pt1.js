const { getInput } = require('../lib');

const inputString = getInput(14);

const input = inputString
    .split('\n').map(l => l.split(' -> ').map(c => c.split(',').map(v => parseInt(v))));

let maxX = 0, minX = Infinity, maxY = 0, minY = 0;
inputString.match(/\d+/g).forEach(v => {
    v = parseInt(v);
    if (v < 100) {
        maxX = Math.max(maxX, v);
        minX = Math.min(minX, v);
    } else {
        maxY = Math.max(maxY, v);
    }
});

console.log(maxX, minX, maxY, minY);


const grid = [...Array(maxY + 200)].map(() =>
    [...Array(maxX)]
);

const transformCoords = (x, y) => {
    // x -= minX;
    // y += 50;
    return [x, y];
}

const setPos = (x, y, v) => {
    [x, y] = transformCoords(x, y);

    grid[y][x] = v;

}

const getPos = (x, y) => {
    [x, y] = transformCoords(x, y);
    return grid[y][x]
}

const display = () =>
    console.log(grid.map((v, i) =>
        i <= maxY && i >= minY ?
            v.map((w, j) => j <= maxX && j >= minX ? w || '.' : '').join('')
            : ''
    ).filter(l => l).join('\n'))

setPos(500, 0, '+')

input.forEach(m => {
    let last;
    m.forEach(([x, y]) => {
        setPos(x, y, '#');
        if (last) {
            let newX = x;
            let newY = y;
            let diffX = last[0] - x;
            let diffY = last[1] - y;
            while (diffX) {
                const sign = Math.sign(diffX);
                newX += sign;
                diffX -= sign;
                setPos(newX, newY, '#');
            }

            while (diffY) {
                const sign = Math.sign(diffY);
                newY += sign;
                diffY -= sign;
                setPos(newX, newY, '#');
            }
        }
        last = [x, y];
    });
});

const doSand = (x = 500, y = 0) => {
    let check;

    if (y > maxY + 50)
        return false;
    // A unit of sand always falls down one step if possible.
    check = getPos(x, y + 1);
    if (!check) {
        return doSand(x, y + 1);
    }

    // If the tile immediately below is blocked (by rock or sand), 
    // the unit of sand attempts to instead move diagonally one step down and to the left
    check = getPos(x - 1, y + 1);
    if (!check) {
        return doSand(x - 1, y + 1);
    }

    // If that tile is blocked, the unit of sand attempts to instead move diagonally one step down and to the right.
    check = getPos(x + 1, y + 1);
    if (!check) {
        return doSand(x + 1, y + 1);
    }

    // If all three possible destinations are blocked, the unit of sand comes to rest and no longer moves
    setPos(x, y, 'o');
    return true
}

display();

let i = 0;
let done = false;
while (!done) {
    done = !doSand();
    if (!done)
        i++;
}

display();
console.log(i)