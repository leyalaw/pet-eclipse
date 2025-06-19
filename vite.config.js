import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// плагины
import createSvgSpritePlugin from "vite-plugin-svg-spriter";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      createSvgSpritePlugin({ svgFolder: "./src/assets/icons" }),
    ],
    server: {
      proxy:
        mode === "development"
          ? {
              "/api": {
                target: env.VITE_API_URL,
                changeOrigin: true,
                secure: false,
              },
            }
          : {},
    },
    resolve: {
      alias: {
        "@": resolve("./src"),
        "@baseComponents": resolve("./src/components/base"),
        "@directives": resolve("./src/directives"),
        "@styles": resolve("./src/styles"),
        "@views": resolve("./src/views"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "sass:map";
          @import "@styles/variables.scss";
        `,
        },
      },
    },
  };
});
