const { RuleTester } = require('eslint');
import rule from '../no-hd-theme-switcher';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015, // or another appropriate version
    sourceType: 'module',
  },
});

ruleTester.run('no-hd-theme-switcher', rule, {
  valid: [
    {
      code: "import { Button } from '@hero-design/rn';",
    },
    {
      code: "import ThemeSwitcher from './local-theme-switcher';",
    },
    {
      code: 'const ThemeSwitcher = () => {};',
    },
    {
      code: "import * as someModule from '@hero-design/rn'; const x = someModule.Button;",
    },
  ],
  invalid: [
    {
      code: "import { ThemeSwitcher } from '@hero-design/rn';",
      errors: [{ message: 'Please use ThemeSwitcher from /utils/ThemeSwitcher' }],
    },
    {
      code: "import { ThemeSwitcher, Button } from '@hero-design/rn';",
      errors: [{ message: 'Please use ThemeSwitcher from /utils/ThemeSwitcher' }],
    },
    {
      code: "import * as HeroDesign from '@hero-design/rn'; const x = HeroDesign.ThemeSwitcher",
      errors: [{ message: 'Please use ThemeSwitcher from /utils/ThemeSwitcher' }],
    },
    {
      code: "import { ThemeSwitcher as HDThemeSwitcher } from '@hero-design/rn';",
      errors: [{ message: 'Please use ThemeSwitcher from /utils/ThemeSwitcher' }],
    },
  ],
});
