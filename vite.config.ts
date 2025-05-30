import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client", // Vite의 루트를 client 디렉토리로 설정
  plugins: [react()],
  base: "/ToyFactory/", // GitHub Pages 배포 경로
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"), // client/src를 @로 alias 설정
      "@shared": path.resolve(__dirname, "./shared"), // shared 폴더를 @shared로 alias 설정
    },
  },
  build: {
    outDir: "../dist", // client 외부의 dist로 출력
    assetsDir: "assets", // 정적 자산 디렉토리
    emptyOutDir: true, // 빌드 시 outDir 자동 비우기
  },
});
