import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  moduleNameMapper: {
    '@functions/(.*)': '<rootDir>/functions/libs/$1',
    '@libs/(.*)': '<rootDir>/src/libs/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!strip-bom-stream|first-chunk-stream|strip-bom-buf)',
  ],
};

export default config;
