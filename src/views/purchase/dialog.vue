<template>
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="采购数量" prop="amount" :label-width="labelWidth">
      <el-input-number v-model="form.amount" :min="1" :max="99999" label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="采购价格" prop="price" :label-width="labelWidth">
      <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="采购总价" prop="total" :label-width="labelWidth">
      <el-input v-model="form.total"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark" :label-width="labelWidth">
      <el-input type="text" v-model="form.remark"></el-input>
    </el-form-item>
    <el-form-item label="仓库" prop="storehouse_id" :label-width="labelWidth">
      <el-select v-model="form.storehouse_id" placeholder=" 请选择">
        <el-option
          v-for="(item, key) in storehouses"
          :key="key"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import * as StorehouseRequest from "@/api/storehouse";
export default {
  name: "DialogForm",

  data() {
    return {
      form: {},
      storehouses: {},
      rules: {},
      labelWidth:'100px',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
        const {data} = await  StorehouseRequest.index();
        console.log(data)
        this.storehouses = data;
    },
  },
};
</script>

<style>
</style>