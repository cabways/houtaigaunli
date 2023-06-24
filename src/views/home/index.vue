<script lang="ts" setup>
import useUserStore from '@/store/modules/user.ts'
import getTime from '@/utils/time.ts'

const userStore = useUserStore()
</script>

<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <div class="cardBottom">
          <h3 class="title">{{ getTime() }}好{{ userStore.username }}</h3>
          <p class="subTitle">cabways的项目</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .cardBottom {
    margin: 10px 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 20px;
    }

    .subTitle {
      font-style: italic;
      font-size: 20px;
      font-weight: 300;
    }
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>
