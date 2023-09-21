module.exports = {
  extends: [
    /**
     * The base for this config is alloy
     */
    "alloy",
    "alloy/react",
    "alloy/typescript",
    /**
     * Bring in @typescript-eslint rules and react rules for TS checking
     */
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    /**
     * and some utility plugins with extra rules
     */
    "adjunct", // several useful rules
    "plugin:compat/recommended", // browser compatibility
    "plugin:jsx-a11y/recommended", // a11y for react elements
    "plugin:listeners/strict", // strict event listeners
    "plugin:prettier/recommended", // disable any pure style rules (of which there should be none)
    "plugin:ssr-friendly/recommended", // no window access
    "plugin:styled-components-a11y/recommended", // a11y for styled components
  ],
  plugins: [
    "@typescript-eslint",
    "compat",
    "function-component-export",
    "jsx-a11y",
    "listeners",
    "prettier",
    "react",
    "react-hooks",
    "sort-styled-components",
    "ssr-friendly",
    "styled-components-a11y",
    "import",
  ],
  env: {
    browser: true,
  },
  rules: {
    /**
     *  Mandatory Rules
     */

    // sort styled components based on their usage order
    "sort-styled-components/sort-styled-components": "warn",

    // any custom hooks that take dependencies need to be specified here
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: `
            useAnimation 
        |   useDeepCompareEffect
        |   useDeepCompareMemo
        |   useDeepCompareLayoutEffect
        `.replaceAll(/\s/g, ""),
      },
    ],

    // encourage shorter files
    "max-lines": [
      "warn",
      {
        max: 400,
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    // disallow import cycling
    "import/no-cycle": "error",
    // disallow imports in body of file
    "import/first": "error",
    // always include a newline after imports
    "import/newline-after-import": "error",
    // no duplicate imports
    "import/no-duplicates": "error",

    // ban bad types
    "@typescript-eslint/no-explicit-any": "error",

    // disallow shadowing variable names
    "@typescript-eslint/no-shadow": "error",

    // consistent export style
    "function-component-export/ban-FC": "error",
    "function-component-export/combine-default-export": "error",

    // prefer more concise syntaxes
    "react/jsx-boolean-value": ["error", "never"],
    "object-shorthand": ["error", "always"],
    "prefer-template": "error",

    // allow warn, error, and info in console
    // leave this disabled locally, but enable it in CI
    "no-console": process.env.CI
      ? ["error", { allow: ["error", "warn", "info"] }]
      : "off",

    // disable rules that typescript fully handles on its own
    "react/jsx-props-no-spreading": "off",
    "react/no-unknown-property": "off",
    "no-undef": "off",
    "unicorn/no-array-callback-reference": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "unicorn/no-useless-undefined": ["error", { checkArguments: false }],

    // this rule prevents us from type checking elements
    "xss/no-mixed-html": "off",

    // disable secrets and PII rules (they don't really apply to us)
    "no-secrets/no-secrets": "off",
    "pii/no-phone-number": "off",
    "pii/no-email": "off",
    "pii/no-ip": "off",

    // allow unused args with underscores
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    /**
     *  Optional or Temporary Rules
     */

    // These rules conflict with Radix UI
    "styled-components-a11y/iframe-has-title": "off",
    "styled-components-a11y/html-has-lang": "off",

    // we can remove this once TS 5.1 drops
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],

    // we need more time for top-level await to be supported in browsers
    "unicorn/prefer-top-level-await": "off",

    // the following rules seem annoying, so I've loosened them up (that way they can at least stay on)
    // the goal should probably be to decrease these over time
    complexity: ["warn", 40],
    "sonarjs/cognitive-complexity": ["warn", 40],
    "max-params": ["warn", 6],

    // similar story with these, but I've entirely disabled them
    "no-nested-ternary": "warn",
    "consistent-return": "off",
    "const-case/uppercase": "off",
    "eslint-comments/disable-enable-pair": "off",
    "scanjs-rules/identifier_localStorage": "off",
    "scanjs-rules/assign_to_src": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
  },
  parserOptions: {
    project: true,
    // we also lint json files
    extraFileExtensions: [".json"],
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
    react: {
      version: "detect",
    },
  },
  // ignore json files in the root directory
  ignorePatterns: ["/*.json"],
};
