<template>
  <div id="index">
    <h2 align="left">> 股票列表</h2>
    <mu-text-field label="股票代码" hintText="股票代码" v-model="code" labelFloat/>
    <mu-raised-button label="增加" @click="add()"/>
    <mu-raised-button label="删除" @click="del()"/>
    <div id="personal-content">
      <ul>
        <mu-table height="600px" width="800px" fixedHeader>
          <mu-thead>
            <mu-tr>
              <mu-th>代码</mu-th>
              <mu-th>名称</mu-th>
              <mu-th>收盘价</mu-th>
              <mu-th>市场</mu-th>
              <mu-th>操作</mu-th>
            </mu-tr>
          </mu-thead>
          <template v-for="item in items">
            <mu-tbody v-bind:key="item">
              <mu-tr>
                <mu-td>{{ item['code'] }}</mu-td>
                <mu-td>{{ item['name'] }}</mu-td>
                <mu-td>{{ item['pre_close'] }}</mu-td>
                <mu-td>{{ item['sse'] }}</mu-td>
                <mu-td>
                  
                </mu-td>
              </mu-tr>
            </mu-tbody>
          </template>
        </mu-table>
        <mu-pagination
          :total="total"
          :current="current"
          @pageChange="handlePagination"
          :showSizeChanger="showSizeChanger"
          :pageSizeOption="pageSizeOption"
          @pageSizeChange="handlePageSize"
        ></mu-pagination>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Qs from 'qs'
export default {
  data() {
    return {
      itemd: {
        user: sessionStorage.user
      },
      items: [''],
      length: 0,
      total: 10,
      code: null,
      current: 1,
      current_size: 10,
      showSizeChanger: true,
      pageSizeOption: [10, 20, 30, 40],
      command: null
    }
  },
  methods: {
    add() {
      var code = document.getElementsByClassName('mu-text-field-input')[0]
        .value
      var data = { code: code }
      axios
        .post(process.env.BASE_API + 'stockfav', Qs.stringify(data))
        .then(response => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    del() {
      var code = document.getElementsByClassName('mu-text-field-input')[0]
        .value
      var data = { code: code }
      axios
        .delete(process.env.BASE_API + 'stockfav', { params: data })
        .then(response => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    ready() {
      this.query(this.current, this.current_size)
    },
    handlePagination(page) {
      this.query(page, this.current_size)
    },
    handlePageSize(page_size) {
      this.query(this.current, page_size)
    },
    handleChange() {

    },
    query(page, page_size) {
      axios
        .get(process.env.BASE_API + 'stocklist?page=' +
            page +
            '&page_size=' +
            page_size
        )
        .then(response => {
          this.total = response.data.total
          this.current = response.data.page
          this.current_size = response.data.page_size
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