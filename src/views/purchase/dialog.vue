<template>
  <el-dialog
    title="采购"
    :modal="false"
    :visible.sync="visible"
    :close-on-click-modal="false"
    @close="handleSubmit()"
    :before-close="handleSubmit"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="采购数量" prop="amount" :label-width="labelWidth">
        <el-input-number
          v-model="form.amount"
          :min="1"
          :max="99999"
          label="描述文字"
        ></el-input-number>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="form = {}">重置</el-button>
      <el-button @click="handleSubmit()">取 消</el-button>
      <el-button type="primary" @click="purchaseStore()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as StorehouseRequest from "@/api/storehouse";
import * as PurChaseRequest from "@/api/purchase";

export default {
  name: "DialogForm",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    purchaseData: {
      type: Object,
    },
    type: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      form: {
        total: 0.0,
        amount: 5,
      },
      storehouses: {},
      rules: {
        amount: [{ required: true, message: "必填", trigger: "blur" }],
        price: [{ required: true, message: "价格必须", trigger: "blur" }],
        storehouse_id: [
          { required: true, message: "仓库必须", trigger: "blur" },
        ],
      },
      labelWidth: "100px",
    };
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    "form.price": function (newPrice, oldPrice) {
      const total = parseFloat(newPrice * this.form.amount);
      this.form.total = total.toFixed(2);
    },
  },
  mounted() {
    this.init();
    if (this.purchaseData.id) {
      this.form.product_id = this.purchaseData.product_id;
    }

    if (this.type === "edit") {
      this.form = this.purchaseData;
    }
  },
  methods: {
    async init() {
      const { data } = await StorehouseRequest.index();
      this.storehouses = data;
    },
    handleSubmit() {
      this.$emit("update:visible", false);
    },
    purchaseStore(data) {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            PurChaseRequest.store(this.form).then((response) => {
              if (response.code === 200) {
                this.$message({ type: "success", message: "添加成功!" });
                this.handleSubmit();
              } else {
                this.$message({ type: "error", message: "添加失败!" });
              }
            });
          } else {
               PurChaseRequest.update(this.form).then((response) => {
          if(response.code===200){
            this.$message({type:'success',message:'修改成功!'})
            this.handleSubmit()
            this.$router.push({path:'/purchase/index'})
          }else{
            this.$message({type:'error',message:'修改失败!'})
          }
          });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.form);
    },
  },
};
</script>

<style>
</style>