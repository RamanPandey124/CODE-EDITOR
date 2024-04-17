import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Notice the lowercase `v` and `P`
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "public", replacement: path.resolve(__dirname, "public") },
    ]
  }
});
