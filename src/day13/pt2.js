const { getInput } = require('../lib');

const input = getInput(13).split('\n\n').map(l => l.split('\n').map(v => JSON.parse(v)));

const dividers = [[[2]], [[6]]];
input.push(dividers); // Divider pakcetsS
console.log(input);

const check = (left, right) => {
    if (typeof left !== typeof right) {
        console.log(left, right)
        if (!Array.isArray(left)) left = [left];
        if (!Array.isArray(right)) right = [right];
        return check(left, right);
    } else {
        if (Array.isArray(left)) {
            return checkList(left, right);
        } else {
            if (left < right) return true;
            if (left > right) return false;
            else return null;
        }
    }
};

const checkList = (left, right) => {
    const min = Math.min(left.length, right.length);
    let ok = null;
    for (let i = 0; i < min; i++) {
        let res = check(left[i], right[i]);
        if (res === null) continue;
        ok = res;
        break;
    }
    if (ok === null) {
        return check(left.length, right.length);
    }
    return ok
}

let res = input.flat().sort((one, two) => {
    const v = checkList(one, two);
    if (v === null) return 0;
    if (v === true) return -1;
    return 1;
})
    .map((v, i) => {
        if (dividers.includes(v)) return i + 1;
        return 1;
    });

console.log(res.reduce((acc, v) => acc * v));