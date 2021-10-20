<template>
  <div>
    <div class="selectedNav" :style="isShow ? selectedStyle : normalStyle" @click="hideOrShow">
      <img :src="require('@/assets/pictures/navigation/svgs/' + iconSrc + '')" class="navIcon">
      <div class="navFont menuName">{{menuName}}</div>
      <img src="@/assets/pictures/navigation/svgs/add_black_24dp.svg" name="plusIcon" class="plusIcon" v-show="isShow==true && menuName=='我的文档'">
      <img src="@/assets/pictures/navigation/svgs/triangle_black.svg" class="triangleIcon" v-show="isShow==true && menuName=='我的文档'&isHideSub===false">
      <img src="@/assets/pictures/navigation/svgs/triangle_black_bottom.svg" class="triangleIcon" v-show="isShow==true && menuName=='我的文档'&isHideSub===true">
    </div>
    <div v-show="menuName==='我的文档'&isShow===true&isHideSub===false" class="subMenuItem">
      <div v-for="(item, index) in fileList" :key="index">
        <subnavigation-item :icon="item.directory ? fileIcon : sfileIcon" :submenuName="item.name"></subnavigation-item>
      </div>
    </div>
  </div>
</template>

<script>
import subnavigationItem from '@/components/navigation/subnavigationItem.vue'
import axios from 'axios'

export default {
  name: 'navigation-item',
  components: {
    subnavigationItem
  },
  props: {
    menuName: String,
    iconSrc: String,
    isHideSub: Boolean,
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      selectedStyle: 'background: linear-gradient(265.28deg, rgba(248, 138, 195, 0.42) 32.03%, rgba(91, 207, 251, 0.42) 70.15%);',
      normalStyle: '',
      fileIcon: 'file_black.svg',
      sfileIcon: 'sfile_black.svg',
      fileList: [],
      subMenuList: [
        { icon: 'file_black.svg', name: 'NoteMind需求文档' },
        { icon: 'sfile_black.svg', name: '第一次会议记录' },
        { icon: 'sfile_black.svg', name: 'NoteMind概述' }
      ]
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
  },
  methods: {
    hideOrShow: function () {
      this.isHideSub = !this.isHideSub
    }
  }
}
</script>

<style>
  .selectedNav{
    display: flex;
    height: 42px;
    width: 258px;
    margin-left: 17px;
    align-items: center;
    border-radius: 10px;
  }

   .selectedNav:hover{
    background: linear-gradient(265.28deg, rgba(248, 138, 195, 0.42) 32.03%, rgba(91, 207, 251, 0.42) 70.15%);
  }

  .navIcon{
    margin-left: 7px;
    height: 14px;
    width: 14px;
  }

  .menuName{
    margin-left: 10.83px;
    flex-grow: 1;
  }

  .plusIcon{
    width: 9.92px;
    margin-right: 9.54px;
  }

  .triangleIcon{
    width: 12px;
    margin-right: 11px;
  }

  .subMenuItem{
    margin-top: 7px;
    height: auto;
  }
</style>
