import request from '@/utils/request.ts'
import {
  responseData,
  trademark,
  trademarkResponseData,
} from '@/api/product/trademark/type.ts'

enum API {
  TRADEMARK_API = '/admin/product/baseTrademark/',
  ADDTRADEMARK_API = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_API = '/admin/product/baseTrademark/update',
  DELETETRADEMARK_API = '/admin/product/baseTrademark/remove/',
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, trademarkResponseData>(
    API.TRADEMARK_API + `${page}/${limit}`,
  )
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, responseData>(API.DELETETRADEMARK_API + `${id}`)
export const reqAddOrUpdateTrademark = (data: trademark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_API, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_API, data)
  }
}
