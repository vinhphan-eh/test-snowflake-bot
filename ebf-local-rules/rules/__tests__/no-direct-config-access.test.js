import { RuleTester } from 'eslint';
import rule from '../no-direct-config-access';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020, // Set the appropriate ECMAScript version
    sourceType: 'module',
  },
});

ruleTester.run('no-direct-config-access', rule, {
  valid: [
    {
      code: "const env = getEnv('DEV');", // Allowed: using abstraction
    },
    {
      code: "console.log('This is valid');", // Allowed: no Config access
    },
    {
      code: 'const value = otherObject.property;', // Allowed: not accessing Config
    },
  ],

  invalid: [
    {
      code: 'const env = Config.DEV;', // Not allowed: direct access
      errors: [
        {
          message: 'Do not access `Config.DEV` directly. Use getEnvConfig() instead.',
        },
      ],
    },
    {
      code: "if (Config.PROD) { console.log('Production'); }", // Not allowed: direct access
      errors: [
        {
          message: 'Do not access `Config.PROD` directly. Use getEnvConfig() instead.',
        },
      ],
    },
  ],
});
