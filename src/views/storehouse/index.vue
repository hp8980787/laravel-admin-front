<template>
  <el-row style="margin: 5px" v-loading="isLoading">
    <el-col :span="24" style="margin: 5px 5px">
      <el-row>
        <el-col :md="8">
          <el-button @click="addDialogVisible=true" type="success">新增</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="国家" prop="country_id"></el-table-column>
        <el-table-column label="备注" prop="attention"></el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button>edit</el-button>
            <el-button>delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog title="新增" :visible.sync="addDialogVisible"   size="mini" width="600px">
        <el-form :model="form" :rules="formRules" ref="rormRules">
            <el-form-item label="名称" prop="name" :label-width="formlabelWidth" >
                <el-input v-model="form.name"></el-input>
            </el-form-item>
             <el-form-item label="国家" prop="country" :label-width="formlabelWidth" >
                
            </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button>
      </div>
    </el-dialog>

  </el-row>
</template>

<script>
import * as storehouseRequest from "@/api/storehouse";
export default {
  name: "Index",
  data() {
    return {
      tableData: [],
      isLoading: true,
      addDialogVisible: false,
      form:{},
      formRules:{},
      formlabelWidth:'50px',
    };
  },
  mounted() {
    this.storehouseList();
  },
  methods: {
    storehouseList() {
      storehouseRequest
        .index()
        .then((response) => {
          if (response.code === 200) {
            this.isLoading = false;
          }
        })
        .catch((error) => {});
    },
  },
};
</script>

<style>
</style>