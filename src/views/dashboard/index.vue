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
          <span style="display: inlineblock; float: left"
            >当月国家订单分布图:</span
          >
          <span
            style="color: #67c23a; display: inlineblock; float: right"
          ></span>
        </div>
        <div class="text item" style="margin: 5px 5px">
          <div id="ring" style="width: 300px; height: 200px"></div>
        </div>
      </el-card>
    </el-col>
    <el-col v-loading="weekLoading" :md="12" :sm="24">
      <div class="weekOrders" id="weekOrders"></div>
    </el-col>
    <el-col :md="12" :sm="24">
      <div class="weekTotal" id="weekTotal"></div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import { todayOrders } from "@/api/order";
import { mothCountryOrders } from "@/api/order";
import { orderStatistic } from "@/api/order";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  mounted() {
    this.getTodayOrders();
    this.ringInit();
    this.orderWeekStatistic();
  },
  data() {
    return {
      value: new Date(),
      todaySales: 0,
      todayMostMoneyWeb: {},
      todayNumbers: 0,
      todayMostOrdersWeb: {},
      MotnCountryStatistcs: [],
      weekLoading: true,
    };
  },
  methods: {
    ringInit() {
      mothCountryOrders().then((response) => {
        if (response.code === 200) {
          const data = response.data;
          const res = [];
          for (let i in data) {
            res.push({
              value: data[i].nums,
              name: data[i].country,
            });
          }
          const ringChart = echarts.init(document.getElementById("ring"));
          ringChart.setOption({
            title: {
              text: "国家订单图",
              left: "center",
              top: "center",
            },
            series: [
              {
                type: "pie",
                data: res,
                radius: ["40%", "70%"],
              },
            ],
          });
        }
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
    async orderWeekStatistic() {
      const request = {
        type: "week",
      };
      const { data } = await orderStatistic(request);
      console.log(data);
      let option = {
        title: {
          text: "一星期订单数量图",
          left: "center",
          top: "center",
        },
        xAxis: {
          data: data.week,
        },
        yAxis: {},
        series: [
          {
            data: data.orders,
            type: "line",
            smooth: true,
          },
        ],
      };
      const weekOrdersChart = echarts.init(
        document.getElementById("weekOrders")
      );
      const weekTotalChart = echarts.init(document.getElementById("weekTotal"));
      this.weekLoading = false;
      weekOrdersChart.setOption(option);
      weekTotalChart.setOption({
        title: {
          text: "一星期订单金额图",
          left: "center",
          top: "center",
        },
        xAxis: {
          data: data.week,
        },
        yAxis: {},
        series: [
          {
            data: data.total,
            type: "line",
            smooth: true,
          },
        ],
      });
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
@mixin echartsDiv {
  width: 800px;
  height: 400px;
  @media (max-width: 480px) {
    width: 400px;
    height: 400px;
  }
}
.weekOrders {
  @include echartsDiv();
}
.weekTotal {
  @include echartsDiv();
}
</style>
