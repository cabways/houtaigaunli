export interface responseData {
  code: number
  message: string
  ok: boolean
}
// 已有品牌的数据类型
export interface trademark {
  id?: number
  tmName: string
  logoUrl: string
}
// 全部品牌数据的类型
export type Records = trademark[]

// trademark返回值类型
export interface trademarkResponseData extends responseData {
  records: Records
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}
