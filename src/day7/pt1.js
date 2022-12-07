const { getInput } = require('../lib');

const input = getInput(7).split('$ ').slice(1);
const cmdRegex = /(\w+) ?([\w/\.]+)?/;
const lsRegex = /(\d+|dir) ?([\w/\.]+)?/;

let pwd = '';
let dirStruct = {};

const makeDir = (newDir) => {
    if (!newDir) return;
    const path = pwd.split('/');

    let temp = dirStruct;
    if (pwd)
        for (const dir of path) {
            if(!dir) continue;
            if (!temp[dir]) temp[dir] = {};
            temp = temp[dir]
        }
    temp[newDir] = {};
}

const makeFile = (file, size) => {
    // Ensure path;
    // makeDir(pwd.split('/').slice(-1)[0]);

    const path = pwd.split('/');

    let temp = dirStruct;
    if (pwd)
        for (const dir of path) {
            if (!dir) continue;
            temp = temp[dir]
        }

    temp[file] = size
}

input.forEach(prompt => {
    const [cmd, ...res] = prompt.trim().split('\n')

    const [, cmdName, arg] = cmd.match(cmdRegex);

    console.log(cmdName, arg);

    switch (cmdName) {
        case 'cd':
            if (arg === '/') pwd = "";
            else if (arg === '..') pwd = pwd.split('/').slice(0, -1).join('/');
            else pwd += '/' + arg;
            break;
        case 'ls':
            console.log(pwd)
            res.forEach(r => {
                const [, type, name] = r.match(lsRegex);
                if (type === 'dir') makeDir(name);
                else makeFile(name, type);
            });
    }

});

console.log(dirStruct)

// Dir made. Now count dir

let sum = 0;

const calcDir = (obj) =>  {

    const vals = Object.values(obj);

    const size = vals.reduce((acc, cur) => {
        if (typeof cur === 'string') return acc + parseInt(cur);
        else return acc + calcDir(cur)
    }, 0);

    console.log(size)

    if (size < 100000) sum += size;

    return size;
}

calcDir(dirStruct)

console.log(sum)