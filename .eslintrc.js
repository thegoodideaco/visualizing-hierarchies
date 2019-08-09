module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
    browser: true
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "new-cap": "warn",
    "vue/return-in-computed-property": "off",
    "vue/no-side-effects-in-computed-properties": "off",
    "func-call-spacing": 2,
    "no-multi-spaces": [
      "error",
      {
        exceptions: {
          Property: true,
          ImportDeclaration: true,
          VariableDeclarator: true
        }
      }
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never"
      }
    ],
    "no-mixed-spaces-and-tabs": "error",
    "key-spacing": [
      "error",
      {
        singleLine: {
          beforeColon: false,
          afterColon: true
        },
        multiLine: {
          beforeColon: false,
          afterColon: true
        },
        align: {
          beforeColon: false,
          afterColon: true,
          on: "value"
        }
      }
    ],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    "no-tabs": 0,
    "space-before-function-paren": 0,
    "space-in-parens": 0,
    "arrow-parens": 0,
    "valid-jsdoc": [
      0,
      {
        requireReturn: false,
        requireReturnType: false
      }
    ],
    "comma-dangle": ["error", "never"],
    "generator-star-spacing": 0,
    indent: ["error", 2],
    quotes: ["error", "single"],
    "quote-props": ["error", "as-needed"],
    eqeqeq: [
      "error",
      "always",
      {
        null: "ignore"
      }
    ],
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],
    "no-inner-declarations": ["error", "both"],
    "no-var": "error",
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false
      }
    ],
    "no-func-assign": "error",
    semi: ["error", "never"],
    "no-trailing-spaces": [
      2,
      {
        skipBlankLines: false
      }
    ],
    "vue/attributes-order": "error",
    "vue/no-confusing-v-for-v-if": "error",
    "vue/no-v-html": 0,
    "vue/order-in-components": "error",
    "vue/this-in-template": "error",
    "vue/array-bracket-spacing": "error",
    "vue/arrow-spacing": "error",
    "vue/block-spacing": "error",
    "vue/brace-style": "error",
    "vue/comma-dangle": "error",
    "vue/eqeqeq": "error",
    "vue/key-spacing": "error",
    "vue/match-component-file-name": "error",
    "vue/require-default-prop": "off"
  },

  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  },

  extends: [
    "plugin:vue/strongly-recommended",
    "plugin:vue/essential",
    "@vue/standard"
  ]
};
