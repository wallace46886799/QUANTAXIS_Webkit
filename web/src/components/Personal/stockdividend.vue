<template>
  <div id="index">
    <div id="logo">
      <mu-list>
        <h2 align="left">> 股票分红</h2>
      </mu-list>
    </div>
    <div id="personal-chart">
    </div>
    <div id="personal-content">
      <ul>
        <mu-table height="500px" fixedHeader="true">
          <mu-thead>
              <mu-tr>
                <mu-th>报告期</mu-th>
                <mu-th>披露日期</mu-th>
                <mu-th>方案</mu-th>
                <mu-th>股息率</mu-th>
                <mu-th>除权除息日</mu-th>
                <mu-th>方案进度</mu-th>
              </mu-tr>
          </mu-thead>
          <template v-for="item in items">
            <mu-tbody v-bind:key="item">
              <mu-tr>
                <mu-td>{{ item['code'] }}</mu-td>
                <mu-td>{{ item['name'] }}</mu-td>
                <mu-td>{{ item['pre_close'] }}</mu-td>
                <mu-td>{{ item['sse'] }}</mu-td>
                <mu-td>{{ item['sse'] }}</mu-td>
                <mu-td>{{ item['sse'] }}</mu-td>
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
export default {
  data() {
    return {
      itemd: {
        user: sessionStorage.user
      },
      items: [''],
      length: null
    }
  },
  methods: {
    ready() {
      axios
        .get(process.env.BASE_API + 'stocklist')
        .then(response => {
          this.items = response.data.result
          this.length = this.items.length
        })
        .catch(function(error) {
          console.log(error)
        })
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

li {
  float: left;
}
</style>