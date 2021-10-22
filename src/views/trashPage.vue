<template>
  <div class="trashContent">
     <fileTitle titleName="最近删除" @getByName="orderByName" @getByDate="orderByDate" @getByLength="orderByLength"></fileTitle>
    <div class="filesDisplay">
      <div v-for="(item, index) in fileList" :key="index">
        <fileItem :fileName="item.name" :isFolder="item.directory" @deleteFlush="orderByName"></fileItem>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import fileTitle from '@/components/documents/title.vue'
import fileItem from '@/components/documents/file.vue'

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
    orderByName: function () {
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
    },
    orderByDate: function () {
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/filesByDate',
        params: {
          plusFilePath: '',
          isTrash: true
        }
      }).then(res => {
        this.fileList = res.data
      })
    },
    orderByLength: function () {
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/filesByLength',
        params: {
          plusFilePath: '',
          isTrash: true
        }
      }).then(res => {
        this.fileList = res.data
      })
    }
  },
  mounted: function () {
    this.orderByName()
  }
}
</script>

<style scoped>
  .trashContent{
    display: flex;
    flex-direction: column;
    margin-left: 292px;
  }

  .filesDisplay{
    display: flex;
  }
</style>
