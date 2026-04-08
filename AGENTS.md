# Repository Guide

## Purpose

This repository publishes `@stackcrafters/ts-build-config`, a small shared-config package for other Stackcrafters projects.

It is not an application and does not contain product source code. The package primarily ships reusable configuration files for:

- TypeScript
- ESLint
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

See [config/AGENTS.md](config/AGENTS.md) and [config/react/AGENTS.md](config/react/AGENTS.md) for file-level guidance.

## Tooling Notes

- `.nvmrc` pins local development to Node `v22`.
- The GitHub release workflow publishes with Node `20.x`.
- Keep changes compatible with both unless the repo intentionally aligns these versions.
- The only current npm script is `update_deps`, which uses `npm-check-updates` and reinstalls dependencies.

## Release Flow

Publishing is release-driven rather than build-driven.

1. A GitHub release is created.
2. The `release.yml` workflow runs on GitHub-hosted Ubuntu.
3. The workflow runs `npm ci`.
4. The workflow publishes to GitHub Packages at `https://npm.pkg.github.com`.

If you change dependencies, package contents, or module formats, check whether the release workflow also needs updating.

## Editing Guidance

- Prefer minimal diffs: this repo exists to provide stable shared presets.
- Preserve existing file paths whenever possible.
- Be careful with module-system changes because the package mixes CommonJS (`config/index.js`, `config/jest.config.js`) and ESM (`eslint.config.mjs`) artifacts.
- When adding a new preset, keep it under `config/` so it is included in the published package.
- If you add a file that consumers must import, document the path here and in the nearest scoped `AGENTS.md`.

## Validation

The repo currently has no dedicated `test`, `lint`, or `build` scripts.

When tooling is available, the most useful checks are:

- verify config files still parse in their target module system
- validate any changed preset from a small scratch consumer project
- confirm the published file set still matches expectations

Because this package is consumed by other repositories, compatibility matters more than internal implementation style.
