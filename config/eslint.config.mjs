import tsParser from '@typescript-eslint/parser';
import js from "@eslint/js";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from "globals";

export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },

    rules: {
      'prettier/prettier': 'warn',
      'no-explicit-any': 'off',
      'no-inferrable-types': 'off',
      'no-unused-vars': ['warn', {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }]
    }
  }
];
