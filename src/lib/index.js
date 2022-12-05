const fs = require('node:fs');

const getInput = (day, trim = true) => {
    let input;
    try {
        input = fs.readFileSync(`./inputs/${day}.txt`, 'utf-8');
        if(trim) input?.trim();
    } catch (e) {
        console.log(e);
        console.log(`Make sure you downloaded the input for day ${day}!`);
        process.exit(1);
    }
    if (!input) {
        console.error(`No input found for day ${day}`);
        process.exit(1);
    }
    return input;
}

module.exports = {
    getInput,
}