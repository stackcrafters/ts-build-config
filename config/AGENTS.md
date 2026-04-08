# Config Guide

## Scope

This file covers everything in `config/`, except for the React-specific variants in `config/react/`.

## Files In This Directory

- `index.js`: CommonJS entrypoint; currently exports `jest` from `jest.config.js`
- `tsconfig.json`: base TypeScript config for non-React projects
- `tsconfig.node.json`: referenced Node-oriented TypeScript settings
- `eslint.config.mjs`: flat ESLint config for general TypeScript or JavaScript projects
- `jest.config.js`: shared Jest preset
- `.prettierrc.js`: formatting conventions used for these config files

## Behavioral Intent

### `tsconfig.json`

- Targets `ES2020`
- Uses `moduleResolution: "bundler"`
- Uses `module: "CommonJS"`
- Enables strictness flags and `noEmit`
- Includes `src`
- References `./tsconfig.node.json`

This is a "typecheck-only" style config intended for app repos rather than for emitting library builds.

### `tsconfig.node.json`

- Uses `composite: true`
- Keeps `module: "commonjs"`
- Uses `moduleResolution: "bundler"`

Treat this as supporting config for project references and Node-side tooling.

### `eslint.config.mjs`

- Starts from `@eslint/js` recommended rules
- Adds `eslint-plugin-prettier/recommended`
- Uses `@typescript-eslint/parser`
- Enables browser, node, and jest globals
- Relaxes some unused-variable handling for underscore-prefixed bindings

This file is ESM and uses flat-config export syntax.

### `jest.config.js`

- Starts from `ts-jest/presets`
- Restricts test roots to `src`
- Matches `*.test.ts` and `*.test.js`
- Adds an `esbuild-jest` transform for JS/TS files
- Resolves modules from `node_modules` and `src`

If you change this preset, remember that consumers may rely on these defaults without overriding them locally.

## Editing Guidance

- Keep `index.js` exports backwards compatible unless you intend to change the package's main API.
- Avoid changing filename conventions in this directory; subpath imports are likely in use.
- Keep CommonJS vs ESM boundaries intentional. `index.js` and `jest.config.js` are CommonJS; `eslint.config.mjs` is ESM.
- If a config begins to require extra peer tooling from consumers, document that clearly near the change.
- Prefer adjusting existing presets over adding parallel variants unless the use case is materially different.
