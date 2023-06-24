<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category.ts'

const categoryStore = useCategoryStore()
defineProps(['scene'])

onMounted(() => {
  categoryStore.c1Id = ''
  categoryStore.c1Arr = []
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  categoryStore.attrList = []
  get1List()
})
const get1List = () => {
  categoryStore.get1List()
}
const getC2 = () => {
  categoryStore.get2List()
}
const getC3 = () => {
  categoryStore.get3List()
}
</script>

<template>
  <el-card>
    <el-form inline>
      <el-form-item>
        <p>一级分类</p>
        <el-select
          v-model="categoryStore.c1Id"
          class="m-2"
          placeholder="请选择"
          @change="getC2"
          :disabled="!(scene === 1)"
        >
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <p>二级分类</p>
        <el-select
          v-model="categoryStore.c2Id"
          class="m-2"
          placeholder="请选择"
          @change="getC3"
          :disabled="!(scene === 1)"
        >
          <el-option
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <p>三级分类</p>
        <el-select
          v-model="categoryStore.c3Id"
          class="m-2"
          placeholder="请选择"
          :disabled="!(scene === 1)"
        >
          <el-option
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.m-2 {
  margin-left: 10px;
}
</style>
