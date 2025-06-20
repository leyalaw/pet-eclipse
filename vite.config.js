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
        "@assets": resolve("./src/assets"),
        "@baseComponents": resolve("./src/components/base"),
        "@buttonTemplates": resolve("./src/components/templates/buttons"),
        "@directives": resolve("./src/directives"),
        "@helpers": resolve("./src/helpers"),
        "@layouts": resolve("./src/layouts"),
        "@sectionTemplates": resolve("./src/components/templates/sections"),
        "@styles": resolve("./src/styles"),
        "@transitions": resolve("./src/components/base/transitions"),
        "@views": resolve("./src/views"),
        "@viewStyles": resolve("./src/styles/views"),
        "@ui": resolve("./src/components/ui"),
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
