import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Notice the lowercase `v` and `P`
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js', // assuming the test folder is in the root of our project 
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "public", replacement: path.resolve(__dirname, "public") },
    ]
  }
});
