<template>
  <div>
    <div :class="isShow?'ShowMenu':'HideMenu'">
      <user class="userContent"></user>
      <search class="searchContent"></search>
      <div class="menu">
        <navigaiton-item menuName="我的文档" iconSrc="home_black_24dp.svg">
        </navigaiton-item>
        <navigaiton-item menuName="快速访问" iconSrc="thunder_black_24dp.svg">
        </navigaiton-item>
        <navigaiton-item menuName="最近编辑" iconSrc="history_black_24dp.svg">
        </navigaiton-item>
        <navigaiton-item menuName="回收站" iconSrc="delete_black_24dp.svg">
        </navigaiton-item>
      </div>
    </div>
    <img src="@/assets/pictures/navigation/btn-hide.png" :class="isShow?'ShowBtn':'HideBtn'" @click="isHideNav">
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
  .ShowMenu{
    position: absolute;
    height: 800px;
    width: 292px;
    background-color: #F7F7F7;
    transform: translate(0px,0px);
    transition:transform .5s;
  }

  .HideMenu{
    position: absolute;
    height: 800px;
    width: 292px;
    background-color: #F7F7F7;
    transform: translate(-292px,0px);
    transition:transform .5s;
  }

  .ShowBtn{
    position: absolute;
    width: 25px;
    border-radius: 25px;
    top: 400px;
    left: 39px;
    transform: translate(240px,0px) rotate(0);
    transition: transform .5s;
  }

  .HideBtn{
    position: absolute;
    width: 25px;
    border-radius: 25px;
    top: 400px;
    transform: translate(0px,0px) rotate(180deg);
    transition: transform .5s;
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
