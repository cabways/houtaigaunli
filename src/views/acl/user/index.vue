<script setup lang="ts">
// 当前页码
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateUser,
  reqDeleteUser,
  reqGetRoleById,
  reqSetUserRole,
  reqUserInfo,
  reqDeleteAllUser,
} from '@/api/acl/user'
import {
  allRoleList,
  AllRoleResponseData,
  Records,
  ResponseData,
  SetRoleData,
  User,
} from '@/api/acl/user/type.ts'
import { ElMessage } from 'element-plus'
import useSettingStore from '@/store/modules/setting.ts'

const settingStore = useSettingStore()
let pageNo = ref<number>(1)
// 每一页展示多少
let limit = ref<number>(5)
// 一共几页
let total = ref<number>(0)
let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
let userArr = ref<Records>([])
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
const refForm = ref<any>()
// 选中项绑定值
const checkAll = ref<boolean>(false)
// 设置不确定状态，仅负责样式控制
const isIndeterminate = ref<boolean>(false)
const assignRoles = ref<allRoleList>([])
const allRolesList = ref<allRoleList>([])
const selectIdArr = ref<number>([])
let keyword = ref<string>('')
// 获取用户数据
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  const result = await reqUserInfo(pageNo.value, limit.value, keyword.value)
  if (result.code === 200) {
    userArr.value = result.data.records
    total.value = result.data.total
  }
}
onMounted(() => {
  getHasUser()
})
const handler = () => {
  getHasUser()
}
const addUser = () => {
  drawer.value = true
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    refForm.value.clearValidate('username')
    refForm.value.clearValidate('name')
    refForm.value.clearValidate('password')
  })
}
const updateUser = (row) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    refForm.value.clearValidate('username')
    refForm.value.clearValidate('name')
  })
}
const save = async () => {
  await refForm.value.validate()
  const result: any = await reqAddOrUpdateUser(userParams)
  if (result.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    // 浏览器重新加载一次
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
const cancel = () => {
  drawer.value = false
  drawer1.value = false
}
const validateUsername = (_: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名字至少五位'))
  }
}
const validateName = (_: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称至少五位'))
  }
}
const validatePassword = (_: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户密码至少五位'))
  }
}
const rules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validateUsername,
    },
  ],
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: validateName,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword,
    },
  ],
}
const setRole = async (row) => {
  drawer1.value = true
  // 合并两个对象
  Object.assign(userParams, row)
  let result: AllRoleResponseData = await reqGetRoleById(userParams.id)
  if (result.code === 200) {
    assignRoles.value = result.data.assignRoles
    allRolesList.value = result.data.allRolesList
  }
}
const handleCheckAllChange = (val: boolean) => {
  assignRoles.value = val ? allRolesList.value : []
  isIndeterminate.value = false
}
const handleAssignRolesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRolesList.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRolesList.value.length
}
const confirm1 = async () => {
  let data: SetRoleData = {
    userId: userParams.id,
    roleIdList: assignRoles.value.map((item) => item.id),
  }
  const result: ResponseData = await reqSetUserRole(data)
  if (result.code === 200) {
    drawer1.value = false
    ElMessage({
      type: 'success',
      message: '添加角色成功',
    })
    await getHasUser(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '添加角色失败',
    })
  }
}
const deleteUser = async (row) => {
  const result: any = await reqDeleteUser(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除角色成功',
    })
    await getHasUser(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '添删除角色失败',
    })
  }
}
const selectChange = (value: any) => {
  selectIdArr.value = value.map((item) => item.id)
}
const deleteSelectUser = async () => {
  const result: any = await reqDeleteAllUser(selectIdArr.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除角色成功',
    })
    await getHasUser(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '添删除角色失败',
    })
  }
}
const search = () => {
  getHasUser()
  keyword.value = ''
}
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
</script>

<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="!keyword">
            搜索
          </el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button
        type="primary"
        :disabled="!selectIdArr.length"
        @click="deleteSelectUser"
      >
        批量删除
      </el-button>
      <el-table
        style="margin-top: 10px"
        border
        :data="userArr"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index" />
        <el-table-column label="id" align="center" prop="id" />
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户名称"
          align="center"
          prop="name"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户角色"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        />
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="280px" align="center">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="edit"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定要删除${row.username}吗?`"
              width="200px"
              @confirm="deleteUser(row)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"-->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[5, 7, 9, 11]"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @size-change="handler"
        @current-change="getHasUser"
      />
    </el-card>
    <!-- 抽屉 -->
    <el-drawer
      v-model="drawer"
      :title="userParams.id ? '修改用户' : '添加用户'"
      :with-header="true"
    >
      <el-form :model="userParams" :rules="rules" ref="refForm">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请输入用户姓名"
            v-model="userParams.username"
          />
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input placeholder="请输入用户昵称" v-model="userParams.name" />
        </el-form-item>
        <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
          <el-input
            placeholder="请输入用户密码"
            v-model="userParams.password"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1" title="分配角色" :with-header="true">
      <template #default>
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="userParams.username" :disabled="true" />
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="assignRoles"
              @change="handleAssignRolesChange"
            >
              <el-checkbox
                v-for="role in allRolesList"
                :key="role.id"
                :label="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm1">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
