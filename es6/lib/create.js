import ora from 'ora';
import os from 'os';
import rm from 'rimraf';
import gitclone from 'git-clone';
import chalk from 'chalk';
import uid from 'uid';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

const cwd = process.cwd();

const mapType = {
    project: {
        template: 'template',
        destRoot: '.'
    },
    page: {
        template: 'template/client/page/mp',
        destRoot: 'client/page',
        needDir: true
    },
    singlePage: {
        template: 'template/client/page/spa',
        destRoot: 'client/page',
        needDir: true
    }
};

const printConsole = (...args) => {
    console.log();
    console.log(...args);
};

export default (name, type) => {
    const templateUrl = 'https://github.com/chenhebing/monking-template.git';
    const templateTempDir = os.tmpdir() + '/template-' + uid();
    const spinner = ora('downloading template file');
    spinner.start();
    gitclone(templateUrl, templateTempDir, {
        checkout: 'master'
    }, async (err) => {
        spinner.stop();
        process.on('exit', () => {
            rm.sync(templateTempDir);
        })
        if (err) {
            printConsole(chalk.redBright(`Failed to clone ${templateUrl}: ${err.message.trim()}`));
        }
        if (mapType[type].needDir && !fs.pathExistsSync(path.join(cwd, mapType[type].destRoot))) {
            printConsole(chalk.redBright(`This command need run in monking project directory.`));
            process.exit(1);
        }
        if (name !== '.' && fs.pathExistsSync(path.join(cwd, mapType[type].destRoot, name))) {
            const { ok } = await inquirer.prompt([{
                type: 'confirm',
                name: 'ok',
                message: mapType[type].isFile ? `Target file ${chalk.cyan(name + '.js')} already exists.` : `Target directory ${chalk.cyan(name)} already exists.`
            }]);
            if (!ok) {
                return process.exit(1);
            }
        }
        fs.copySync(path.join(templateTempDir, mapType[type].template), path.join(cwd, mapType[type].destRoot, name), {
            overwrite: true
        })
        printConsole(('generate directory: '), chalk.cyanBright(path.join(cwd, mapType[type].destRoot, name)));
        if (!mapType[type].needDir) {
            printConsole(chalk.greenBright('you can do:'));
            name !== '.' && printConsole(chalk.greenBright(`cd ${name}`));
            printConsole(chalk.greenBright('yarn'));
            printConsole(chalk.greenBright('npm run dev'));
        }
    });
}