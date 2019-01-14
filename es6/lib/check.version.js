import axios from 'axios';
import semver from 'semver';
import chalk from 'chalk';

export default async (pkg) => {
    if (!semver.satisfies(process.version, pkg.engines.node)) {
        return console.log(chalk.redBright(`you need upgrade node to ${pkg.engines.node}.`));
    }
    try {
        const { data, status } = await axios({
            url: 'https://registry.npmjs.org/monking-cli'
        });
        if (status === 200) {
            const latestVersion = data['dist-tags'].latest;
            const localVersion = pkg.version;
            if (semver.lt(localVersion, latestVersion)) {
                console.log(chalk.yellow('  A newer version of monking-cli is available.'))
                console.log()
                console.log('  latest:    ' + chalk.greenBright(latestVersion))
                console.log('  installed: ' + chalk.redBright(localVersion))
                console.log()
                console.log(chalk.yellow('  You can reinstall by running the following:'))
                console.log(chalk.greenBright('  npm install monking-cli -g '))
                console.log()
            }
        }
    } catch(err) {

    }
};