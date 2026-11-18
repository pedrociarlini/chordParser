import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import pkg from "./package.json";

export default defineConfig(({ command }) => ({
    // GitHub Pages do projeto: https://pedrociarlini.github.io/chordParser/
    base: command === "build" ? "/chordParser/" : "/",
    plugins: [
        vue(),
        {
            // Preenche título/versão/autor no index.html a partir do package.json
            name: "html-package-info",
            transformIndexHtml: (html) =>
                html
                    .replace(/%APP_TITLE%/g, pkg.displayName)
                    .replace(/%APP_VERSION%/g, pkg.version)
                    .replace(/%APP_AUTHOR%/g, pkg.author.name),
        },
    ],
    resolve: {
        alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    define: {
        // Versão do package.json acessível ao Vue
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
}));
