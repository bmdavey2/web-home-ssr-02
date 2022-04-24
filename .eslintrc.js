module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:wdio/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier', 'wdio'],
  // add your custom rules here
  rules: {
    'vue/require-default-prop': 0,
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-use-before-define': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-named-as-default': 'off',
    'standard/no-callback-literal': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: ['static/*sw.js', 'types/*.d.ts'],
}
