<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  AllRoleResponse,
  menuDate,
  MenuResponseData,
  records,
  ResponseData,
  role,
} from '@/api/acl/role/type.ts'
import {
  reqAddOrUpdateRole,
  reqAllPermission,
  reqDeleteRole,
  reqGetAllRole,
  reqSetPermission,
} from '@/api/acl/role'
import useSettingStore from '@/store/modules/setting.ts'
import { ElMessage } from 'element-plus'

const settingStore = useSettingStore()
let pageNo = ref<number>(1)
// 每一页展示多少
let limit = ref<number>(5)
// 一共几页
let total = ref<number>(40)
let keyword = ref<string>('')
let allRoleList = ref<records>([])
let dialogFormVisible = ref<boolean>(false)
let roleParams = reactive<role>({
  roleName: '',
})
const formRef = ref<any>()
let drawer = ref<boolean>(false)
let permissionsData = ref<menuDate>({})
const defaultProps = {
  children: 'children',
  label: 'name',
}
let selectedArr = ref<number[]>([])
const tree = ref<any>()
let roleId = ref<number>(0)

const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  const result: AllRoleResponse = await reqGetAllRole(
    pageNo.value,
    limit.value,
    keyword.value,
  )
  if (result.code === 200) {
    allRoleList.value = result.data.records
    total.value = result.data.total
  }
}
onMounted(() => {
  getHasRole()
})
const handler = () => {
  getHasRole()
}
const search = () => {
  getHasRole()
  keyword.value = ''
}
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
const addRole = () => {
  Object.assign(roleParams, {
    roleName: '',
    id: 0,
  })
  dialogFormVisible.value = true
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}
const updateRole = (row: role) => {
  dialogFormVisible.value = true
  Object.assign(roleParams, row)
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}
const validateRoleName = (_: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称至少两位'))
  }
}
const rules = {
  roleName: [
    {
      required: true,
      trigger: 'blur',
      validator: validateRoleName,
    },
  ],
}
const save = async () => {
  await formRef.value.validate()
  const result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功',
    })
    await getHasRole(roleParams.id ? roleParams.id : 1)
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.id ? '更新失败' : '添加失败',
    })
  }
}
const deleteRole = async (id: number) => {
  const result: any = await reqDeleteRole(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    await getHasRole()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
const setPermissions = async (id: number) => {
  roleId.value = id
  const result: MenuResponseData = await reqAllPermission(id)
  if (result.code === 200) {
    drawer.value = true
    permissionsData.value = result.data
    selectedArr.value = filterSelected(permissionsData.value, [])
  }
}
const filterSelected = (permissionsData: any, initArr: any) => {
  permissionsData.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    } else if (item.children && item.children.length > 0) {
      filterSelected(item.children, initArr)
    }
  })
  return initArr
}
const handlerSet = async () => {
  let arr = tree.value.getHalfCheckedKeys().concat(tree.value.getCheckedKeys())
  const result: ResponseData = await reqSetPermission(roleId.value, arr)
  if (result.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '更新失败',
    })
  }
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
          <el-button type="primary" :disabled="!keyword" @click="search">
            搜索
          </el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-button type="primary" @click="addRole">添加职位</el-button>
      <!--   show-overflow-tooltip属性,文字超出时会自动缩进     -->
      <el-table style="margin-top: 10px" border :data="allRoleList">
        <el-table-column label="#" align="center" type="index" />
        <el-table-column label="id" align="center" prop="id" />
        <el-table-column
          label="职位名称"
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
              @click="setPermissions(row.id)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="edit"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定要删除${row.roleName}吗?`"
              width="200px"
              @confirm="deleteRole(row.id)"
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
        @current-change="getHasRole"
      />
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="roleParams.id ? '修改职位' : '添加职位'"
    >
      <el-form :model="roleParams" :rules="rules" ref="formRef">
        <el-form-item label="角色名称" label-width="140px" prop="roleName">
          <el-input
            placeholder="请填写角色名称"
            v-model="roleParams.roleName"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer" title="分配权限" :with-header="true">
      <el-form>
        <el-form-item>
          <el-tree
            :data="permissionsData"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectedArr"
            :props="defaultProps"
            ref="tree"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="handlerSet">确定</el-button>
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
