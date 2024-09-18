const { jsWithTs: tsjPreset } = require('ts-jest/presets');

module.exports = {
    roots: ["<rootDir>/src"],
    testRegex: '(.*\\.test\\.(ts|js))$',
    transform: {
        ...tsjPreset.transform,
        '^.+\\.(j|t)sx?$': 'esbuild-jest'
    },
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'node']
};
