<template>
  <div class="nearlyContent">
    <fileTitle titleName="最近编辑" class="nearlyTile"></fileTitle>
    <div class="filesDisplay">
      <div v-for="(item, index) in fileList" :key="index">
        <fileItem :fileName="item.name" :isFolder="item.directory"  @open="openRecent" @deleteFlush="orderByName" :isTrash="false"></fileItem>
      </div>
    </div>
  </div>
</template>

<script>
import fileTitle from '@/components/documents/title.vue'
import fileItem from '@/components/documents/file.vue'
import axios from 'axios'

export default {
  name: 'nearlyPage',
  components: {
    fileTitle,
    fileItem
  },
  data: function () {
    return {
      fileList: []
    }
  },
  methods: {
    openRecent: function (data) {
      this.fileList = data
    }
  },
  created: function () {
    axios({
      methods: 'get',
      url: 'http://127.0.0.1:8080/api/showRecordFile',
      params: {
      }
    }).then(res => {
      this.fileList = res.data
    })
  }
}
</script>

<style scoped>
  .nearlyTile{
    margin-left: 292px;
  }
  .nearlyContent{
    display: flex;
    flex-direction: column;
  }

  .filesDisplay{
    margin-left: 292px;
    display: flex;
    flex-wrap: wrap;
  }
</style>
