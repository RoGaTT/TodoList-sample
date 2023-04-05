import { defineConfig } from 'vite';
import reactSWCPlugin from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPathsPlugin from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactSWCPlugin(),
    viteTsconfigPathsPlugin(),
    eslintPlugin({
      extensions: [
        ".ts",
        ".tsx"
      ],
    }),
    // Allows to import svg as react component
    svgrPlugin({
      exportAsDefault: true,
      svgrOptions: {
        icon: false,
      },
      include: '**/*.svg',
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
