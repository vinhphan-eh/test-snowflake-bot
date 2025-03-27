module.exports = {
  overrides: [
    {
      files: ['src/**/*.{js,ts,jsx,tsx}', 'e2e/**/*.{js,ts,jsx,tsx}', 'test-setup/**/*.{js,ts,jsx,tsx}'],
      plugins: ['@eslint-react/eslint-plugin', 'import', 'sort-destructure-keys', '@hero-design', 'ebf-local-rules'],
      extends: [
        'airbnb', // Uses the recommended rules from eslint-config-airbnb
        'airbnb/hooks', // Uses the recommended rules from eslint-config-airbnb
        'airbnb-typescript', // Uses the recommended rules from eslint-config-airbnb-typescript
        'eslint:recommended', // Uses the recommended rules from eslint
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'prettier', // Uses the recommended rules from eslint-config-prettier
        'prettier/prettier', // Uses the recommended rules from eslint-config-prettier
        'plugin:prettier/recommended', // Uses the recommended rules from eslint-config-prettier
        'plugin:react-hooks/recommended', // Uses the recommended rules from eslint-plugin-react-hooks
        'plugin:import/recommended', // Uses the recommended rules from eslint-plugin-import
        'plugin:import/typescript', // Uses the recommended rules from eslint-plugin-import
        'plugin:@hero-design/recommendedRn',
      ],
      env: {
        node: true,
        browser: true,
        jest: true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@eslint-react/no-leaked-conditional-rendering': 'error',
        'prettier/prettier': 'error',
        // Turn off because conflict with requiring source for Image
        'global-require': 'off',
        // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        'no-prototype-builtins': 'off',
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        'import/prefer-default-export': 'off',
        // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': 'off',
        // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
        'react/jsx-filename-extension': 'off',
        // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
        '@typescript-eslint/explicit-function-return-type': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.md
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        // It's not accurate in the monorepo style
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        eqeqeq: ['error', 'always'],
        'object-shorthand': ['warn', 'always'],
        'import/no-cycle': 'error',
        'import/no-unresolved': 'error',
        'import/no-duplicates': ['error', { considerQueryString: true }],
        'import/no-self-import': 'error',
        'import/newline-after-import': ['error', { count: 1 }],
        'react/display-name': 'off',
        'import/order': [
          'warn',
          {
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
            pathGroups: [
              {
                pattern: 'react+(|-native)',
                group: 'external',
                position: 'before',
              },
              {
                pattern: 'styled-components',
                group: 'external',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            warnOnUnassignedImports: true,
          },
        ],
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/require-default-props': 'off',
        'func-names': 'off',
        'react/jsx-props-no-spreading': [
          1,
          {
            custom: 'ignore',
          },
        ],
        '@typescript-eslint/ban-ts-comment': 'error',
        'consistent-return': 'warn',
        'react/jsx-no-useless-fragment': 'warn',
        'class-methods-use-this': 'warn',
        'react/prop-types': [2, { ignore: ['children'] }],
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        curly: [2, 'all'],
        'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: false }],
        'prefer-destructuring': [
          'error',
          {
            array: true,
            object: true,
          },
          {
            enforceForRenamedProperties: false,
          },
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
        'react/no-unstable-nested-components': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        // https://typescript-eslint.io/rules/prefer-enum-initializers/
        '@typescript-eslint/prefer-enum-initializers': 'error',
        'ebf-local-rules/no-snapshot': 'error',
        'ebf-local-rules/no-direct-config-access': 'error',
        'ebf-local-rules/no-immediately-executed-function-in-usestate': 'error',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'react-native',
                importNames: ['SafeAreaView'],
                message: 'Please use CustomStatusBar instead',
              },
              {
                name: 'react-native-safe-area-context',
                importNames: ['SafeAreaView'],
                message: 'Please use CustomStatusBar instead',
              },
              {
                name: 'react-intl',
                message: 'Please import Intl from LocalisationProvider instead',
              },
            ],
          },
        ],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          },
        },
      },
    },
    {
      files: ['./**/*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        schema: './src/graphql/schema.json',
        operations: ['./src/**/graphql-documents/**/*.graphql'],
      },
      plugins: ['@graphql-eslint'],
      // Extend the recommended rules from the https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/configs/operations-recommended.ts
      // Except disable the @graphql-eslint/no-unused-fragments and@graphql-eslint/require-id-when-available
      // Because of unresolved error: Rule `no-unused-fragments` requires `parserOptions.operations` to be set and loaded
      rules: {
        '@graphql-eslint/executable-definitions': 'error',
        '@graphql-eslint/fields-on-correct-type': 'error',
        '@graphql-eslint/fragments-on-composite-type': 'error',
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/known-directives': 'error',
        '@graphql-eslint/known-fragment-names': 'error',
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/lone-anonymous-operation': 'error',
        '@graphql-eslint/naming-convention': [
          'error',
          {
            VariableDefinition: 'camelCase',
            OperationDefinition: {
              style: 'PascalCase',
              forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
              forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
            },
            FragmentDefinition: {
              style: 'PascalCase',
              forbiddenPrefixes: ['Fragment'],
              forbiddenSuffixes: ['Fragment'],
            },
          },
        ],
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/no-deprecated': 'error',
        '@graphql-eslint/no-duplicate-fields': 'error',
        '@graphql-eslint/no-fragment-cycles': 'error',
        '@graphql-eslint/no-undefined-variables': 'error',
        // '@graphql-eslint/no-unused-fragments': 'error',
        '@graphql-eslint/no-unused-variables': 'error',
        '@graphql-eslint/one-field-subscriptions': 'error',
        '@graphql-eslint/overlapping-fields-can-be-merged': 'error',
        '@graphql-eslint/possible-fragment-spread': 'error',
        '@graphql-eslint/provided-required-arguments': 'error',
        // '@graphql-eslint/require-id-when-available': 'error',
        '@graphql-eslint/scalar-leafs': 'error',
        '@graphql-eslint/selection-set-depth': ['error', { maxDepth: 7 }],
        '@graphql-eslint/unique-argument-names': 'error',
        '@graphql-eslint/unique-directive-names-per-location': 'error',
        '@graphql-eslint/unique-input-field-names': 'error',
        '@graphql-eslint/unique-variable-names': 'error',
        '@graphql-eslint/value-literals-of-correct-type': 'error',
        '@graphql-eslint/variables-are-input-types': 'error',
        '@graphql-eslint/variables-in-allowed-position': 'error',
      },
    },
    {
      files: ['./src/new-graphql/mocks/generated-mocks.ts'],
      plugins: ['unused-imports'],
      rules: {
        'unused-imports/no-unused-imports': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/prefer-optional-chain': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
  ],
};
