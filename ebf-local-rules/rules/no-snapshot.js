/* eslint-env es6 */
const isSnapshot = name => {
  return [
    'toMatchSnapshot',
    'toMatchInlineSnapshot',
    'toThrowErrorMatchingSnapshot',
    'toThrowErrorMatchingInlineSnapshot',
  ].some(method => method === name);
};

module.exports = {
  create(context) {
    return {
      CallExpression({ callee: { property } }) {
        if (property && property.name && isSnapshot(property.name)) {
          context.report({
            message: 'Do not use {{method}} or related methods that generate jest snapshots.',
            node: property,
            data: { method: property.name },
          });
        }
      },
    };
  },
};
