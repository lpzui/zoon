// import vue from '@vitejs/plugin-vue'
//
// export default {
//     base: './',
//     plugins: [vue()],
//     optimizeDeps: {
//         include: ['schart.js']
//     }
// }
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server:{
        proxy:{
            //这里是通过请求/api 来转发到 https://api.pingping6.com/
            //假如你要请求https://api.*.com/a/a
            //那么axios的url，可以配置为 /api/a/a
            '/api': 'https://api.*.com/'
        }
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8080/',
        //         changeOrigin: true,
        //         rewrite: path => path.replace(/^\/api/, '')
        //     }
        //}

    }
})
