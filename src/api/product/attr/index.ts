import request from '@/utils/request.ts'
import {
  attrList,
  attrResponse,
  categoryListResponse,
} from '@/api/product/attr/type.ts'

enum API {
  //获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  //获取二级分类接口地址
  C2_URL = '/admin/product/getCategory2/',
  //获取三级分类接口地址
  C3_URL = '/admin/product/getCategory3/',
  //获取分类下已有的属性与属性值
  ATTR_URL = '/admin/product/attrInfoList/',
  //添加或者修改已有的属性的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  //删除某一个已有的属性
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

export const reqGetCategory1 = () =>
  request.get<any, categoryListResponse>(API.C1_URL)
export const reqGetCategory2 = (category1Id: number) =>
  request.get<any, categoryListResponse>(API.C2_URL + category1Id)
export const reqGetCategory3 = (category2Id: number) =>
  request.get<any, categoryListResponse>(API.C3_URL + category2Id)
export const reqGetAttrList = (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) => request.get<any, attrResponse>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)

export const reqAddOrUpdateAttr = (attrData: attrList) =>
  request.post<any>(API.ADDORUPDATEATTR_URL, attrData)

export const reqDeleteAttr = (attrId: number) =>
  request.delete<any>(API.DELETEATTR_URL + attrId)
