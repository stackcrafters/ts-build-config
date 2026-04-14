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
- Uses `module: "ESNext"`
- Enables strictness flags and `noEmit`
- Includes `src`
- References `./tsconfig.node.json`

This is a typecheck-oriented config for modern bundler-based app projects rather than for emitting library builds.

### `tsconfig.node.json`

- Uses `composite: true`
- Uses `module: "ESNext"`
- Uses `moduleResolution: "bundler"`

Treat this as supporting config for project references and Node-side tooling used by bundler-based projects.

### `eslint.config.mjs`

- Uses `defineConfig` from `eslint/config`
- Starts from `@eslint/js` recommended rules
- Adds `typescript-eslint` recommended rules
- Adds `eslint-plugin-prettier/recommended`
- Imports globals from the `globals` package
- Enables browser, Node built-in, and Jest globals
- Relaxes unused-variable handling for underscore-prefixed bindings

This file is ESM and uses flat-config export syntax throughout.

### `jest.config.js`

- Uses `createJsWithTsPreset()` from `ts-jest`
- Restricts test roots to `src`
- Matches `*.test.ts`, `*.test.tsx`, `*.test.js`, and `*.test.jsx`
- Resolves modules from `node_modules` and `src`

The shared preset no longer depends on `esbuild-jest`. Keep it compatible with the stable `ts-jest` + Jest 29 ecosystem unless that compatibility picture changes.

## Editing Guidance

- Keep `index.js` exports backwards compatible unless you intend to change the package's main API.
- Avoid changing filename conventions in this directory; subpath imports are likely in use.
- Keep CommonJS vs ESM boundaries intentional. `index.js` and `jest.config.js` are CommonJS; `eslint.config.mjs` is ESM.
- If a config begins to require extra runtime dependencies from consumers, document that clearly near the change.
- Prefer adjusting existing presets over adding parallel variants unless the use case is materially different.
- If you change lint config composition, prefer official flat-config exports over legacy compatibility wrappers when the upstream package supports them.
