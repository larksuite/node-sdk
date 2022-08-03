import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testMatch: ['**/__tests__/**/*.ts'],
    moduleNameMapper: {
        '^@node-sdk/(.*)$': '<rootDir>/$1',
    },
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
};

export default config;
