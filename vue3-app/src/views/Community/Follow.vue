<script setup >
  import {informationListApi} from '../../api/community'

  informationListApi().then( res =>{
    console.log(res);
  })
</script>

<template>
  <div class="follow">
    关注
  </div>
</template>

<style scoped>

</style>