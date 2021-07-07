// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  setupFiles: ['<rootDir>/setEnvVars.dev.js'],
};

module.exports = config;
