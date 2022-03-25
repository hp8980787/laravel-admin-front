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
          :default-expand-all="true"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="expand" >
            <template slot-scope="scope">
              <TableExpand v-bind:itemsData="scope.row.items"></TableExpand>
            </template>
          </el-table-column>
          <el-table-column label="id" prop="id"></el-table-column>
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
          <el-table-column prop="pids" label="pids"> </el-table-column>
          <el-table-column prop="order_status" label="订单状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.order_status === 0" type="waring"
                >未发货</el-tag
              >
              <el-tag v-if="scope.row.order_status === 1" type="info"
                >已采购</el-tag
              >
              <el-tag v-if="scope.row.order_status === 3" type="info"
                >采购已完成未发货</el-tag
              >
              <el-tag v-if="scope.row.order_status == 4" type="success"
                >已发货</el-tag
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
                type="success"
                size="small"
                @click="orderShip(scope.row)"
                >发货</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
import { index } from "@/api/order";
import * as OrderRequest from "@/api/order";
import PurChaseDialog from "@/views/purchase/dialog.vue";
import TableExpand from "@/views/orders/TableExpland/order.vue";
export default {
  name: "Index",
  components: { TableExpand },
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
      purChaseDialogVisible: false,
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
    orderShip(data) {
      OrderRequest.ship(data).then((response) => {
        console.log(response.data);
      });
    },
    purchase() {
      this.purChaseDialogVisible = true;
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