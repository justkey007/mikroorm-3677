const jestE2Econfig = require('./jest-e2e.config');

module.exports = {
  ...jestE2Econfig,
  testRegex: '.*\\.spec\\.ts$'
};
