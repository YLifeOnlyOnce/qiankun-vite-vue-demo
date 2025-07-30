import { createApp } from "vue";
import { routes } from "./router/index.js";
import { createWebHistory, createRouter } from 'vue-router'
import App from "./App.vue";

import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/dist/helper";

const initQianKun = () => {
  renderWithQiankun({
    // 当前应用在主应用中的生命周期
    // 文档 https://qiankun.umijs.org/zh/guide/getting-started#
    mount(props) {
      console.log("mount", props);
      render(props.container, props.name);
      //  可以通过props读取主应用的参数：msg
    },
    bootstrap() {
      console.log("🚀 ~ bootstrap ~ bootstrap:");
    },
    unmount() {
      console.log("unmount");
    },
  });
};

/**
 * 渲染函数, 区分微前端和独立应用
 * @param {HTMLElement} container 容器
 * @param {string} name 应用名称
 */
const render = (container, name) => {
  // 在微前端框架下，路由的base需要设置为 /{name}，也可以由主应用动态配置，目前按照该规则静态配置
  const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? `/${name}` : '/';
  const router = createRouter({
    history: createWebHistory(base), // 由于qiankun基于路由，不能使用 createMemoryHistory();
    routes,
  })

  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  const appDom = container ? container.querySelector("#app") : "#app";
  createApp(App).use(router).mount(appDom);
};

// 判断当前应用是否在微应用架构中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render();
