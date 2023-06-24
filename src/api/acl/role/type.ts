export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export type records = role[]

export interface AllRoleResponse extends ResponseData {
  data: {
    records: records
    total: number
    size: number
    current: number
    pages: 15
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: true
  }
}

export interface menuDate {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: number
  toCode: null
  type: number
  status: null
  level: number
  children?: menuDate[]
  select: boolean
}

export interface MenuResponseData extends ResponseData {
  data: menuDate[]
}
