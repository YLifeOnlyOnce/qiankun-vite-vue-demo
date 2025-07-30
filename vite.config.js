import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

import { name as appName } from './package.json';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 插件vite-plugin-qiankun在生产模式下依旧不支持publicPath, 需要将vite.config.js中base配置写死。导致多环境部署不便捷。无法像在webpack结合window.INJECTED_PUBLIC_PATH_BY_QIANKUN + publicpath来解决。
  // publicPath: process.env.BASE_URL,
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    base: env.VITE_BASE_URL || '/',
    plugins: [
      vue(),
      qiankun(appName, {
        useDevMode: true
      })
    ],
    server: {
      // origin: `http://localhost:${process.env.VUE_APP_PORT}/${process.env.BASE_URL}`, // 解决静态资源加载404问题
      host: 'localhost',
      port: env.VITE_APP_PORT
    },
  }
})
