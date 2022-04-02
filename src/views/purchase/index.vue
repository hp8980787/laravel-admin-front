<template>
  <div class="container">
    <el-row>
      <el-button type="success">生成采购订单</el-button>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="isLoading" :data="tableData">
          <el-table-column label="采购时间" prop="created_at"></el-table-column>
          <el-table-column label="产品id" prop="product_id"></el-table-column>
          <el-table-column label="产品sku" prop="product.sku"></el-table-column>
          <el-table-column label="产品图">
            <template slot-scope="scope">
              <img width="80px" :src="scope.row.product.img" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="仓库">
            <template slot-scope="scope">
              {{ scope.row.storehouse.name }}
            </template>
          </el-table-column>
          <el-table-column label="采购数量" prop="amount"></el-table-column>
          <el-table-column label="采购单价" prop="price"></el-table-column>
          <el-table-column label="采购总价" prop="total"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status_type">{{
                scope.row.status_text
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200px">
            <template slot-scope="scope">
              <el-popconfirm
                title="确认到货吗？"
                @onConfirm="purchaseCompleted(scope.row.id)"
              >
                <el-button size="small" type="success" slot="reference"
                  >到货</el-button
                >
              </el-popconfirm>
              <el-button
                style="margin-left: 5px"
                size="small"
                type="primary"
                @click="purchaseEdit(scope.row)"
                >edit</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <Dialog
        v-if="purchaseData.id"
        :visible.sync="visble"
        type="edit"
        :purchaseData="purchaseData"
      ></Dialog>
    </el-row>
  </div>
</template>

<script>
import * as PurchaseRequest from "@/api/purchase";
import Dialog from "@/views/purchase/dialog.vue";
export default {
  name: "index",
  components: {
    Dialog,
  },
  data() {
    return {
      tableData: [],
      isLoading: true,
      visble: false,
      purchaseData: {},
    };
  },
  mounted() {
    this.purchaseInit();
  },
  methods: {
    purchaseInit() {
      PurchaseRequest.index().then((response) => {
        if (response.code === 200) {
          this.isLoading = false;
          this.tableData = response.data.data;
          console.log(response.data);
        }
      });
    },
    purchaseEdit(data) {
      this.purchaseData = data;
      this.visble = true;
    },
    purchaseCompleted(id) {
      PurchaseRequest.completed(id).then((response)=>{
        if(response.code===200){
          this.$message({type:'success',message:'成功!'})
        }
        this.purchaseInit()
      })
    },
  },
};
</script>

<style lang="scss" >
.container {
  margin: 2em;
}
</style>