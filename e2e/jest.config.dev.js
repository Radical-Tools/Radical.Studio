// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  setupFiles: ['<rootDir>/setEnvVars.dev.js', '<rootDir>/helpers.js'],
};

module.exports = config;
