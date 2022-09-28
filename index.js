module.exports = {
  plugins: [
    "@rjwadley/format-gsap",
    "ssr-friendly",
    "sort-styled-components",
    "styled-components-a11y",
    "function-component-export",
  ],
  extends: [
    "plugin:ssr-friendly/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:styled-components-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    /**
     *  Mandatory Rules
     */

    // our format style for gsap
    "@rjwadley/format-gsap/compact-functions": "error",

    // sort styled components
    "sort-styled-components/sort-styled-components": "warn",
    // complementary rule to sort styled components
    "no-multiple-empty-lines": "warn",

    // prettier will conflict with gsap formatter
    "prettier/prettier": "off",

    // we define styled components at the bottom, which is better for readability but incompatible with this rule
    "@typescript-eslint/no-use-before-define": "off",

    // any custom hooks that take dependecies need to be specified here
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "useAnimation",
      },
    ],

    // use inline default props instead of defaultProps
    "react/require-default-props": [
      "error",
      {
        functions: "defaultArguments",
      },
    ],

    // import order
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // max lines per file of 200
    "max-lines": [
      "warn",
      {
        max: 200,
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    // ban bad types
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-types": "error",

    // export style
    "function-component-export/ban-FC": "error",
    "function-component-export/combine-default-export": "error",

    /**
     *  Temporary Rules
     */
    // i just know everyone would cry about these lmao
    "consistent-return": "off",
    "no-nested-ternary": "warn",
  },
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },

  // ignore the public folder
  ignorePatterns: "public/*",
};
