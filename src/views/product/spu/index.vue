<script setup lang="ts">
import Category from '@/components/category/Category.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category.ts'
import { reqGetAllTrademark, reqGetSpu } from '@/api/product/spu'
import type {
  HasSpuResponseData,
  Records,
  AllTradeMark,
  SpuData,
  Trademark,
} from '@/api/product/spu/type.ts'
import { ElMessage, UploadProps } from 'element-plus'

const categoryStore = useCategoryStore()
const scene = ref<number>(1)
const page = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
const records = ref<Records>([])
const spu = reactive<SpuData>({})
const trademarkList = ref<Trademark[]>([])

onMounted(() => {
  getALLTrademark()
})
const getALLTrademark = async () => {
  const result: AllTradeMark = await reqGetAllTrademark()
  if (result.code === 200) {
    trademarkList.value = result.data
  } else {
    ElMessage.error('网络错误')
  }
}
const handleSizeChange = () => {
  getSPUList()
}
const handleCurrentChange = () => {
  getSPUList()
}
watch(
  () => categoryStore.c3Id,
  () => {
    records.value = []
    if (!categoryStore.c3Id) return
    getSPUList()
  },
)
const getSPUList = async () => {
  const result: HasSpuResponseData = await reqGetSpu(
    page.value,
    limit.value,
    categoryStore.c3Id,
  )
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
const addSpu = () => {
  scene.value = 2
}
const updateSpu = () => {
  scene.value = 2
}
const addSKU = () => {
  scene.value = 3
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
// 照片墙删除照片
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
// 预览照片
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<template>
  <Category :scene="scene" />
  <el-card style="margin-top: 10px">
    <div v-show="scene === 1">
      <el-button
        icon="plus"
        :disabled="!categoryStore.c3Id"
        type="primary"
        size="default"
        @click="addSpu"
      >
        添加SPU
      </el-button>
      <el-table border style="margin: 10px 0" :data="records">
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="80px"
        />
        <el-table-column label="SPU名称" width="370" prop="spuName" />
        <el-table-column label="SPU描述" width="370" prop="description" />
        <el-table-column label="SPU操作" width="370">
          <el-button icon="plus" type="primary" size="small" @click="addSKU" />
          <el-button
            icon="edit"
            type="primary"
            size="small"
            @click="updateSpu"
          />
          <el-button icon="view" type="primary" size="small" />
          <el-button icon="delete" type="primary" size="small" />
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-show="scene === 2">
      <el-form>
        <el-form-item label="SPU名称" label-width="100px">
          <el-input v-model="spu.spuName" placeholder="请输入SPU名称" />
        </el-form-item>
        <el-form-item label="SPU品牌" label-width="100px">
          <el-select
            v-model="spu.tmId"
            class="m-2"
            placeholder="请选择"
            size="default"
          >
            <el-option
              v-for="item in trademarkList"
              :key="item.id"
              :label="item.tmName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述" label-width="100px">
          <el-input
            v-model="spu.description"
            :rows="2"
            type="textarea"
            placeholder="请输入SPU描述"
          />
        </el-form-item>
        <el-form-item label="SPU图片" label-width="100px">
          <el-upload
            v-model:file-list="spu.spuImageList"
            action="/api/admin/product/fileUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性" label-width="100px">
          <el-select class="m-2" placeholder="Select" size="default">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button style="margin-left: 10px" type="primary" icon="plus">
            添加属性
          </el-button>
        </el-form-item>
        <el-form-item label="" label-width="100px">
          <el-table border>
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="80px"
            />
            <el-table-column label="销售属性名字" width="120px" />
            <el-table-column label="销售属性值" />
            <el-table-column label="操作" width="120px">
              <template v-slot:default>
                <el-button icon="delete" type="primary" size="small" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary">保存</el-button>
          <el-button type="primary" @click="scene = 1">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="scene === 3">
      <el-form>
        <el-form-item label="SKU名称" label-width="100px">
          <el-input placeholder="SKU名称" />
        </el-form-item>
        <el-form-item label="价格(元)" label-width="100px">
          <el-input placeholder="价格(元)" />
        </el-form-item>
        <el-form-item label="重量(kg)" label-width="100px">
          <el-input placeholder="重量(kg)" />
        </el-form-item>
        <el-form-item label="SKU描述" label-width="100px">
          <el-input :rows="2" type="textarea" placeholder="SKU名称" />
        </el-form-item>
        <el-form-item label="平台属性" label-width="100px">
          <div>
            <span>颜色</span>
            <el-select
              style="margin-left: 10px"
              class="m-2"
              placeholder="请选择"
              size="default"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="销售属性" label-width="100px">
          <div>
            <span>颜色</span>
            <el-select
              style="margin-left: 10px"
              class="m-2"
              placeholder="请选择"
              size="default"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="图片名称" label-width="100px">
          <el-table border>
            <el-table-column type="selection" width="80px" />
            <el-table-column label="图片"></el-table-column>
            <el-table-column label="名称"></el-table-column>
            <el-table-column label="操作">
              <template v-slot:default>
                <el-button iaon="delete" type="primary" size="small" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary">保存</el-button>
          <el-button type="primary" @click="scene = 1">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style scoped lang="scss"></style>
<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
