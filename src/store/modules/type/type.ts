import { attrList, category } from '@/api/product/attr/type.ts'

export interface categoryStore {
  c1Arr: category[]
  c1Id: number | string
  c2Arr: category[]
  c2Id: number | string
  c3Arr: category[]
  c3Id: number | string
  attrList: attrList[]
}
