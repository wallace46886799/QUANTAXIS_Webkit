<template>
  <div id="app">
    <mu-appbar title="Title">
      <mu-flat-button class="quantaxislogo" color="white" style="-webkit-app-region: drag" disable slot="left">QUANTAXIS</mu-flat-button>
      <mu-raised-button label="菜单" slot="right" @click="toggle()" />
      <mu-drawer right :open="open" @close="toggle()">
        <mu-appbar title="菜单" />
        <mu-list>
          <router-link to='/'>
            <mu-list-item title="首页" />
          </router-link>
          <router-link to='/personal/index'>
            <mu-list-item title="用户登录" />
          </router-link>
          <router-link to='/start'>
            <mu-list-item title="下载指引" />
          </router-link>
          <mu-list-item @click.native="open = false" title="关闭" />
        </mu-list>
      </mu-drawer>
    </mu-appbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.mu-flat-button-wrapper {
  font-size: 1.8em;
}
</style>
