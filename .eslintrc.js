module.exports = {
    env: {
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'import/extensions': ['off'],
        'import/prefer-default-export': ['off'],
        'import/no-unresolved': ['off'],
        // indent: [2, 4, { SwitchCase: 1, offsetTernaryExpressions: true }],
        'no-restricted-syntax': ['off'],
        'camelcase': ['off'],
        'no-await-in-loop': ['off'],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"]
    }
};
