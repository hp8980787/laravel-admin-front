<template>
  <el-row>
    <el-col>
      <el-table size="mini" :data="tableData">
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="产品id" prop="product_id"></el-table-column>
        <el-table-column label="数量" prop="amount"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="时间" prop="created_at"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            
            <el-tag  :type="scope.row.status_type">{{ scope.row.status_text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="orderItemsDelete(scope.row)">delete</el-button>
            <el-button type="primary" @click="ship(scope.row)">采购</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col>
      <PurChaseDialog :visible.sync="purChaseDialogVisible" v-if="shipData.id" :purchaseData="shipData"  ></PurChaseDialog>
    </el-col>
  </el-row>
</template>
<script>
import PurChaseDialog from "@/views/purchase/dialog.vue";
export default {
  name: "Order",
  components: { PurChaseDialog },
  props: ["itemsData"],
  data() {
    return {
      tableData: [],
      purChaseDialogVisible: false,
      shipData: {},
    };
  },
  mounted() {
    this.tableData = this.itemsData;
  },
  methods: {
    ship(data) {
      this.purChaseDialogVisible = true;
      this.shipData = data;
    },
    show() {
      this.purChaseDialogVisible = true;
    },
  },
};
</script>

<style>
</style>