// eslint-plugin-no-hero-theme-switcher.js

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow importing ThemeSwitcher from @hero-design/rn',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === '@hero-design/rn') {
          for (const specifier of node.specifiers) {
            if (
              (specifier.imported && specifier.imported.name === 'ThemeSwitcher') ||
              (specifier.local &&
                specifier.local.name === 'HDThemeSwitcher' &&
                specifier.imported &&
                specifier.imported.name === 'ThemeSwitcher')
            ) {
              context.report({
                node: specifier,
                message: 'Please use ThemeSwitcher from /utils/ThemeSwitcher',
              });
            }
          }
        }
      },
      ImportSpecifier(node) {
        if (node.imported && node.imported.name === 'ThemeSwitcher') {
          const importDeclaration = node.parent.parent;
          if (importDeclaration && importDeclaration.source && importDeclaration.source.value === '@hero-design/rn') {
            context.report({
              node: node,
              message: 'Please use ThemeSwitcher from /utils/ThemeSwitcher',
            });
          }
        }
      },
      MemberExpression(node) {
        if (
          node.object.type === 'Identifier' &&
          node.property.type === 'Identifier' &&
          node.property.name === 'ThemeSwitcher'
        ) {
          const scope = context.getScope();
          const variable = scope.variables.find(v => v.name === node.object.name);
          if (
            variable &&
            variable.defs &&
            variable.defs[0] &&
            variable.defs[0].node &&
            variable.defs[0].node.type === 'ImportNamespaceSpecifier'
          ) {
            if (
              variable.defs[0].node.parent &&
              variable.defs[0].node.parent.source &&
              variable.defs[0].node.parent.source.value === '@hero-design/rn'
            ) {
              context.report({
                node: node,
                message: 'Please use ThemeSwitcher from /utils/ThemeSwitcher',
              });
            }
          }
        }
      },
    };
  },
};
