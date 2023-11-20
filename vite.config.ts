import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import makeManifest from "./utils/plugins/make-manifest";
import customDynamicImport from "./utils/plugins/custom-dynamic-import";
import addHmr from "./utils/plugins/add-hmr";
import watchRebuild from "./utils/plugins/watch-rebuild";
import manifest from "./manifest";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import hotReloadExtension from "hot-reload-extension-vite";

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, "src");
const pagesDir = resolve(srcDir, "pages");
const assetsDir = resolve(srcDir, "assets");
const outDir = resolve(rootDir, "dist");
const publicDir = resolve(rootDir, "public");

const isDev = process.env.__DEV__ === "true";
const isProduction = !isDev;

// ENABLE HMR IN BACKGROUND SCRIPT
const enableHmrInBackgroundScript = true;

export default defineConfig({
  resolve: {
    alias: {
      "@root": rootDir,
      "@src": srcDir,
      "@assets": assetsDir,
      "@pages": pagesDir,
    },
  },
  plugins: [
    react(),
    makeManifest(manifest, {
      isDev,
      contentScriptCssKey: regenerateCacheInvalidationKey(),
    }),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true }),
    watchRebuild(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: "dist/src/pages/background/index.js", // relative path to background script file
    }),
  ],
  publicDir,
  build: {
    outDir,
    /** Can slowDown build speed. */
    // sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: {
        devtools: resolve(pagesDir, "devtools", "index.html"),
        panel: resolve(pagesDir, "panel", "index.html"),
        content: resolve(pagesDir, "content", "index.ts"),
        inpage: resolve(pagesDir, "inpage", "index.ts"),
        background: resolve(pagesDir, "background", "index.ts"),
        contentStyle: resolve(pagesDir, "content", "style.scss"),
        popup: resolve(pagesDir, "popup", "index.html"),
        newtab: resolve(pagesDir, "newtab", "index.html"),
        options: resolve(pagesDir, "options", "index.html"),
        worker: resolve(pagesDir, "workers", "index.ts"),
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev
          ? "assets/js/[name].js"
          : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path.parse(assetInfo.name);
          const assetFolder = dir.split("/").at(-1);
          const name = assetFolder + firstUpperCase(_name);
          if (name === "contentStyle") {
            return `assets/css/contentStyle${cacheInvalidationKey}.chunk.css`;
          }
          return `assets/[ext]/${name}.chunk.[ext]`;
        },
        // footer: `
        //   for (const key of Object.keys(globalThis.moduleName)) {
        //     globalThis[key] = globalThis.moduleName[key]
        //   }`
      },
    },
  },
});

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}

let cacheInvalidationKey: string = generateKey();
function regenerateCacheInvalidationKey() {
  cacheInvalidationKey = generateKey();
  return cacheInvalidationKey;
}

function generateKey(): string {
  return `${(Date.now() / 100).toFixed()}`;
}
