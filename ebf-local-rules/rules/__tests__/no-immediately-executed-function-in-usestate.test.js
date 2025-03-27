/* eslint-env es6 */
const { RuleTester } = require('eslint');

const rule = require('../no-immediately-executed-function-in-usestate');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

function error() {
  return [
    {
      type: 'CallExpression',
      message: 'Avoid calling functions that execute immediately directly in useState, use arrow function instead',
    },
  ];
}

ruleTester.run('restrict-function-in-usestate', rule, {
  valid: [
    {
      code: 'useState(() => getValue());',
    },
    {
      code: 'useState(getValue);',
    },
  ],
  invalid: [
    {
      code: 'useState(getValue());',
      errors: error(),
    },
  ],
});
