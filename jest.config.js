module.exports = {
  displayName: 'be-challenge',
  verbose: true,
  setupFiles: ['<rootDir>/tests/setEnvVars.js'],
  setupFilesAfterEnv: ['jest-extended/all'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: 'reports',
        filename: 'test.v2.html',
      },
    ],
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/utils/logs.middleware.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/mainConsumer.ts',
    '!src/app.module.ts',
    '!src/modules/prisma/prisma.module.ts',
    '!src/modules/prisma/prisma.service.ts',
    /**
     * NOTE: Modules are excluded as they do not expose any endpoint
     * all tests done at the service level
     */
    // TODO: REMOVE THIS WHEN TESTS ARE IN PLACE
  ],
  coverageReporters: ['json', 'text', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 88,
      functions: 88,
      lines: 88,
      statements: 88,
    },
  },
  coverageDirectory: 'reports/coverage',
  testPathIgnorePatterns: ['/node_modules/', '/src/generated/'],
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  preset: 'ts-jest',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@prismaClient/(.*)$': '<rootDir>/src/modules/prisma/$1',
    '^@sprocket/(.*)$': '<rootDir>/src/sprocket/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@unitTests/(.*)$': '<rootDir>/tests/unit/$1',
  },
};
