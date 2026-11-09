import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["public/js/md5.js", "node_modules/"]
  },
  js.configs.recommended,
  {
    files: ["public/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          "varsIgnorePattern": "^(doLogin|doLogout|readCookie|addColor|searchColor)$"
        }
      ],
      "eqeqeq": "error",
      "no-var": "error",
      "prefer-const": "error"
    }
  }
];
