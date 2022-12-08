const { getInput } = require('../lib');

const col = getInput(8).split('\n').map(l => l.split('').map(v => parseInt(v)));

const vis = {};

const setVis = (x, y) => {
    if (!vis[x]) vis[x] = {};
    vis[x][y] = true;
}

col.forEach((row, colI) => {
    row.forEach((item, rowI) => {
        if (rowI === 0 || rowI === col.length - 1) return setVis(colI, rowI);
        if (colI === 0 || colI === row.length - 1) return setVis(colI, rowI);

        // Check left
        let vis = true;
        for (let i = rowI - 1; i > -1; i--) {
            if (item <= row[i]) vis = false;
        }
        if(vis) return setVis(colI, rowI);

        // Check right
        vis = true;
        for (let i = rowI + 1; i < row.length; i++) {
            if (item <= row[i]) vis = false;
        }
        if (vis) return setVis(colI, rowI);

        // Check up
        vis = true;
        for (let i = colI - 1; i > -1; i--) {
            if (item <= col[i][rowI]) vis = false;
        }
        if (vis) return setVis(colI, rowI);

        // Check down
        vis = true;
        for (let i = colI + 1; i < col.length; i++) {
            if (item <= col[i][rowI]) vis = false;
        }
        if (vis) return setVis(colI, rowI);
    });
});

console.log(JSON.stringify(vis).split('true').length - 1); // I'm lazy

