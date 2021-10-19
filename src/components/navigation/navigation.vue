<template>
  <div>
    <div class="nav" v-show="isShow">
      <user class="userContent"></user>
      <search class="searchContent"></search>
      <div class="menu">
        <navigaiton-item menuName="我的文档">
          <img slot="navIcon" src="@/assets/pictures/navigation/home.png">
        </navigaiton-item>
        <navigaiton-item menuName="快速访问">
          <img slot="navIcon" src="@/assets/pictures/navigation/flash.png">
        </navigaiton-item>
        <navigaiton-item menuName="最近编辑">
          <img slot="navIcon" src="@/assets/pictures/navigation/time.png">
        </navigaiton-item>
        <navigaiton-item menuName="回收站">
          <img slot="navIcon" src="@/assets/pictures/navigation/trash.png">
        </navigaiton-item>
      </div>
    </div>
    <img src="@/assets/pictures/navigation/leftarrow.png" class="hideNav" @click="isHideNav">
  </div>
</template>

<script>
import user from '@/components/navigation/user.vue'
import search from '@/components/navigation/search.vue'
import NavigaitonItem from '@/components/navigation/navigaitonItem.vue'

export default {
  name: 'navigation',
  components: {
    user,
    search,
    NavigaitonItem
  },
  data: function () {
    return {
      isShow: true
    }
  },
  methods: {
    isHideNav: function () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style>
  .nav{
    position: absolute;
    height: 800px;
    width: 292px;
    background-color: #F7F7F7;
  }

  .hideNav{
    position: relative;
    width: 25px;
    border-radius: 25px;
    box-shadow: #6e6d6d 0px 0px 3px;
    top: 400px;
    left: 279px;
  }

  .userContent{
    margin-left: 17px;
    margin-top: 15px;
  }

  .searchContent{
    margin-left: 17px;
    margin-top: 20px;
  }

  .menu{
    margin-top: 12px;
  }
</style>
