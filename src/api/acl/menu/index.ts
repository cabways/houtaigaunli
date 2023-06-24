import request from '@/utils/request.ts'
import type { PermissionResponseData } from '@/api/acl/menu/type.ts'
import { MenuParams } from '@/api/acl/menu/type.ts'

enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
  ADDPERMISSION_URL = '/admin/acl/permission/save',
  UPDATEPERMISSION_URL = '/admin/acl/permission/update',
  DELETEPERMISSION_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)

export const reqAddOrUpdatePermission = (data: MenuParams) => {
  if (data.id) {
    // 没有返回数据，故定义为any
    return request.put<any>(API.UPDATEPERMISSION_URL, data)
  } else {
    return request.post<any>(API.ADDPERMISSION_URL, data)
  }
}

export const reqDeletePermission = (id: number) =>
  request.delete<any>(API.DELETEPERMISSION_URL + id)
