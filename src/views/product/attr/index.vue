<script setup lang="ts">
import Category from '../../../components/category/Category.vue'
import useCategoryStore from '@/store/modules/category.ts'
import { nextTick, reactive, ref, watch } from 'vue'
import type { attrList, responseData } from '@/api/product/attr/type.ts'
import { reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()
const scene = ref<number>(1)
let attrData = reactive<attrList>({
  attrName: '',
  attrValueList: [],
  categoryId: 0,
  categoryLevel: 3,
})
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    categoryStore.getAtteList()
  },
)
const addAttr = () => {
  attrData = Object.assign(attrData, {
    attrName: '',
    attrValueList: [],
    categoryId: 0,
    categoryLevel: 3,
  })
  scene.value = 2
}
const updateAttr = (row) => {
  scene.value = 2
  attrData = Object.assign(attrData, row)
}
const cancel = () => {
  scene.value = 1
}
const addAttrValue = () => {
  attrData.attrValueList.push({
    valueName: '',
    flag: true,
  })
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrData.attrValueList.length - 1].focus()
  })
}
const save = async () => {
  attrData.categoryId = categoryStore.c3Id
  const result: responseData = await reqAddOrUpdateAttr(attrData)
  if (result.code === 200) {
    await categoryStore.getAtteList()
    scene.value = 1
    ElMessage.success('保存成功')
  } else {
    ElMessage.error('保存失败')
  }
}
const confirmAdd = (row) => {
  if (row.valueName) {
    row.flag = false
  } else {
    ElMessage.error('属性值不能为空')
  }
}
const deleteAttr = async (row: attrList) => {
  const result: responseData = await reqDeleteAttr(row.id)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    await categoryStore.getAtteList()
  } else {
    ElMessage.error('删除失败')
  }
}
const deleteAttrValue = (row) => {
  attrData.attrValueList = attrData.attrValueList.filter(
    (item) => item.id != row.id,
  )
}
</script>

<template>
  <Category :scene="scene" />
  <el-card style="margin-top: 10px">
    <div v-show="scene === 1">
      <el-button
        icon="plus"
        type="primary"
        @click="addAttr"
        :disabled="!categoryStore.c3Id"
      >
        添加属性
      </el-button>
      <el-table :data="categoryStore.attrList" border style="margin-top: 10px">
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        />
        <el-table-column
          align="center"
          label="属性名称"
          width="120px"
          prop="attrName"
        />
        <el-table-column label="属性值名称">
          <template v-slot="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="item in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              icon="edit"
              size="small"
              @click="updateAttr(row)"
            />
            <el-popconfirm
              width="220"
              confirm-button-text="确认"
              cancel-button-text="不，再想想"
              icon-color="#626AEF"
              title="确定删除?"
              @confirm="deleteAttr(row)"
            >
              <template #reference>
                <el-button type="primary" icon="delete" size="small" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene === 2">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input v-model="attrData.attrName" />
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="plus"
        @click="addAttrValue"
        :disabled="!attrData.attrName"
      >
        添加属性值
      </el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
      <el-table style="margin: 10px 0" border :data="attrData.attrValueList">
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="80px"
        />
        <el-table-column label="属性值名称">
          <template v-slot="{ row, $index }">
            <el-input
              :ref="(vc: any) => inputArr[$index] = vc"
              autofocus="autofocus"
              v-if="row.flag"
              v-model="row.valueName"
              @blur="confirmAdd(row)"
              placeholder="请你输入属性值名称"
            />
            <div v-else @click="row.flag = true">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template v-slot="{ row }">
            <el-button
              icon="delete"
              type="primary"
              @click="deleteAttrValue(row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        @click="save"
        :disabled="!(attrData.attrName && attrData.attrValueList)"
      >
        保存
      </el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<style scoped lang="scss"></style>
