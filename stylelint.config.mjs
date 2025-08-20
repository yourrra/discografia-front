/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-idiomatic-order',
    'stylelint-config-standard-scss',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': null,
  },
}
