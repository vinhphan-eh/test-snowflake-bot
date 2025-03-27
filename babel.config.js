module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-inline-import',
      {
        extensions: ['hero-editor/dist/app.js'],
      },
    ],
    'react-native-reanimated/plugin',
    '@babel/plugin-proposal-unicode-property-regex',
    '@babel/plugin-syntax-import-attributes',
  ],
};
