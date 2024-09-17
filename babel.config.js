module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.json'],
      alias: {
        '@': './src',
      },
    },
  ],
  'react-native-reanimated/plugin'],
};
