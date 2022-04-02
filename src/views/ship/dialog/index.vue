<template>
  <el-dialog
    title="发货"
    :visible.sync="shipVisble"
    :before-close="handleSubmit"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="物流编号" prop="no" :label-width="labelWidth">
        <el-input v-model="form.no"></el-input>
      </el-form-item>
      <el-form-item
        label="物流公司名称"
        prop="express_company"
        :label-width="labelWidth"
      >
        <el-input v-model="form.express_company"></el-input>
      </el-form-item>
      <el-form-item label="物流价格" prop="price" :label-width="labelWidth">
        <el-input v-model="form.price" placeholder="美金"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="form = {}">重置</el-button>
      <el-button @click="handleSubmit()">取 消</el-button>
      <el-button type="primary" @click="shipStore()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as ShipRequest from "@/api/ship";
export default {
  name: "ShipDialog",
  props: {
    shipVisble: {
      type: Boolean,
      default: false,
    },
    orderData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      form: {},
      rules: {
        no: [{ required: true, trigger: "blue", message: "必须" }],
        express_company: [{ required: true, trigger: "blue", message: "必须" }],
        price: [{ required: true, trigger: "blue", message: "必须" }],
      },
      labelWidth: "100px",
    };
  },
  mounted() {
    console.log(this.orderData);
  },
  methods: {
    handleSubmit() {
      this.$emit("update:shipVisble", false);
    },
    shipStore() {
        const data = this.form;
        data['order_id']= this.orderData.id;
        ShipRequest.store(data).then((response)=>{
            if(response.code ===200){
                this.$message({type:'success',message:'发货成功'});
                this.handleSubmit();
                this.$router.push({path:'/orders/index'});
            }
        })
    },
  },
};
</script>

<style>
</style>