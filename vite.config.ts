import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // GitHub Pagesのサブディレクトリ対策（重要！）
  base: './', 
  build: {
    rollupOptions: {
      input: {
        // メインページ
        main: resolve(__dirname, 'index.html'),
        // あなたが作成しているゲーム画面
        game: resolve(__dirname, 'secondRPG.html'), 
      },
    },
  },
});
