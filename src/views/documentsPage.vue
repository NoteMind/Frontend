<template>
  <div class="documentsContent">
    <navigation :fileList="fileList"></navigation>
    <div class="files">
      <fileTitle class="documentsTile"></fileTitle>
      <div class="filesDisplay">
        <div v-for="(item, index) in fileList" :key="index">
          <fileItem :fileName="item.name" :isFolder="item.directory"></fileItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from '@/components/navigation/navigation.vue'
import fileTitle from '@/components/documents/title.vue'
import fileItem from '@/components/documents/file.vue'
import axios from 'axios'

export default {
  name: 'workspace',
  components: {
    navigation,
    fileTitle,
    fileItem
  },
  data: function () {
    return {
      fileList: []
    }
  },
  created: function () {
    axios({
      methods: 'get',
      url: 'http://127.0.0.1:8080/api/files',
      params: {
        plusFilePath: 'test'
      }
    }).then(res => {
      this.fileList = res.data
    })
  }
}
</script>

<style scoped>
  .documentsContent{
    display: flex;
  }

  .documentsTile{
    margin-left: 292px;
  }

  .files{
    display: flex;
    flex-direction: column;
  }

  .filesDisplay{
    margin-left: 292px;
    display: flex;
  }
</style>
