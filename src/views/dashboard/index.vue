<template>
  <el-row>
    <el-col :md="8" :sm="12">
      <el-card class="box-card cart1">
        <div slot="header" class="clearfix">
          <span style="display: inlineblock; float: left">今天销售金额:</span>
          <span style="color: #67c23a; display: inlineblock; float: right"
            >{{ todaySales }} $</span
          >
        </div>
        <div
          v-for="(item, key) in todayMostMoneyWeb"
          :key="key"
          class="text item"
          style="margin: 5px 5px"
        >
          {{ key + 1 }}
          <a :href="item.domain.url" target="_blank">{{ item.domain.url }}</a>
          <el-tag type="success"> {{ item.total_usd }} $</el-tag>
        </div>
      </el-card>
    </el-col>
    <el-col :md="8" :sm="12">
      <el-card class="box-card cart1">
        <div slot="header" class="clearfix">
          <span style="display: inlineblock; float: left">今天销售订单量:</span>
          <span style="color: #67c23a; display: inlineblock; float: right"
            >{{ todayNumbers }}
          </span>
        </div>
        <div
          v-for="(item, key) in todayMostOrdersWeb"
          :key="key"
          class="text item"
          style="margin: 5px 5px"
        >
          {{ key + 1 }}
          <a :href="item.domain.url" target="_blank">{{ item.domain.url }}</a>
          <el-tag type="info"> {{ item.numbers }} </el-tag>
        </div>
      </el-card>
    </el-col>
    <el-col :md="8" :sm="12">
      <el-card class="box-card cart1">
        <div slot="header" class="clearfix">
          <span style="display: inlineblock; float: left">今天销售金额:</span>
          <span
            style="color: #67c23a; display: inlineblock; float: right"
          ></span>
        </div>
        <div class="text item" style="margin: 5px 5px">
          <div id="ring" style="width: 300px; height: 200px"></div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="24">
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import { todayOrders } from "@/api/order";
import { options } from "runjs";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  mounted() {
    this.echartsInit();
    this.getTodayOrders();
    this.ringInit();
  },
  data() {
    return {
      value: new Date(),
      todaySales: 0,
      todayMostMoneyWeb: {},
      todayNumbers: 0,
      todayMostOrdersWeb: {},
    };
  },
  methods: {
    echartsInit() {
      const myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    ringInit() {
      const ringChart = echarts.init(document.getElementById("ring"));
      ringChart.setOption({
        title: {
          text: "圆环图的例子",
          left: "center",
          top: "center",
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 335,
                name: "A",
              },
              {
                value: 234,
                name: "B",
              },
              {
                value: 1548,
                name: "C",
              },
            ],
            radius: ["40%", "70%"],
          },
        ],
      });
    },
    async getTodayOrders() {
      const { data } = await todayOrders();
      const price = data.price;
      this.todaySales = data.price.total;
      this.todayMostMoneyWeb = data.price.web;
      this.todayNumbers = data.numbers.quantity;
      this.todayMostOrdersWeb = data.numbers.web;
    },
  },
};
</script>

<style lang='scss' scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.cart1 {
  margin: 5px;
}
</style>
