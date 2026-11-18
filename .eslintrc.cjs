module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    globals: {
        __APP_VERSION__: "readonly",
    },
    parser: "vue-eslint-parser",
    extends: ["eslint:recommended", "plugin:vue/vue3-essential", "plugin:@typescript-eslint/recommended"],
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "vue/multi-word-component-names": "off",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-inferrable-types": "warn",
    },
};
