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
          <el-table-column label="pids" width="200">
            <template slot-scope="scope">
              <el-row v-if="scope.row.pids">
                <el-col :span="12">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.row.pids"
                    placement="top"
                  >
                    <el-button size="small">{{ scope.row.pids }}</el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="6">
                  <el-button
                    type="info"
                    @click="scope.row.pids = ''"
                    size="small"
                    >edit</el-button
                  ></el-col
                >
              </el-row>

              <el-row v-else>
                <el-col :span="12">
                  <el-input
                    size="mini"
                    v-model="pcodes[scope.row.id]"
                  ></el-input
                ></el-col>
                <el-col :span="6">
                  <el-button
                    type="success"
                    size="small"
                    v-on:click="savePcode(pcodes[scope.row.id], scope.row.id)"
                    >save</el-button
                  ></el-col
                >
              </el-row>
            </template>
          </el-table-column>
          <el-table-column prop="trans_id" label="Trans_ID"> </el-table-column>
          <el-table-column prop="order_status" label="订单状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.record_status === 0" type="waring"
                >未录单</el-tag
              >
              <el-tag v-else-if="scope.row.record_status === 1" type="info"
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
              <el-button size="small" type="info"> 填入pcode </el-button>
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
import { index } from "@/api/grossOrder";
import { update } from "@/api/grossOrder";
import {record} from "@/api/grossOrder"
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
      pcodes: {},
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
    savePcode(data, id) {
      if (data) {
        update({ id: id, pids: data })
          .then((response) => {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "修改失败",
            });
          });
      } else {
        this.$message({
          type: "error",
          message: "不能为空",
        });
      }
    },
    recordOrders() {
        const rows =this.$refs.multipleTable.selection
        for(let i in rows){
            if(!rows[i].pids){
                this.$message({
                    type:'error',
                    message:'请填写pids'
                });
                break;
            }
        }
       record(rows).then(response=>{
           if(response.code===200){
               this.$message({
                   type:'success',
                   message:'添加成功!'
               })
           }
       })
   
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