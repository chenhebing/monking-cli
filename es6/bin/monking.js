#!/usr/bin/env node

import commander from 'commander';
import checkVersion from '../lib/check.version';
import create from '../lib/create';
const pkg = __dirname.includes('es6') ? require('../../package.json') : require('../package.json');

const main = async () => {
    await checkVersion(pkg);
    commander
        .version(pkg.version)
        .usage('<command> [options]')
        .command('create [name]')
        .description('create a monking demo')
        .option('-p, --page [page-name]', 'generate a page demo', (name) => {
            create(name, 'page');
        })
        .option('-s, --single-page [single-page-name]', 'generate a single-page demo', (name) => {
            create(name, 'singlePage');
        })
        .action((appName, cmd) => {
            if (appName) {
                create(appName, 'project');
            } else if (!(cmd.page || cmd.controller || cmd.model || cmd.aop)){
                commander.outputHelp();
            }
        });
    commander.parse(process.argv);
};

main();