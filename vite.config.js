import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // or vue/plugin if using Vue

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or your fixed port
    strictPort: true, // optional, ensures this port is used
    allowedHosts: ["brittni-unrespited-dylan.ngrok-free.dev", "localhost"],
  },
});
