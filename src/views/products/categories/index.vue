<template>
  <div class="app-containe">
    <div class="filter-container">
      <el-row>
        <el-col style="margin: 5px" :lg="6" :md="6" :sm="8">
          <el-input v-model="keyword" placeholder="搜索"></el-input
        ></el-col>
      </el-row>
      <el-row style="margin: 10px" type="flex" justify="center">
        <el-col :span="24">
          <el-table :data="categoryData" style="width: 100%">
            <el-table-column prop="category_en" label="category_en">
            </el-table-column>
            <el-table-column prop="category_fr" label="category_fr">
            </el-table-column>
            <el-table-column prop="category_de" label="category_de">
            </el-table-column>
            <el-table-column prop="category_jp" label="category_jp">
            </el-table-column>
            <el-table-column prop="category_nl" label="category_nl">
            </el-table-column>
            <el-table-column prop="category_pt" label="category_pt">
            </el-table-column>
            <el-table-column prop="category_es" label="category_es">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="
                    editDialogVisible = true;
                    editForm = scope.row;
                  "
                  type="text"
                  size="small"
                  >修改</el-button
                >
                <el-popconfirm
                  confirm-button-text="好的"
                  cancel-button-text="不用了"
                  icon="el-icon-info"
                  icon-color="red"
                  title="是否删除分类？"
                  @onConfirm="categoryDestroy(scope.row.id)"
                >
                  <el-button type="text" size="small" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog
        title="提示"
        :visible.sync="editDialogVisible"
        width="30%"
        center
      >
        <el-form
          :model="editForm"
          :rules="rules"
          ref="editForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="英语分类" prop="category_en">
            <el-input v-model="editForm.category_en"></el-input>
          </el-form-item>
          <el-form-item label="德语分类" prop="category_de">
            <el-input v-model="editForm.category_de"></el-input>
          </el-form-item>
          <el-form-item label="法语分类" prop="category_fr">
            <el-input v-model="editForm.category_fr"></el-input>
          </el-form-item>
          <el-form-item label="荷兰语分类" prop="category_nl">
            <el-input v-model="editForm.category_nl"></el-input>
          </el-form-item>
          <el-form-item label="日语分类" prop="category_jp">
            <el-input v-model="editForm.category_jp"></el-input>
          </el-form-item>
          <el-form-item label="葡萄牙语分类" prop="category_pt">
            <el-input v-model="editForm.category_pt"></el-input>
          </el-form-item>
          <el-form-item label="西班牙语分类" prop="category_es">
            <el-input v-model="editForm.category_es"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateForm()">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { index } from "@/api/products/category";
import { update } from "@/api/products/category";
import { destroy } from "@/api/products/category";
export default {
  name: "Category",
  data() {
    return {
      categoryData: [],
      keyword: "",
      editDialogVisible: false,
      editForm: {},
      rules: {
        category_en: [
          {
            required: true,
            trigger: "blur",
            message: "不能为空",
          },
        ],
      },
    };
  },
  watch: {
    keyword(n, o) {
      this.categoryList({ keyword: n });
    },
  },
  mounted() {
    this.categoryList();
  },
  methods: {
    categoryList(data = {}) {
      index(data).then((response) => {
        //   this.categoryData.response.data.data;
        if (response.code === 200) {
          this.categoryData = response.data.data;
        }
      });
    },
    categoryDestroy(id) {
      destroy(id).then((response) => {
        if (response.code === 200) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$notify({
            title: "失败",
            message: "删除失败",
            type: "fail",
          });
        }
      });
    },
    updateForm() {
      update(this.editForm).then((response) => {
        this.editDialogVisible = false;
        if (response.code === 200) {
          this.$notify({
            title: "成功",
            message: "这是一条成功的提示消息",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style>
</style>