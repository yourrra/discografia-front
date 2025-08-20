import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  reactX.configs['recommended-typescript'],
  reactDom.configs.recommended,
  reactRefresh.configs.vite,

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['dist', 'node_modules', 'eslint.config.js', '**/*.config.js', 'stylelint.config.mjs'],
    languageOptions: {
      parser: tseslint.parser,

      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier,
      import: importPlugin,
      // react: pluginReact,
      // 'react-x': reactX,
      // 'react-dom': reactDom,
    },
    settings: {
      react: {
        version: '19.1.1',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // React + TS
      'react/self-closing-comp': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Prettier
      'prettier/prettier': 'error',

      // Дополнительно (поддержка современного React + TS)
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      // Импорты
      'arrow-body-style': ['error', 'as-needed'],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**/**',
              group: 'parent',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  prettierConfig,
])
