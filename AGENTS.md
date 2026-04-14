# Repository Guide

## Purpose

This repository publishes `@stackcrafters/ts-build-config`, a shared-config package for other Stackcrafters TypeScript projects.

It is not an application and does not contain product source code. The package ships reusable configuration files for:

- TypeScript
- ESLint flat config
- Prettier integration
- Jest
- React-specific TypeScript and ESLint setups

## Published Surface

Treat file paths as part of the public API.

- `package.json` publishes only `config/` plus the manifest itself.
- `config/index.js` is the package `main` entrypoint.
- Consumers may also import files directly from package subpaths such as `config/tsconfig.json` or `config/react/eslint.config.mjs`.

Renaming, moving, or deleting files in `config/` is therefore a breaking change unless all consumers are updated in lockstep.

## Layout

- `config/`: shared base presets for TypeScript, Jest, ESLint, and Prettier
- `config/react/`: React-specific variants layered alongside the base presets
- `.github/workflows/release.yml`: publishes the package to GitHub Packages on release creation
- `.github/dependabot.yml`: dependency update automation for the GitHub npm registry
- `README.md`: consumer-facing installation and usage guidance

See [config/AGENTS.md](config/AGENTS.md) and [config/react/AGENTS.md](config/react/AGENTS.md) for file-level guidance.

## Tooling Notes

- `.nvmrc` pins local development to Node `v24.14.0`.
- `package.json` declares `engines.node` as `^24.14.0`.
- The release workflow reads Node from `.nvmrc`, so local and CI Node versions should stay aligned.
- The only current npm script is `update_deps`, which uses `npm-check-updates` and reinstalls dependencies.

## Dependency Strategy

This package should prefer current stable toolchains, but compatibility matters more than chasing every latest major.

- ESLint is configured using modern flat config patterns.
- TypeScript and the shared TS configs are aimed at bundler-based projects using `moduleResolution: "bundler"`.
- The package now depends on `typescript-eslint` rather than separate direct parser/plugin wiring in config files.
- `globals` is a required direct dependency because the shared ESLint presets import it at runtime.
- The Jest stack intentionally stays on the Jest 29 line because `ts-jest` compatibility is still centered there.

When updating dependencies, check both the latest release and ecosystem compatibility before changing major versions.

## Release Flow

Publishing is release-driven rather than build-driven.

1. A GitHub release is created.
2. The `release.yml` workflow runs on GitHub-hosted Ubuntu.
3. The workflow uses `actions/checkout@v6` and `actions/setup-node@v6`.
4. `setup-node` reads the Node version from `.nvmrc` and enables npm caching.
5. The workflow runs `npm ci`.
6. The workflow publishes to GitHub Packages at `https://npm.pkg.github.com`.

If you change dependencies, package contents, lockfile behavior, or module formats, check whether the release workflow also needs updating.

## Editing Guidance

- Prefer minimal diffs: this repo exists to provide stable shared presets.
- Preserve existing file paths whenever possible.
- Be careful with module-system changes because the package mixes CommonJS (`config/index.js`, `config/jest.config.js`) and ESM (`eslint.config.mjs`) artifacts.
- When adding a new preset, keep it under `config/` so it is included in the published package.
- If you add a file that consumers must import, document the path here and in the nearest scoped `AGENTS.md`.
- Keep `package-lock.json` in sync with `package.json`; the release workflow uses `npm ci`, so stale lockfiles will break publishing.

## Validation

The repo currently has no dedicated `test`, `lint`, or `build` scripts.

When tooling is available, the most useful checks are:

- run `npm install` after dependency changes to refresh `package-lock.json`
- verify config files still parse in their target module system
- validate any changed preset from a small scratch consumer project
- confirm the published file set still matches expectations

Because this package is consumed by other repositories, compatibility matters more than internal implementation style.
