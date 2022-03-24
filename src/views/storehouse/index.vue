<template>
  <el-row style="margin: 5px" v-loading="isLoading">
    <el-col :span="24" style="margin: 5px 5px">
      <el-row>
        <el-col :md="8">
          <el-button
            @click="
              (addDialogVisible = true),
                (type = 'add'),
                (dialogTitle = '新增'),
                (form = {})
            "
            type="success"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="country_id" prop="country_id"></el-table-column>
        <el-table-column label="国家">
          <template slot-scope="scope">
            {{ scope.row.country.name }}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="attention"></el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button style="margin: 0 5px 0 5px" type="info" @click="formEdit(scope.row)">编辑</el-button>
            <el-popconfirm  title="确定删除吗?" @onConfirm="formDelete(scope.row.id)" confirm-button-type="warning">
              <el-button type="warning" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addDialogVisible"
      width="600px"
    >
      <el-form :model="form" :rules="formRules" ref="formRules">
        <el-form-item label="名称" prop="name" :label-width="formlabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="国家"
          prop="country_id"
          :label-width="formlabelWidth"
        >
          <el-select filterable v-model="form.country_id">
            <el-option
              v-for="(item, key) in countries"
              :key="key"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formlabelWidth">
          <el-input v-model="form.attention" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="formStore()">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import * as storehouseRequest from "@/api/storehouse";
import * as CountryRequest from "@/api/country";
export default {
  name: "Index",
  data() {
    return {
      tableData: [],
      isLoading: true,
      addDialogVisible: false,
      form: {},
      formRules: {
        name: [{ required: true, trigger: "blur", message: "必须" }],
        country_id: [{ required: true, trigger: "blur", message: "必须" }],
      },
      formlabelWidth: "50px",
      countries: {},
      dialogTitle: "新增",
      type: "add",
    };
  },
  mounted() {
    this.countryActiveList();
    this.storehouseList();
  },
  methods: {
    storehouseList() {
      storehouseRequest
        .index()
        .then((response) => {
          if (response.code === 200) {
            this.isLoading = false;
            this.tableData = response.data;
          }
        })
        .catch((error) => {});
    },
    countryActiveList() {
      CountryRequest.index({ status: 1 }).then((response) => {
        if (response.code === 200) {
          this.countries = response.data;
        }
      });
    },
    formStore() {
      this.$refs["formRules"].validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            storehouseRequest.create(this.form).then((response) => {
              if (response.code === 200) {
                this.addDialogVisible = false;
                this.storehouseList();
                this.$message({
                  type: "success",
                  message: "添加成功!",
                });
              }
            });
          } else {
            storehouseRequest.update(this.form).then((response) => {
              if (response.code === 200) {
                this.addDialogVisible = false;
                this.storehouseList();
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    formDelete(id) {
      storehouseRequest.destroy(id).then((response) => {
        if (response.code === 200) {
          this.addDialogVisible = false;
          this.storehouseList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    formEdit(data) {
      this.form = data;
      this.type = "edit";
      (this.dialogTitle = "修改"), (this.addDialogVisible = true);
    },
  },
};
</script>

<style>
</style>