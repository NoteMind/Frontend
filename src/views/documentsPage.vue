<template>
  <div class="files">
    <fileTitle titleName="我的文档" class="documentsTile" @getByName="orderByName" @getByDate="orderByDate" @getByLength="orderByLength"></fileTitle>
    <div class="filesDisplay">
      <div v-for="(item, index) in fileList" :key="index">
        <fileItem :fileName="item.name" :isFolder="item.directory" @deleteFlush="orderByName"></fileItem>
      </div>
    </div>
  </div>
</template>

<script>
import fileTitle from '@/components/documents/title.vue'
import fileItem from '@/components/documents/file.vue'

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
  methods: {
    orderByName: function (data) {
      this.fileList = data
    },
    orderByDate: function (data) {
      this.fileList = data
    },
    orderByLength: function (data) {
      this.fileList = data
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
  }

  .filesDisplay{
    margin-left: 292px;
    display: flex;
  }
</style>
