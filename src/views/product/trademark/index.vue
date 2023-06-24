<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
  reqHasTrademark,
} from '@/api/product/trademark'
import {
  Records,
  responseData,
  trademark,
  trademarkResponseData,
} from '@/api/product/trademark/type.ts'
import type { FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

// 当前页码
let pageNo = ref<number>(1)
// 每一页展示多少
let limit = ref<number>(3)
// 一共几页
let total = ref<number>(0)
// 已有品牌数据
let trademarkArr = ref<Records>([])
// 对话框是否展示
let dialogFormVisible = ref<boolean>(false)
// 新增品牌数据
let trademarkParams = reactive({
  id: '',
  tmName: '',
  logoUrl: '',
})
// 表单验证规则
const rules = reactive<FormRules>({
  tmName: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度应在3到5位', trigger: 'blur' },
  ],
  logoUrl: [{ required: true, message: '请提供商品图片', trigger: 'blur' }],
})
const formRef = ref<any>()

// 获取trademark数据
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  const result: trademarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  const { code, data } = result
  if (code === 200) {
    total.value = data.total
    const { records } = data
    trademarkArr.value = records
  }
}
onMounted(() => {
  getHasTrademark()
})
// 添加回调
const addTrademark = () => {
  formRef.value.clearValidate()
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  dialogFormVisible.value = true
}
// 修改回调
const updateTrademark = (row: trademark) => {
  formRef.value.clearValidate()
  trademarkParams.id = row.id
  trademarkParams.logoUrl = row.logoUrl
  trademarkParams.tmName = row.tmName
  dialogFormVisible.value = true
}
// 取消的方法
const cancel = () => {
  dialogFormVisible.value = false
}
// 确定的方法
const confirm = async () => {
  await formRef.value.validate()
  dialogFormVisible.value = false
  const result: responseData = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    ElMessage.success('上传成功')
    const pager =
      total.value % limit.value === 0 ? pageNo.value + 1 : pageNo.value
    await getHasTrademark(pager)
  } else {
    ElMessage.error('上传失败')
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('请传一张照片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('照片太大了哦')
    return false
  }
  return true
}
const deleteTrademark = async (row: trademark) => {
  const result: responseData = await reqDeleteTrademark(row.id)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    await getHasTrademark(pageNo.value)
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <el-table style="margin-top: 10px" border :data="trademarkArr">
      <el-table-column label="序号" width="80pz" align="center" type="index" />
      <el-table-column label="品牌名称">
        <template v-slot="{ row: { tmName } }">
          <pre style="color: black">{{ tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template v-slot="{ row: { logoUrl } }">
          <img :src="logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          />
          <el-popconfirm
            width="220"
            confirm-button-text="是的"
            cancel-button-text="算了"
            icon="InfoFilled"
            icon-color="#626AEF"
            title="确定删除?"
            @confirm="deleteTrademark(row)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页器组件
   小型分页器  :small="true"
   // @size-change  改变每页最大展示个数时触发
   // @current-change 改变当前页码时触发
  -->
    <el-pagination
      style="margin-top: 10px"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes, "
      :total="total"
      @size-change="getHasTrademark"
      @current-change="getHasTrademark"
    />
  </el-card>

  <!--  对话框组件-->
  <el-dialog v-model="dialogFormVisible" title="添加品牌">
    <el-form
      style="width: 80%"
      :rules="rules"
      :model="trademarkParams"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          placeholder="请您输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
            alt=""
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
