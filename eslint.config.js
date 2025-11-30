// eslint.config.js
const expoConfig = require("eslint-config-expo/flat");
const { defineConfig } = require("eslint/config");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const pluginQuery = require("@tanstack/eslint-plugin-query");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
  },

  ...pluginQuery.configs["flat/recommended"],
  { rules: { "import/namespace": ["error", { allowComputed: true }] } },
  // your other config
]);
