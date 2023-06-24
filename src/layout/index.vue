<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'
import Main from './main/index.vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user.ts'
import useSettingStore from '@/store/modules/setting.ts'

let userStore = useUserStore()
let settingStore = useSettingStore()
const $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: !settingStore.fold }">
      <Logo />
      <!--      滚动组件-->
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="white"
          :default-active="$route.path"
          :collapse="!settingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_header" :class="{ fold: !settingStore.fold }">
      <Tabbar />
    </div>
    <div class="layout_main" :class="{ fold: !settingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: 260px;
    height: 100%;
    background: #001529;
    //过度动画
    transition: all 1s;

    .scrollbar {
      width: 100%;
      height: calc(100% - 50px);

      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: 50px;
    }
  }

  .layout_header {
    position: fixed;
    width: calc(100% - 260px);
    height: 60px;
    background: white;
    top: 0;
    left: 260px;
    transition: all 1s;
    &.fold {
      width: calc(100% - 50px);
      left: 50px;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - 260px);
    height: calc(100% - 60px);
    top: 50px;
    left: 260px;
    padding: 20px;
    overflow: auto;
    transition: all 1s;
    &.fold {
      width: calc(100% - 50px);
      left: 50px;
    }
  }
}
</style>
