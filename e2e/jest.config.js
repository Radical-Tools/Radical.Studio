// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  setupFiles: ['<rootDir>/setEnvVars.js'],
};

module.exports = config;
