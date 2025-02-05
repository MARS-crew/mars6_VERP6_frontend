import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://mars-crew.shop:26080',
        changeOrigin: true,
        secure: false,
        ws: true,
        credentials: 'include'
      }
    }
  },
});
