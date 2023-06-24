import { defineStore } from 'pinia'
import {
  reqGetAttrList,
  reqGetCategory1,
  reqGetCategory2,
  reqGetCategory3,
} from '@/api/product/attr'
import { attrResponse, categoryListResponse } from '@/api/product/attr/type.ts'
import { categoryStore } from '@/store/modules/type/type.ts'
const useCategoryStore = defineStore('category', {
  state: (): categoryStore => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: '',
      attrList: [],
    }
  },
  actions: {
    async get1List() {
      const result: categoryListResponse = await reqGetCategory1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    async get2List() {
      this.c2Id = ''
      this.c2Arr = []
      this.c3Id = ''
      this.c3Arr = []
      this.attrList = []
      const result: categoryListResponse = await reqGetCategory2(
        this.c1Id as number,
      )
      if (result.code === 200) {
        this.c2Arr = result.data
      }
    },
    async get3List() {
      this.c3Id = ''
      this.c3Arr = []
      this.attrList = []
      const result: categoryListResponse = await reqGetCategory3(
        this.c2Id as number,
      )
      if (result.code === 200) {
        this.c3Arr = result.data
      }
    },
    async getAtteList() {
      const result: attrResponse = await reqGetAttrList(
        this.c1Id,
        this.c2Id,
        this.c3Id,
      )
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
  },
})
export default useCategoryStore
