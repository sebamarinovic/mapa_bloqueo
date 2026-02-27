import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mapa_bloqueo/", // <- nombre exacto del repo
});
