import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            plugins: process.env.NODE_ENV !== 'production' ? [[
                '@swc/plugin-styled-components', {
                    'displayName': true,
                    'ssr': false
                }
            ]]: [],
        }),
        svgr(),
    ],
    build: {
        sourcemap: true,
    }
});
