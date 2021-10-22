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
  .trashContent{
    display: flex;
    flex-direction: column;
    margin-left: 292px;
  }

  .filesDisplay{
    display: flex;
  }
</style>
