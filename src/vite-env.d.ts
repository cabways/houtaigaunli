/// <reference types="vite/client" />
// 让ts识别vue后缀文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<
    NonNullable<unknown>,
    NonNullable<unknown>,
    any
  >
  export default component
}

declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'element-plus'
declare module 'vue-router'
declare module 'nprogress'
declare module 'lodash/cloneDeep'
