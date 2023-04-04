import { defineConfig } from 'vite';
import reactSWCPlugin from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactSWCPlugin(),
    eslintPlugin({
      extensions: [
        ".ts",
        ".tsx"
      ],
    }),
    // Allows to import svg as react component
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  css: {
    modules: {
      generateScopedName: '[folder]__[local]___[hash:base64:5]',
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
});
