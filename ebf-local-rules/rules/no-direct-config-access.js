module.exports = {
  meta: {
    type: 'problem', // Define as a problem or warning
    docs: {
      description: 'Disallow direct access to `Config` properties',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      noDirectAccess: 'Do not access `Config.{{property}}` directly. Use getEnvConfig() instead.',
    },
    schema: [], // No options required
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.object.name === 'Config' && // Check if accessing `Config`
          node.property.type === 'Identifier' // Ensure the property is an identifier (e.g., `Config.DEV`)
        ) {
          context.report({
            node,
            messageId: 'noDirectAccess',
            data: {
              property: node.property.name,
            },
          });
        }
      },
    };
  },
};
