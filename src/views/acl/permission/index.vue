<script setup lang="ts">
import {
  reqAddOrUpdatePermission,
  reqAllPermission,
  reqDeletePermission,
} from '@/api/acl/menu'
import { onMounted, reactive, ref } from 'vue'
import {
  menuDate,
  MenuParams,
  permissionList,
  PermissionResponseData,
  ResponseData,
} from '@/api/acl/menu/type.ts'
import { ElMessage } from 'element-plus'

let permissionArr = ref<permissionList>([])
let dialogVisible = ref<boolean>(false)
let menuData = reactive<MenuParams>({
  pid: 0,
  name: '',
  code: '',
  level: 0,
})

const getAllPermission = async () => {
  const result: PermissionResponseData = await reqAllPermission()
  if (result.code === 200) {
    permissionArr.value = result.data
  }
}
onMounted(() => {
  getAllPermission()
})
const addPermission = (row: menuDate) => {
  Object.assign(menuData, {
    id: 0,
    pid: 0,
    name: '',
    code: '',
    level: 0,
  })
  dialogVisible.value = true
  menuData.level = row.level
  menuData.pid = row.id
}
const updatePermission = (row: menuDate) => {
  Object.assign(menuData, row)
  dialogVisible.value = true
}
const save = async () => {
  const result: ResponseData = await reqAddOrUpdatePermission(menuData)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加菜单成功',
    })
    dialogVisible.value = false
    await getAllPermission()
  } else {
    ElMessage({
      type: 'error',
      message: '添加菜单失败',
    })
  }
}
const deletePermission = async (id) => {
  const result: ResponseData = await reqDeletePermission(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除菜单成功',
    })
    await getAllPermission()
  } else {
    ElMessage({
      type: 'error',
      message: '删除菜单失败',
    })
  }
}
</script>

<template>
  <div>
    <el-table
      :data="permissionArr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      stripe
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 4"
            @click="addPermission(row)"
          >
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 1"
            @click="updatePermission(row)"
          >
            编辑
          </el-button>
          <el-popconfirm title="你确定?" @confirm="deletePermission(row.id)">
            <template #reference>
              <el-button
                type="primary"
                size="small"
                :disabled="row.level === 1"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="menuData.id ? '修改菜单' : '添加菜单'"
      width="30%"
    >
      <template #default>
        <el-form>
          <el-form-item label="名称" label-width="60px">
            <el-input placeholder="情输入权限名称" v-model="menuData.name" />
          </el-form-item>
          <el-form-item label="权限值" label-width="60px">
            <el-input placeholder="情输入权限值" v-model="menuData.code" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
