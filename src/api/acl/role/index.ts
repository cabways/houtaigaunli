import request from '@/utils/request.ts'
import { AllRoleResponse, MenuResponseData, role } from '@/api/acl/role/type.ts'

enum API {
  ALLROLE_API = '/admin/acl/role/',
  ADDROLE_API = '/admin/acl/role/save',
  UPDATEROLE_API = '/admin/acl/role/update',
  DELETEROLE_API = '/admin/acl/role/remove/',
  ALLPERMISSIONS_API = '/admin/acl/permission/toAssign/',
  SETPREMISSION_API = '/admin/acl/permission/doAssign',
}

export const reqGetAllRole = (page: number, limit: number, roleName: string) =>
  request.get<any, AllRoleResponse>(
    API.ALLROLE_API + `${page}/${limit}/?roleName=${roleName}`,
  )
export const reqAddOrUpdateRole = (data: role) => {
  if (data.id) {
    // 没有返回数据，故定义为any
    return request.put<any>(API.UPDATEROLE_API, data)
  } else {
    return request.post<any>(API.ADDROLE_API, data)
  }
}
export const reqDeleteRole = (id: number) =>
  request.delete<any>(API.DELETEROLE_API + id)
export const reqAllPermission = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSIONS_API + roleId)
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post(
    API.SETPREMISSION_API + `/?roleId=${roleId}&permissionId=${permissionId}`,
  )
