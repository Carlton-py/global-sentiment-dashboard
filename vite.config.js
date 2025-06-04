// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/global-sentiment-dashboard/"
      : "/",
  plugins: [react()],
});

/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 
  process.env.NODE_ENV=== 'production'?"/global-sentiment-dashboard/":"/", 
  //"global-sentiment-dashboard",
  plugins: [react()],
})
*/