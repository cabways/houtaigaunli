// 登录接口携带的数据类型
export interface loginFormData {
  username: string
  password: string
}

// 返回的数据类型
export interface responseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回的数据类型
export interface loginResponseData extends responseData {
  data: string
}

// 用户信息返回类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
