<template>
  <div id="index">
    <h2 align="left">> 净资产收益率</h2>
    <mu-text-field label="股票代码" hintText="股票代码" v-model="code" labelFloat @blur="querybycode($event.currentTarget.value)"/>
    <mu-date-picker v-model="start_date" mode="landscape" hintText="开始日期"/>
    
    <div id="personal-chart"></div>
    <div id="personal-content">
      <ul>
        <mu-table height="500px">
          <mu-thead>
            <mu-tr>
              <mu-th>报告日期</mu-th>
              <mu-th>净资产收益率</mu-th>
              <mu-th>净资产收益率（摊薄）</mu-th>
            </mu-tr>
          </mu-thead>
          <template v-for="item in items">
            <mu-tbody v-bind:key="item">
              <mu-tr>
                <mu-td>{{ item['report_date_str'] }}</mu-td>
                <mu-td>{{ item['ROE_str'] }}</mu-td>
                <mu-td>{{ item['ROE_str'] }}</mu-td>
              </mu-tr>
            </mu-tbody>
          </template>
        </mu-table>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import echarts from 'echarts'

export default {
  data() {
    return {
      itemd: {
        user: sessionStorage.user
      },
      items: [],
      datas: [],
      years: [],
      length: null,
      chart: null,
      start_date: null,
      end_date: null,
      code: '000001'
    }
  },
  methods: {
    ready() {
      this.querybycode(this.code)
    },

    querybycode(code) {
      axios
        .get('http://localhost:3000/stockroe?code=' + code)
        .then(response => {
          this.items = response.data.result
          this.length = this.items.length
          for (var v of this.items) {
            this.datas.push(v['ROE'])
            this.years.push(v['report_date_str'])
          }
          this.drawline('personal-chart')
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    drawline(id) {
      this.chart = echarts.init(document.getElementById(id))
      // 报告日期，date
      // 报告期的净资产收益率，data
      var date = []
      var data = []

      for (var i = 1; i < this.datas.length; i++) {
        date.push(this.years[i])
        data.push(this.datas[i])
      }

      /* var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];

      var data = [Math.random() * 300];

      for (var i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      } */

      var option = {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          text: '净资产收益率'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          },
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: '净资产收益率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)',
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{b}\n{c}%'
                }
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: data
          }
        ]
      }
      this.chart.setOption(option)
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.ready()
    })
  }
}
</script>
<style lang="css">
#logo {
  width: 20%;
  height: 20%;
}

.mu-item {
  font-size: 2em;
}

#personal-content {
  margin-top: 2%;
}

#personal-chart {
  position: relative;
  left: 0;
  margin-left: 0px;
  margin-bottom: 0px;
  width: 800px;
  height: 500px;
  border-radius: 10px;
}

li {
  float: left;
}
</style>