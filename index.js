require('babel-polyfill');
require('babel-register')({
    plugins: [
        'transform-es2015-modules-commonjs',
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
    ]
});
require('./es6/bin/monking');