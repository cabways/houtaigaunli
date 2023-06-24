<script lang="ts" setup>
import Left from './left/index.vue'
import Right from './right/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<template>
  <div class="tabbar">
    <Left />
    <Right />
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  // 让两个元素分开
  justify-content: space-between;
  //背景颜色渐变
  //background-image: linear-gradient(to right, white, pink);

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>