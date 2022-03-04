import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        rewrite: (path) => {
          const _new = path.replace(/^\/api/, '');
          console.log({ _new });
          return _new;
        },
      },
    },
  },
});
