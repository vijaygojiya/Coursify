// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
import pluginQuery from "@tanstack/eslint-plugin-query";

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    plugins: {
      "@tanstack/query": pluginQuery,
    },
  },
]);
