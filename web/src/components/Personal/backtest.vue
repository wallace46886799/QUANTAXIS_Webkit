<template>
  <div id="index">
    <li class="input">
      <input
        v-model="message"
        v-on:keyup.enter="info($event.currentTarget.value)"
        placeholder="在此输入策略的用户名"
        lazy
      >
      <input
        v-model="messages"
        v-on:keyup.enter="code($event.currentTarget.value)"
        placeholder="在此输入策略涉及的股票代码"
        lazy
      >
    </li>
    <mu-table :height="height" :weight="weight">
      <mu-thead>
        <mu-tr>
          <mu-th>用户名称</mu-th>
          <mu-th>策略名称</mu-th>
          <mu-th>股票代码</mu-th>
          <mu-th>开始日期</mu-th>
          <mu-th>结束日期</mu-th>
          <mu-th>盈利</mu-th>
          <mu-th>Alpha收益</mu-th>
          <mu-th>年化收益率</mu-th>
        </mu-tr>
      </mu-thead>
      <template v-for="item in items">
        <mu-tbody v-bind:key="item">
          <mu-tr>
            <router-link :to="{ name:'history',params: {id:item['account_cookie'] }}">
              <mu-td>{{ item['user'] }}</mu-td>
              <mu-td>{{ item['strategy'] }}</mu-td>
              <mu-td>{{ item['stock_list'] }}</mu-td>
              <mu-td>{{ item['start_time'] }}</mu-td>
              <mu-td>{{ item['end_time'] }}</mu-td>
              <mu-td>{{ item['profit'] }}</mu-td>
              <mu-td>{{ item['alpha'] }}</mu-td>
              <mu-td>{{ item['annualized_returns'] }}</mu-td>
            </router-link>
          </mu-tr>
        </mu-tbody>
      </template>
    </mu-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      height: '500px',
      weight: '500px',
      multiSelectable: true,
      enableSelectAll: false,
      message: '',
      messages: '',
      items: [''],
      total: 180,
      current: 1,
      showSizeChanger: true
    }
  },
  methods: {
    info(message) {
      const val = message
      // console.log(val)
      axios
        .get('http://localhost:3000/backtest/info?name=' + val)
        .then(response => {
          this.items = response.data
          console.log(this.items)
          this.length = this.items.length
          var performance = response.data[0]['performance']
          console.log(performance)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    code(message) {
      const val = message
      // console.log(val)
      axios
        .get('http://localhost:3000/backtest/info_code?code=' + val)
        .then(response => {
          this.items = response.data
          console.log(this.items)
          this.length = this.items.length
          var performance = response.data[0]['performance']
          console.log(performance)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="css">
.mu-item {
  font-size: 10px;
}

#personal-content {
  margin-top: 2%;
}

.input {
  float: left;
}
</style>