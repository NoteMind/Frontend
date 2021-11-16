<template>
  <div class="files">
    <fileTitle titleName="我的文档" class="documentsTile" @getByName="orderByName" @getByDate="orderByDate" @getByLength="orderByLength"></fileTitle>
    <div class="filesDisplay">
      <div v-for="(item, index) in fileList" :key="index">
        <fileItem :fileName="item.name" :isFolder="item.directory" @deleteFlush="flush" :isTrash="false"></fileItem>
      </div>
    </div>
  </div>
</template>

<script>
import fileTitle from '@/components/documents/title.vue'
import fileItem from '@/components/documents/file.vue'
import axios from 'axios'

export default {
  name: 'workspace',
  components: {
    fileTitle,
    fileItem
  },
  props: {
    fileList: Array
  },
  data: function () {
    return {
    }
  },
  watch: {
    fileList (val, oldVal) {
      this.$emit('fileListChange')
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
          isTrash: false
        }
      }).then(res => {
        this.fileList = res.data
      })
    }
  }
}
</script>

<style scoped>
  .documentsTile{
    margin-left: 292px;
  }

  .files{
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
