<script setup lang="ts">
import { useRoute } from 'vue-router'
const $route = useRoute()
import useSettingStore from '@/store/modules/setting.ts'
const settingStore = useSettingStore()
const changeIcon = () => {
  settingStore.fold = !settingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Left',
}
</script>

<template>
  <div class="tabbar_left">
    <el-icon @click="changeIcon">
      <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!--      面包屑-->
    <el-breadcrumb separator-icon="ArrowRight" style="margin-left: 10px">
      <el-breadcrumb-item
        v-for="item in $route.matched"
        :key="item.path"
        v-show="item.meta.title"
        :to="item.path"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss"></style>
