/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require("@vue/cli-service");
const { version, displayName, author } = require("./package");

module.exports = defineConfig({
    // GitHub Pages do projeto: https://pedrociarlini.github.io/chordParser/
    publicPath: process.env.NODE_ENV === "production" ? "/chordParser/" : "/",
    transpileDependencies: true,
    lintOnSave: false,
    pages: {
        index: {
            entry: "src/main.ts",
            title: displayName,
            version: version,
            author: author.name,
        },
    },
});
