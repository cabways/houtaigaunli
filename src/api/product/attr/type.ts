export interface responseData {
  code: number
  message: string
  ok: boolean
}
export interface category {
  category1Id?: number
  category2Id?: number
  id: number
  createTime: string
  updateTime: string
  name: string
}
export interface attr {
  attrId: number
  id: number
  valueName: string
}
export interface attrList {
  attrName: string
  attrValueList: attr[]
  categoryId: number
  categoryLevel: number
  id: number
}
export interface attrResponse extends responseData {
  data: attrList[]
}
export interface categoryListResponse extends responseData {
  data: category[]
}
