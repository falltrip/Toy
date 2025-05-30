import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  plugins: [
    react(),

  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "/Toy/", // GitHub Pages 배포를 위한 base 경로 설정
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"), // 빌드 결과물이 루트 디렉토리의 dist 폴더에 생성되도록 설정
    assetsDir: "assets", // 정적 자산 디렉토리
    emptyOutDir: true,
  },
});