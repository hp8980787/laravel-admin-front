<template>
  <el-row v-loading="chartLoading">
    <el-col :md="8" :sm="8" style="margin: 10px">
      <el-select v-model="type" v-on:change="order()" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      选择
    </el-col>
    <el-col :md="24" :sm="24">
      <div class="chart-container">
        <chart
          v-if="!chartLoading"
          height="100%"
          width="100%"
          :orders="orders"
          :timeType="type"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Chart from "@/components/Charts/MixChart";
import { orderStatistic } from "@/api/order";
export default {
  name: "MixChart",
  components: { Chart },
  data() {
    return {
      chartLoading: true,
      type: "day",
      orders: {},
      options: [
        {
          label: "每天",
          value: "day",
        },
        {
          label: "每周",
          value: "week",
        },
        {
          label: "每月",
          value: "month",
        },
        {
          label: "每年",
          value: "year",
        },
      ],
    };
  },
  mounted() {
    this.order();
  },
  methods: {
    async order() {
      this.chartLoading = true;
      const { data } = await orderStatistic({ type: this.type });
      this.orders = data;
      this.chartLoading = false;
      console.log(data);
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>