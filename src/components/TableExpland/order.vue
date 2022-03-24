<template>
  <el-table size="mini" :data="tableData">
    <el-table-column label="name" prop="name"></el-table-column>
    <el-table-column label="产品id" prop="product_id"></el-table-column>
    <el-table-column label="数量" prop="amount"></el-table-column>
    <el-table-column label="价格" prop="price"></el-table-column>
    <el-table-column label="时间" prop="created_at"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="orderItemsDelete(scope.row)">delete</el-button>
        <el-button type="primary" @click="orderItemsDelete(scope.row)">采购</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "Order",
  props: ["itemsData"],
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.tableData = this.itemsData;
  },
};
</script>

<style>
</style>