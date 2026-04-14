import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const reactFiles = ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'];
const unusedIgnorePatterns = {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_'
};

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: reactFiles,
    ...reactPlugin.configs.flat.recommended
  },
  {
    files: reactFiles,
    ...reactPlugin.configs.flat['jsx-runtime']
  },
  reactHooks.configs.recommended,
  {
    files: reactFiles,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
        ...globals.jest
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', unusedIgnorePatterns],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true
        }
      ],
      'react/display-name': 'off',
      'react/prop-types': 'off'
    }
  },
  eslintPluginPrettierRecommended,
  {
    files: reactFiles,
    rules: {
      'prettier/prettier': 'warn'
    }
  }
);
