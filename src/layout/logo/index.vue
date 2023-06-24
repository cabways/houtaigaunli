<script setup lang="ts">
//引入logo配置
import setting from '@/setting.ts'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: 50px;
  color: white;
  // 开浮动
  display: flex;
  // 两个元素对齐
  align-items: center;
  padding: 10px;
  .logo {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
