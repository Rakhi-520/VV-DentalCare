module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/seed/**',
    '!src/config/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
}