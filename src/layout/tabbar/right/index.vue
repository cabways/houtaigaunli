<script setup lang="ts">
import useSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

let userStore = useUserStore()
let settingStore = useSettingStore()
const $router = useRouter()
const $route = useRoute()
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let dark = ref<boolean>(false)

const setColor = (color) => {
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // const el = document.getElementById('xxx')

  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)

  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color)
}
const changeRefresh = () => {
  settingStore.refresh = !settingStore.refresh
}
const fullScreen = () => {
  // 判断是否全屏
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
const change = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
</script>
<script lang="ts">
export default {
  name: 'Right',
}
</script>

<template>
  <div class="tabbar_right">
    <el-button circle icon="Refresh" size="default" @click="changeRefresh" />
    <el-button circle icon="FullScreen" size="default" @click="fullScreen" />
    <el-popover placement="bottom" title="设置" :width="200" trigger="click">
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            @change="setColor"
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="Moon"
            inactive-icon="Sunny"
            @change="change"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button circle icon="Setting" size="default" />
      </template>
    </el-popover>
    <img
      alt=""
      :src="userStore.avatar"
      style="width: 24px; height: 24px; margin: 0 10px"
    />
    <!--  下拉菜单    -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss"></style>
