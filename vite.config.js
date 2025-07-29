import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import qiankun from 'vite-plugin-qiankun'

import { name as appName } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  // 插件vite-plugin-qiankun在生产模式下依旧不支持publicPath, 需要将vite.config.js中base配置写死。导致多环境部署不便捷。无法像在webpack结合window.INJECTED_PUBLIC_PATH_BY_QIANKUN + publicpath来解决。
  publicPath:`/microapps/${appName}/`,
  base: `/microapps/${appName}`,
  plugins: [
    vue(),
    qiankun(appName, {
      useDevMode: true
    })
  ],
  server: {
    origin: 'http://localhost:5173', // 解决静态资源加载404问题
    host: 'localhost',
    port: 5174
  }
})
