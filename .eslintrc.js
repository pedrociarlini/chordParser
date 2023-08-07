module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: "vue-eslint-parser",
    extends: [
        "eslint:recommended",
        "plugin:vue/base",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaFeatures: { legacyDecorators: true },
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "vue/multi-word-component-names": "off",
        "no-loss-of-precision": "off",
        "no-nonoctal-decimal-escape": "off",
        "no-unsafe-optional-chaining": "off",
        "no-useless-backreference": "off",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-inferrable-types": "warn",
    },
};
