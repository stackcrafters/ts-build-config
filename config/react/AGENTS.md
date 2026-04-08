# React Config Guide

## Scope

This file covers the React-specific presets in `config/react/`.

## Files In This Directory

- `tsconfig.json`: React-oriented TypeScript config
- `tsconfig.node.json`: Node-side settings for React tooling, currently oriented around `vite.config.ts`
- `eslint.config.mjs`: flat ESLint config for React + TypeScript projects

## Behavioral Intent

### `tsconfig.json`

- Targets `ES2020`
- Uses `module: "ESNext"`
- Uses `moduleResolution: "bundler"`
- Enables `jsx: "react-jsx"`
- Keeps `noEmit` and strict compiler settings
- Includes `src`
- References `./tsconfig.node.json`

This preset is designed for modern React apps using the automatic JSX runtime.

### `tsconfig.node.json`

- Uses `module: "ESNext"`
- Uses `moduleResolution: "bundler"`
- Includes `vite.config.ts`

That inclusion is a strong hint that this preset expects Vite-style tooling unless deliberately broadened.

### `eslint.config.mjs`

- Uses `FlatCompat` to bridge classic shareable configs into flat config
- Extends `plugin:react/recommended`
- Extends `plugin:@typescript-eslint/recommended`
- Extends `plugin:prettier/recommended`
- Adds `react-hooks` rules through `fixupPluginRules`
- Disables legacy React rules that are unnecessary with the modern JSX transform

The preset assumes JSX, React version auto-detection, and TypeScript parsing.

## Editing Guidance

- Preserve compatibility with modern React ESM toolchains unless there is an explicit reason to support a different target.
- Be careful when changing hook or TypeScript rules; these changes can create broad lint churn in consumer repos.
- If you expand beyond Vite-oriented Node tooling, update both the config and this documentation so future agents know the intended consumer shape.
- Keep the React preset conceptually separate from the base `config/` presets. If a rule should apply to all projects, move it up rather than duplicating it here.
