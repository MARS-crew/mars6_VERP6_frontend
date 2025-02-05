import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    css: {
      postcss: "./postcss.config.cjs",
    },
    server: {
      proxy: {
        '/api': {
          // target: env.VITE_API_URL,
          target: 'http://mars-crew.shop:26080',
          changeOrigin: true,
          secure: false,
          ws: true,
          credentials: 'include'
        }
      }
    },
  }
});
