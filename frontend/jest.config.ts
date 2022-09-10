import type { Config } from 'jest';

const config: Config = {
    testRegex: '.*\\.test\\.tsx?$',
    transform: {
        '\\.tsx?$': 'ts-jest',
    }
}

export default config;