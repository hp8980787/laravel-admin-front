<template>
  <el-row>
    <el-col :span="24">
    <div id="main" style="width: 600px;height:400px;"></div>
    </el-col>
 </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.echartsInit()
  },
  methods: {
    echartsInit() {
      const myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  }
}
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
</style>
