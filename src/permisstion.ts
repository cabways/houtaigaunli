import router from '@/router'
// 引入进度条样式
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 进度条旁边的圆圈
nProgress.configure({ showSpinner: false })

import useUserStore from '@/store/modules/user.ts'

// 前置路由守卫
router.beforeEach(async (to: any, _: any, next: any) => {
  const userStore = useUserStore()
  nProgress.start()
  const username = userStore.username
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (e) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 后置路由守卫
router.afterEach(() => {
  nProgress.done()
})
