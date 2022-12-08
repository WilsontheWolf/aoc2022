const { getInput } = require('../lib');

const col = getInput(8).split('\n').map(l => l.split('').map(v => parseInt(v)));

let highest = 0;
col.forEach((row, colI) => {
    row.forEach((item, rowI) => {
        let score = [0,0,0,0];
        // Check left
        for (let i = rowI - 1; i > -1; i--) {
            score[0]++;
            if (item <= row[i]) break;
        }

        // Check right
        for (let i = rowI + 1; i < row.length; i++) {
            score[1]++;
            if (item <= row[i]) break;
        }

        // Check up
        for (let i = colI - 1; i > -1; i--) {
            score[2]++;
            if (item <= col[i][rowI]) break;
        }

        // Check down
        for (let i = colI + 1; i < col.length; i++) {
            score[3]++;
            if (item <= col[i][rowI]) break;
        }

        const product = score[0] * score[1] * score[2] * score[3];
        if(product > highest) highest = product; 
    });
});

console.log(highest);
