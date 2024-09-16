module.exports = {
  env: {
    es2022: true,
    node: true,
    jest: true
  },
  ignorePatterns: [
    '.server',
    '.public',
    'src/__fixtures__',
    'coverage',
    '*.conf.js'
  ],
  overrides: [
    {
      extends: [
        'standard',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        'prettier'
      ],
      files: ['**/*.js'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        projectService: true,
        tsconfigRootDir: __dirname
      },
      plugins: ['import', 'n', 'promise', 'prettier'],
      rules: {
        'import/extensions': 'off',
        'import/default': 'off',
        'import/namespace': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': 'off',
        'import/no-duplicates': 'off',
        'n/no-extraneous-require': 'off',
        'n/no-extraneous-import': 'off',
        'n/no-missing-require': 'off',
        'n/no-missing-import': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off'
      },
      settings: {
        'import/resolver': {
          node: true,
          typescript: true
        }
      }
    }
  ]
}
