<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table
        v-loading="tableLoading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="网站" >
          <template slot-scope="scope">{{ scope.row.domain.url }}</template>
        </el-table-column>
          <el-table-column label="购买日期" width="120">
          <template slot-scope="scope">{{ scope.row.buy_date }}</template>
        </el-table-column>
        <el-table-column prop="trans_id" label="Trans_ID" >
        </el-table-column>
        <el-table-column prop="total" label="总价" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="total_usd" label="总价(美元)" show-overflow-tooltip>
        </el-table-column>
            <el-table-column prop="ip" label="ip" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])"
          >切换第二、第三行的选中状态</el-button
        >
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { index } from "@/api/order";
export default {
  name: "Index",
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    orders() {
      index().then((response) => {
        if (response.code === 200) {
          this.tableLoading = false;
          const data = response.data;
          this.tableData = data.data;
        }
        console.log(this.tableData);
      });
    },
  },
  data() {
    return {
      tableData: [],
      tableLoading: true,
    };
  },
  mounted() {
    this.orders();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  margin: 10px;
  .table {
    tr {
      td {
        background-color: #c9c7c7;
      }
    }
  }
}
</style>