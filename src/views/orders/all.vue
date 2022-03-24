<template>
  <div class="app-container" v-loading="tableLoading">
    <el-row style="margin: 5px 5px">
      <el-col :md="6" :sm="8" :lg="6" style="margin: 0 5px 0 5px">
        <el-input v-model="keyword" placeholder="搜索"></el-input>
      </el-col>
      <el-col :md="6" :sm="6" :lg="6">
        <el-button @click="recordOrders()" type="info">录入订单</el-button>
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
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table
                size="mini"
                v-if="scope.row.items"
                :data="scope.row.items"
              >
                <el-table-column label="name" prop="name"></el-table-column>
                <el-table-column
                  label="产品id"
                  prop="product_id"
                ></el-table-column>
                <el-table-column label="数量" prop="amount"></el-table-column>
                <el-table-column label="价格" prop="price"></el-table-column>
                <el-table-column
                  label="时间"
                  prop="created_at"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="itemsEdit(scope.row)">edit</el-button>
                    <el-button @click="orderItemsDelete(scope.row)"
                      >delete</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="id" prop="id" width="55"></el-table-column>
          <el-table-column label="网站">
            <template slot-scope="scope">{{ scope.row.domain.url }}</template>
          </el-table-column>
          <el-table-column label="购买日期" width="120">
            <template slot-scope="scope">{{ scope.row.buy_date }}</template>
          </el-table-column>
          <el-table-column label="用户购买信息" width="120">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                v-on:click="getBuyerInfo(scope.row.info)"
                >点击查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="trans_id" label="Trans_ID"> </el-table-column>
          <el-table-column prop="order_status" label="订单状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.record_status === 0" type="waring"
                >未录单</el-tag
              >
              <el-tag v-else-if="scope.row.record_status === 1" type="success"
                >已录单</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总价" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="total_usd"
            label="总价(美元)"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="ip" label="ip" show-overflow-tooltip>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                移除
              </el-button>
              <el-button
                size="small"
                type="info"
                @click="itemsFormInit(scope.row)"
                >填入子项</el-button
              >
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
        <el-dialog
          :title="itemsTitle + '子项'"
          :visible.sync="itemsDialogVisible"
          center=""
        >
          <el-form
            :model="itemsForm"
            ref="itemsForm"
            class="demo-form-inline"
            widdth="100%"
          >
            <el-form-item label="name" label-width="80px">
              <el-input v-model="itemsForm.name" placeholder="name"></el-input>
            </el-form-item>
            <el-form-item label="产品pid" label-width="80px">
              <el-input
                v-model="itemsForm.product_id"
                placeholder="product_id"
              ></el-input>
            </el-form-item>
            <el-form-item label="price" label-width="80px">
              <el-input
                v-model="itemsForm.price"
                placeholder="price"
              ></el-input>
            </el-form-item>
            <el-form-item label="数量" label-width="80px">
              <el-input
                v-model="itemsForm.amount"
                placeholder="数量 "
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="itemsDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              v-if="itemsType === 'add'"
              @click="orderItemsStore()"
              >确 定</el-button
            >
            <el-button type="primary" v-else @click="orderItemsUpdate()"
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
import { index } from "@/api/grossOrder";
import { update } from "@/api/grossOrder";
import { record } from "@/api/grossOrder";
import { itemsStore } from "@/api/grossOrder";
import { itemsUpdate } from "@/api/grossOrder";
import { itemsDelete } from "@/api/grossOrder";
export default {
  name: "All",
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
      itemsDialogVisible: false,
      itemsForm: {},
      itemsType: "add",
      itemsTitle: "新增",
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
    recordOrders() {
      const rows = this.$refs.multipleTable.selection;
      console.log(rows);
      if (rows.length>0) {
        for (let i in rows) {
          if (!rows[i].items.length>0) {
            this.$message({
              type: "error",
              message: "请填写pids",
            });
            return  false;
          }
        }
        record(rows).then((response) => {
          if (response.code === 200) {
            this.orders();
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          }
        });
      }else{
         this.$message({
              type: "error",
              message: "请选择一列",
            });
      }
       
    },
    itemsFormInit(row) {
      this.itemsDialogVisible = true;
      this.itemsForm = {};
      this.itemsForm.order_id = row.id;
      this.itemsType = "add";
      this.itemsTitle = "新增";
    },
    orderItemsStore() {
      itemsStore(this.itemsForm).then((resposne) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.orders();
        this.itemsDialogVisible = false;
      });
    },
    itemsEdit(data) {
      this.itemsType = "edit";
      this.itemsTitle = "修改";
      this.itemsDialogVisible = true;
      this.itemsForm = data;
    },
    orderItemsUpdate() {
      itemsUpdate(this.itemsForm).then((resposne) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.orders();
        this.itemsDialogVisible = false;
      });
    },
    orderItemsDelete(data) {
      itemsDelete(data).then((response) => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.orders();
        this.itemsDialogVisible = false;
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