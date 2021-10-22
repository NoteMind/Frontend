<template>
  <div class="fileContent">
    <!--<img :src="require('@/assets/pictures/documents/svgs/' + icon + '')" class="fileIcon">-->
    <i :class="currentIconClass"></i>
    <div class="navFont fileName">{{fileName}}</div>
  </div>
</template>

<script>
import '@/assets/css/font.css'

export default {
  name: 'fileItem',
  props: {
    fileName: String,
    isFolder: Boolean
  },
  data: function () {
    return {
    }
  },
  computed: {
    currentIconClass: function () {
      return this.isFolder ? 'icon iconfont icon-folder fileIcon' : 'icon iconfont icon-file1 fileIcon'
    }
  }
}
</script>

<style scoped>
  .fileContent{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 244px;
    height: 188px;
  }

  i.fileIcon{
    font-size: 38px;
    font-weight: 700;
    background-image: -webkit-linear-gradient(left bottom, #4ed5ff , #ff86c0);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .fileName{
    margin-top: 10px;
  }
</style>>
