import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "client"), // /client을 루트로 설정
  base: "/Toy/", // GitHub Pages 경로
  publicDir: path.resolve(__dirname, "client/public"), // 절대 경로로 /client/public 지정
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    outDir: "../dist", // 루트의 dist 폴더로 출력
    emptyOutDir: true, // 이전 빌드 파일 제거
    rollupOptions: {
      input: path.resolve(__dirname, "client/index.html"), // 명시적으로 index.html 지정
    },
  },
});
