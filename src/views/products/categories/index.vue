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
                  @click="handleClick(scope.row)"
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
                  <el-button type="text" size="small" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { index } from "@/api/products/category";
export default {
  name: "Category",
  data() {
    return {
      categoryData: [],
      keyword: "",
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
          this.categoryData = response.data.data;        }
      });
    },categoryDestroy(id){
        console.log(id);
    }
  },
};
</script>

<style>
</style>