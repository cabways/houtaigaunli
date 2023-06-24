<script setup lang="ts">
// 获取父组件传来的数据
defineProps(['menuList'])
import { useRouter } from 'vue-router'
let $router = useRouter()
const goRoute = (vc: any) => {
  // 路由跳转
  $router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menus',
}
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!--  没有子路由时展示  -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <!--  只有一个子路由时展示  -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>
            {{ item.children[0].meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
      <!--   路由递归   -->
      <Menus :menuList="item.children"></Menus>
    </el-sub-menu>
  </template>
</template>

<style scoped lang="scss"></style>
