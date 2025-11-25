module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
          },
          extensions: [".js", ".json"],
          root: ["./src"],
        },
      ],
      "@babel/plugin-transform-export-namespace-from",
      "react-native-worklets/plugin",
    ],
  };
};
