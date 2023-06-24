<script lang="ts" setup>
// 图标
import { User, Lock } from '@element-plus/icons-vue'
// user仓库
import useUserStore from '@/store/modules/user.ts'
// 使用仓库
let userStore = useUserStore()
// 获取路由
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
// 弹窗
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'

// 获取时间
import time from '@/utils/time.ts'

// 登录信息
const loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})
// 按钮加载样式
let loading = ref(false)
// 表单验证
const rules = {
  username: [{ min: 4, max: 10, message: '应为六到十位', trigger: 'change' }],
  password: [{ min: 4, max: 10, message: '应为六到十位', trigger: 'change' }],
}
let loginForms = ref()

const login = async () => {
  // 确保完成验证后再发送请求
  await loginForms.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    $router.push({ path: $route.query.redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `hello!${time()}好`,
    })
    loading.value = false
  } catch (e) {
    ElNotification({
      type: 'error',
      message: e.message,
    })
    loading.value = false
  }
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0" />
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  padding: 40px;
  h1 {
    color: white;
    font-size: 30px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }
  button {
    width: 100%;
  }
}
</style>
