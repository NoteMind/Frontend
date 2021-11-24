<template>
  <div class="trashContent">
     <fileTitle titleName="最近删除" class="trashTile" @getByName="orderByName" @getByDate="orderByDate" @getByLength="orderByLength"></fileTitle>
    <div class="filesDisplay">
      <div v-for="(item, index) in fileList" :key="index">
        <fileItem :fileName="item.name" :isFolder="item.directory" @deleteFlush="flush" :isTrash="true"></fileItem>
      </div>
    </div>
  </div>
</template>

<script>
import fileTitle from '@/components/documents/title.vue'
import fileItem from '@/components/documents/file.vue'
import axios from 'axios'

export default {
  name: 'tarshPage',
  components: {
    fileTitle,
    fileItem
  },
  props: {
  },
  data: function () {
    return {
      fileList: []
    }
  },
  methods: {
    orderByName: function (data) {
      this.fileList = data
    },
    orderByDate: function (data) {
      this.fileList = data
    },
    orderByLength: function (data) {
      this.fileList = data
    },
    flush: function (data) {
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/files',
        params: {
          plusFilePath: '',
          isTrash: true
        }
      }).then(res => {
        this.fileList = res.data
      })
    }
  }
}
</script>

<style scoped>
  .trashTile{
    margin-left: 292px;
  }
  .trashContent{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .filesDisplay{
    margin-left: 292px;
    display: flex;
    flex-wrap: wrap;
  }
</style>
