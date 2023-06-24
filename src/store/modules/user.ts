import { defineStore } from 'pinia'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user/index.ts'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.ts'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes.ts'
// 引入数据类型
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type.ts'
import router from '@/router'
import cloneDeep from 'lodash/cloneDeep'

function filterAsyncRouter(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRouter(item.children, routes)
      }
      return true
    }
  })
}
// 创建小仓库
const useUserStore = defineStore('user', {
  // 储存数据的地方
  state: (): any => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, // 生成菜单需要的数组
      username: '',
      avatar: '',
    }
  },
  actions: {
    // 发登录请求
    async userLogin(info: loginFormData) {
      const result: loginResponseData = await reqLogin(info)
      if (result.code === 200) {
        this.token = result.data as string
        // 将token储存到本地
        SET_TOKEN(result.data as string)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        // 计算需要展示的异步路由
        const userAsyncRoute = filterAsyncRouter(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        ;(this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute]),
          [...userAsyncRoute, ...anyRoute].forEach((route: any) => {
            router.addRoute(route)
          })
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      const result: any = await reqLogout()
      console.log(result)
      if (result.code === 200) {
        this.token = ''
        REMOVE_TOKEN()
        this.username = ''
        this.avatar = ''
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
