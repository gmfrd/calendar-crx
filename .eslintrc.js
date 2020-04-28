module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
  },
  "extends": [
    "plugin:vue/recommended",
    "google",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "plugins": [
    "vue",
    "html",
  ],
  "rules": {
    'max-len': ["error",
      {
        "code": 2000000000,
        "ignoreStrings": true,
        "ignoreComments": true,
      },
    ],
    "vue/max-attributes-per-line": [2, {
      "singleline": 20,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline":"off",
    "vue/require-default-prop":"off",
    "vue/no-v-html": "off",
    "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": false,
          "MethodDefinition": false,
          "ClassDeclaration": false,
          "ArrowFunctionExpression": false,
          "FunctionExpression": false
      }
    }],
  }
};
