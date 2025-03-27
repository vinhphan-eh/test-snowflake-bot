module.exports = {
  rules: {
    'no-snapshot': require('./rules/no-snapshot'),
    'no-immediately-executed-function-in-usestate': require('./rules/no-immediately-executed-function-in-usestate'),
    'no-direct-config-access': require('./rules/no-direct-config-access'),
    'no-hd-theme-switcher': require('./rules/no-hd-theme-switcher'),
  },
};
