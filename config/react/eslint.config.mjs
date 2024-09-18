import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from "globals";
import js from "@eslint/js";

reactPlugin.configs.recommended.plugins = { reactPlugin }
reactPlugin.configs.recommended.languageOptions = {
  parserOptions: reactPlugin.configs.recommended.parserOptions
}
delete reactPlugin.configs.recommended.parserOptions

export default [
  // reactPlugin.configs.recommended,
  // reactHooksPlugin.configs.recommended,
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
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
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
      }],
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
      'react/display-name': 'off',
      // 'react/jsx-uses-react': 'off',
      // 'react/react-in-jsx-scope': 'off'
    }
  }
];
