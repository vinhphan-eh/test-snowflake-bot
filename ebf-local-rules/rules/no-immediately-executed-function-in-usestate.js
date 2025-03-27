module.exports = {
  create: function (context) {
    return {
      CallExpression: function (node) {
        if (
          node.callee.name === 'useState' &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'CallExpression'
        ) {
          context.report({
            node: node.arguments[0],
            message:
              'Avoid calling functions that execute immediately directly in useState, use arrow function instead',
          });
        }
      },
    };
  },
};
