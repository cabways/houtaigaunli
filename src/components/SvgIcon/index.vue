<script lang="ts" setup>
defineProps({
  // :xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <svg :style="{ width, height }">
    <use :fill="color" :xlink:href="prefix + name"></use>
  </svg>
</template>

<style scoped></style>
