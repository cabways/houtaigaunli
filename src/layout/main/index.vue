<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import useSettingStore from '@/store/modules/setting.ts'

let flag = ref(true)
const settingStore = useSettingStore()
watch(
  () => settingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: '_Main',
}
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <Component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
// 过度动画
.fade-enter-from {
  //透明度
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
