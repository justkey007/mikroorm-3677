const tsConfig = require('./tsconfig.json');

const paths = tsConfig.compilerOptions.paths;
const moduleNameMapper = {};
const getAliasPathName = (alias) => `^${alias.replace('*', '(.*)$')}`;
const getAliasPathValue = (alias) => `<rootDir>/${alias.replace('*', '$1')}`;

Object.keys(paths).forEach((alias) => {
  const aliasPath = getAliasPathName(alias, '(.*)');
  moduleNameMapper[aliasPath] = getAliasPathValue(paths[alias][0]);
});

module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest-setup.ts'],
  testRegex: '.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleNameMapper
};
