const { createJsWithTsPreset } = require('ts-jest');

module.exports = {
  ...createJsWithTsPreset(),
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.[jt]s?(x)'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
