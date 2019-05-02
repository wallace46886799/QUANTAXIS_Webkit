<template>
  <div>
    <h2 align="left">> NOTEBOOK</h2>
    <div class="container">
      <mu-flat-button label="新增" class="demo-flat-button"/>
      <mu-flat-button label="修改" class="demo-flat-button"/>
      <mu-flat-button label="删除" class="demo-flat-button"/>
    </div>

    <mu-table multiSelectable enableSelectAll ref="table">
      <mu-thead>
        <mu-tr>
          <mu-th>ID</mu-th>
          <mu-th>名称</mu-th>
          <mu-th>最后更新时间</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr>
          <mu-td>1</mu-td>
          <mu-td>John Smith</mu-td>
          <mu-td>Employed</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
  </div>
</template>

<style>
.container {
  display: flex;
}

.demo-flat-button {
  margin: 12px;
}
</style>
