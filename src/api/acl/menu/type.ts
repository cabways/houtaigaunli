export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface menuDate {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: number
  toCode: null
  type: number
  status: null
  level: number
  children?: permissionList
  select: boolean
}

export type permissionList = menuDate[]
export interface PermissionResponseData extends ResponseData {
  data: permissionList
}

export interface MenuParams {
  id?: number
  pid: number
  name: string
  code: string
  level: number
}
