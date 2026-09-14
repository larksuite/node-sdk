# Contributing to Feishu Open Interface SDK

Thank you for your interest in contributing to the Feishu Open Interface SDK!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/larksuite/node-sdk.git
   cd node-sdk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **TypeScript Configuration**

   The project uses TypeScript with strict mode enabled. Key compiler options:
   - `strict: true`
   - `noImplicitReturns: true`
   - `noUnusedLocals: true`

## How to Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch
```

Tests are located in `__tests__` directories throughout the codebase. The watch mode targets `utils/__tests__` by default.

## How to Build

```bash
npm run build
```

This command removes existing `lib/`, `es/`, and `types/` directories, then runs Rollup to produce:

- `lib/` - CommonJS output
- `es/` - ES modules output
- `types/` - TypeScript declaration files

## Code Style Guidelines

This project uses **ESLint** with **Prettier** for code formatting.

### Prettier Configuration

```json
{
    "trailingComma": "es5",
    "singleQuote": true,
    "tabWidth": 4,
    "semi": true
}
```

### ESLint Configuration

The project extends `airbnb-base` with TypeScript support:

- Parser: `@typescript-eslint/parser`
- Key rules:
  - `@typescript-eslint/no-shadow`: error
  - `@typescript-eslint/no-unused-vars`: error
  - `import/extensions`: off
  - `import/prefer-default-export`: off
  - `camelcase`: off

### Code Style Rules

1. **TypeScript**
   - Use strict TypeScript; avoid `any` type
   - Enable `noImplicitReturns`, `noUnusedLocals`
   - Prefer interfaces over type aliases for object shapes

2. **Formatting**
   - 4 spaces for indentation
   - Single quotes for strings
   - Trailing commas in ES5-compatible contexts
   - Always include semicolons

3. **Naming**
   - camelCase for variables and functions
   - PascalCase for classes and interfaces
   - SCREAMING_SNAKE_CASE for constants

4. **Imports**
   - Use ES module syntax (`import`/`export`)
   - Avoid wildcard imports where possible

### Linting and Formatting

```bash
# Run ESLint
npx eslint .

# Run Prettier check
npx prettier --check .

# Format with Prettier
npx prettier --write .
```

## How to Submit Changes

### Pull Request Process

1. **Fork the repository** and create a feature branch from `main`:
   ```bash
   git checkout -b docs/add-contributing
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add tests for new functionality
   - Ensure all tests pass

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "docs: add contributing guide"
   ```

4. **Push to your fork**
   ```bash
   git push fork docs/add-contributing
   ```

5. **Open a Pull Request**
   - Target `main` branch of `larksuite/node-sdk`
   - Fill in the PR template with description
   - Link any related issues

### PR Guidelines

- Keep PRs focused and atomic
- Reference issues using `Closes #123` or `Fixes #123` in the PR body
- Ensure CI checks pass before requesting review
- Respond to review feedback promptly

### Reporting Issues

- Use [GitHub Issues](https://github.com/larksuite/node-sdk/issues)
- Include SDK version, Node.js version, and a minimal reproduction
- For bugs, include expected vs actual behavior

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
