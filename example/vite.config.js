import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteMockjs from '../dist';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteMockjs({
            entry: path.resolve('./mock/routes.json'),
            data: path.resolve('./mock/data')
        })
    ],
    server: {
        port: 3001
    }
})