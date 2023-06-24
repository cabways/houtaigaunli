import { createApp } from 'vue'
import App from './App.vue'

// elementUI相关
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// SVG图标相关
import 'virtual:svg-icons-register'

// 全局组件
import globalComponent from './components/index.ts'

// 引入scss
import '@/styles/index.scss'

// 引入路由
import router from '@/router/index.ts'

// 引入pinia仓库
import pinia from '@/store/index.ts'

// 路由守卫
import './permisstion.ts'

createApp(App)
  .use(pinia)
  .use(router)
  .use(globalComponent)
  .use(ElementPlus, { locale: zhCn })
  .mount('#app')
