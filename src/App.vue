<template>
  <div id="app">
    <div class="content">
      <navigation v-on:MoveNav="onMoveNav" :fileList="fileList"/>
      <router-view :fileList="fileList" class="topNav" @fileListChange="fileListChange"></router-view>
    </div>
  </div>
</template>

<script>
import navigation from '@/components/navigation/navigation.vue'
import axios from 'axios'

export default {
  components: {
    navigation
  },
  data: function () {
    return {
      fileList: [],
      nearlyFiles: []
    }
  },
  created: function () {
    axios({
      methods: 'get',
      url: 'http://127.0.0.1:8080/api/files',
      params: {
        plusFilePath: '',
        isTrash: false
      }
    }).then(res => {
      this.fileList = res.data
    })
  },
  methods: {
    fileListChange: function () {
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/files',
        params: {
          plusFilePath: '',
          isTrash: false
        }
      }).then(res => {
        this.fileList = res.data
      })
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
/*
  .content{
    display: flex;
  } */
</style>
