import request from '@/utils/request.ts'
import {
  AllRoleResponseData,
  SetRoleData,
  User,
  userResponseData,
} from '@/api/acl/user/type.ts'

enum API {
  ALLUSER_API = '/admin/acl/user/',
  ADDUSER_API = '/admin/acl/user/save',
  UPDATEUSER_API = '/admin/acl/user/update',
  GETROLEBYID_API = '/admin/acl/user/toAssign/',
  SETROLE_API = '/admin/acl/user/doAssignRole',
  DELETEUSER_API = '/admin/acl/user/remove/',
  DELETEALLUSER_API = '/admin/acl/user/batchRemove',
}

export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, userResponseData>(
    API.ALLUSER_API + `${page}/${limit}/?username=${username}`,
  )
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    // 没有返回数据，故定义为any
    return request.put<any>(API.UPDATEUSER_API, data)
  } else {
    return request.post<any>(API.ADDUSER_API, data)
  }
}
export const reqGetRoleById = (adminId: number) =>
  request.get<any, AllRoleResponseData>(API.GETROLEBYID_API + `${adminId}`)
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_API, data)
export const reqDeleteUser = (id: number) =>
  request.delete<any, any>(API.DELETEUSER_API + `${id}`)
export const reqDeleteAllUser = (idList: number[]) =>
  request.delete<any, any>(API.DELETEALLUSER_API, { data: idList })
