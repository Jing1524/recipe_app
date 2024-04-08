module.exports = {
    transform: {},
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts', '.tsx'], 
    transformIgnorePatterns: [
        "node_modules/(?!(string-width|cliui)/)"
      ],
  };