#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const logUpdate = require('log-update');
const ora = require('ora');
const econv = require('econv');

const cli = meow(
    `
    Usage
      $ econv 200 usd rub
    `
);

let data = {};
const spinner = ora();

const speed = () =>
    chalk[data.isDone ? 'green' : 'cyan'](
        data.result
    ) + '\n\n';

function exit() {
    if (process.stdout.isTTY) {
        logUpdate(`\n\n    ${speed()}`);
    }
    else {
        console.log(`${data.result}`);
    }

    process.exit();
}

if (process.stdout.isTTY) {
    setInterval(() => {
        const pre = '\n\n  ' + spinner.frame();

        if (!data.isDone) {
            logUpdate(pre + '\n\n');
            return;
        }

        logUpdate(pre + speed());
    }, 50);
}

econv.apply(null, cli.input).then(result => {
    data = {
        isDone: true,
        result: result + ' ' + cli.input[2]
    };
    exit();
});
