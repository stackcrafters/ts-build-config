# @stackcrafters/ts-build-config

Shared build and quality-tooling configuration for Stackcrafters TypeScript projects.

This package publishes reusable presets for:

- TypeScript
- ESLint flat config
- Prettier integration
- Jest
- React-specific TypeScript and ESLint setups

## Requirements

- Node.js 24 LTS
- npm

This repository is configured for Node `v24.14.0` via `.nvmrc`.

## Installation

Install the package from the Stackcrafters GitHub Packages registry:

```sh
npm install -D @stackcrafters/ts-build-config
```

If your environment does not already authenticate against GitHub Packages, make sure your `.npmrc` is configured for the `@stackcrafters` scope.

## What This Package Exports

Published files live under `config/`.

- `config/tsconfig.json`: base TypeScript config for non-React projects
- `config/tsconfig.node.json`: supporting Node/project-reference TypeScript config
- `config/eslint.config.mjs`: base ESLint flat config
- `config/jest.config.js`: shared Jest config
- `config/react/tsconfig.json`: React TypeScript config
- `config/react/tsconfig.node.json`: React tooling TypeScript config
- `config/react/eslint.config.mjs`: React ESLint flat config
- `config/index.js`: CommonJS entrypoint that exports the shared Jest config

## Usage

### Base TypeScript Project

Create a `tsconfig.json` in the consuming project:

```json
{
  "extends": "@stackcrafters/ts-build-config/config/tsconfig.json"
}
```

The base config is intended for modern bundler-based TypeScript projects. It enables strict type-checking, `moduleResolution: "bundler"`, and `noEmit`.

### React TypeScript Project

Create a `tsconfig.json` in the consuming project:

```json
{
  "extends": "@stackcrafters/ts-build-config/config/react/tsconfig.json"
}
```

This preset adds `jsx: "react-jsx"` on top of the modern bundler-oriented TypeScript defaults.

### Base ESLint Flat Config

Create `eslint.config.mjs` in the consuming project:

```js
import baseConfig from '@stackcrafters/ts-build-config/config/eslint.config.mjs';

export default [...baseConfig];
```

The base config includes:

- ESLint recommended rules
- `typescript-eslint` recommended rules
- Prettier integration
- browser, Node, and Jest globals
- underscore-prefixed unused variable exemptions

### React ESLint Flat Config

Create `eslint.config.mjs` in the consuming project:

```js
import reactConfig from '@stackcrafters/ts-build-config/config/react/eslint.config.mjs';

export default [...reactConfig];
```

The React config adds:

- `eslint-plugin-react` flat recommended rules
- `jsx-runtime` support
- `eslint-plugin-react-hooks` recommended rules
- TypeScript and Prettier integration

### Jest Config

Create `jest.config.js` in the consuming project:

```js
const { jest: baseConfig } = require('@stackcrafters/ts-build-config/config');

module.exports = {
  ...baseConfig
};
```

The shared Jest config is aimed at source-first projects and includes:

- `ts-jest` transforms for JavaScript and TypeScript
- `src` as the default test root
- `*.test.ts`, `*.test.tsx`, `*.test.js`, and `*.test.jsx` matching
- `node_modules` and `src` module resolution

## Customizing In A Consumer Project

You can extend the exported config in the consuming repository rather than copying it.

Example ESLint override:

```js
import baseConfig from '@stackcrafters/ts-build-config/config/eslint.config.mjs';

export default [
  ...baseConfig,
  {
    rules: {
      'no-console': 'warn'
    }
  }
];
```

Example Jest override:

```js
const { jest: baseConfig } = require('@stackcrafters/ts-build-config/config');

module.exports = {
  ...baseConfig,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}']
};
```

## Notes

- File paths under `config/` should be treated as part of the package API.
- This package intentionally ships configuration, not compiled runtime code.
- The current Jest preset stays on the Jest 29 ecosystem because `ts-jest` compatibility remains centered on that major line.

## Development

Install dependencies:

```sh
npm install
```

Update dependencies:

```sh
npm run update_deps
```

## Publishing

Publishing is handled by GitHub Actions when a GitHub release is created.

The release workflow:

- uses Node from `.nvmrc`
- runs `npm ci`
- publishes to `https://npm.pkg.github.com`

## Repository Context

Additional maintainer notes live in:

- `AGENTS.md`
- `config/AGENTS.md`
- `config/react/AGENTS.md`
