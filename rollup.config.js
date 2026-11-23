import json from '@rollup/plugin-json';
import typescript from "@rollup/plugin-typescript";
import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';
import license from 'rollup-plugin-license';
import path from 'path';
import packageJSON from './package.json';

export default [{
    input: './index.ts',
    external: [...Object.keys(packageJSON.dependencies)],
    output: {
        dir: 'lib',
        format: 'cjs'
    },
    plugins: [
        json(),
        alias({
            entries: [
                {find: '@node-sdk', replacement: path.resolve(__dirname)}
            ]
        }),
        typescript({
            tsconfig: false,
            compilerOptions: {
                target: 'es6',
                moduleResolution: 'node',
                resolveJsonModule: true,
                allowSyntheticDefaultImports: true
            }
        }),
        license({
            banner: {
                content: {
                    file: path.join(__dirname, 'LICENSE')
                }
            }
        })
    ]
}, {
    input: './index.ts',
    external: [...Object.keys(packageJSON.dependencies)],
    output: {
        dir: 'es',
        format: 'es'
    },
    plugins: [
        json(),
        alias({
            entries: [
                {find: '@node-sdk', replacement: path.resolve(__dirname)}
            ]
        }),
        typescript({
            tsconfig: false,
            compilerOptions: {
                target: 'es6',
                moduleResolution: 'node',
                resolveJsonModule: true,
                allowSyntheticDefaultImports: true
            }
        }),
        license({
            banner: {
                content: {
                    file: path.join(__dirname, 'LICENSE')
                }
            }
        })
    ]
}, {
    input: './index.ts',
    output: {
        dir: 'types',
        format: 'es'
    },
    plugins: [
        json(),
        alias({
            entries: [
                {find: '@node-sdk', replacement: path.resolve(__dirname)}
            ]
        }),
        dts({
            compilerOptions: {
                noUnusedLocals: false,
                resolveJsonModule: true,
                allowSyntheticDefaultImports: true
            }
        }),
        license({
            banner: {
                content: {
                    file: path.join(__dirname, 'LICENSE')
                }
            }
        })
    ]
}];
