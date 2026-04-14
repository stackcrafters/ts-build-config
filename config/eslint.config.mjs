import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const unusedIgnorePatterns = {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_'
};

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
        ...globals.jest
      }
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    rules: {
      'no-unused-vars': ['warn', unusedIgnorePatterns]
    }
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', unusedIgnorePatterns]
    }
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'warn'
    }
  }
);
