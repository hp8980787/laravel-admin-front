<template>
  <div class="app-container" v-loading="tableLoading">
    <el-row style="margin: 5px 5px">
      <el-col :md="6" :sm="8" :lg="6">
        <el-input v-model="keyword" placeholder="搜索"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <div class="filter-container">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="pid">
            <template slot-scope="scope">{{ scope.row.pid }}</template>
          </el-table-column>
          <el-table-column label="sku" width="120">
            <template slot-scope="scope">{{ scope.row.sku }}</template>
          </el-table-column>
          <el-table-column prop="img" label="封面图"> </el-table-column>
          <el-table-column prop="brand" label="品牌" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="category_id"
            label="分类id"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="type" label="type" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="bzq" label="bzq" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="size" label="size" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="color" label="color" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="dy" label="dy" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="dl" label="dl" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="jianjie1"
            label="jianjie1"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="jianjie2"
            label="jianjie2"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="rep" label="rep" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="comp" label="comp" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="ip" label="ip" show-overflow-tooltip>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])"
            >切换第二、第三行的选中状态</el-button
          >
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          center
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ userInfo["Company or Name"] }}</span>
            </div>
            <div
              v-for="(item, key) in userInfo"
              :key="key"
              class="userinfo-item"
            >
              {{ key + ":" + item }}
            </div>
          </el-card>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-backtop target=".filter-container"></el-backtop>
      </div>
    </el-row>
    <el-row style="margin-top: 20px" type="flex" justify="center">
      <el-col :md="8" :sm="12" :lg="8">
        <el-pagination
          @current-change="paginationChange"
          background
          :current-page="pagination.meta.currentPage"
          :page-size="pagination.meta.perPage"
          layout="prev, pager, next"
          :total="pagination.meta.total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { index } from "@/api/products/product";
export default {
  name: "Index",
  data() {
    return {
      tableData: [],
      tableLoading: true,
      dialogVisible: false,
      userInfo: {},
      pagination: {
        links: {},
        meta: {},
      },
      keyword: "",
    };
  },
  watch: {
    keyword: function (newKeyword, oldKeyword) {
      if (oldKeyword != newKeyword) {
        this.orders({ keyword: this.keyword });
      }
    },
  },
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
    orders(data) {
      index(data).then((response) => {
        if (response.code === 200) {
          this.tableLoading = false;
          const data = response.data;
          this.tableData = data.data;
          this.pagination.links = data.links;
          this.pagination.meta = data.meta;
        }
      });
    },
    getBuyerInfo(data) {
      this.dialogVisible = true;
      this.userInfo = JSON.parse(data);
    },
    paginationChange(currentPage) {
      this.tableLoading = true;
      index({ page: currentPage }).then((response) => {
        this.tableLoading = false;
        const data = response.data;
        this.tableData = data.data;
        this.pagination.links = data.links;
        this.pagination.meta = data.meta;
      });
    },
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
.userinfo-item {
  margin: 5px;
}
</style>