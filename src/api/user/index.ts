import request from '@/utils/request.ts'
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type.ts'

// 统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
export const reqLogout = () => request.post<any>(API.LOGOUT_URL)
