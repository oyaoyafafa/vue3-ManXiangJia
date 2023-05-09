<script setup lang="ts"></script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less"> 
@import url('@/css/reset.css');
#app {
  margin: 0;
  padding: 0;
  a{
    text-decoration: none;
    outline: none;
  }
}
</style>
