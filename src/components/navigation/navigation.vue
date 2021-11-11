/* eslint-disable no-undef */
<template>
  <div>
    <div :class="isShow ? 'ShowMenu' : 'HideMenu'">
      <user class="userContent"></user>
      <search class="searchContent"></search>
      <div class="menu">
        <div v-for="item in menuList" :key="item.id" @click="isChoose(item.id)">
          <navigaiton-item
            :menuName="item.title"
            :iconSrc="item.icon"
            :isShow="item.id === currentMenuId"
            :isHideSub="isHideSub"
            :fileList="fileList">
          </navigaiton-item>
        </div>
      </div>
    </div>
    <img
      src="@/assets/pictures/navigation/btn-hide.png"
      :class="isShow ? 'ShowBtn' : 'HideBtn'"
      @click="isHideNav"
    />
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
  props: {
    fileList: Array
  },
  data: function () {
    return {
      isShow: true,
      currentMenuId: 1,
      isHideSub: false,
      menuList: [
        { id: 1, title: '我的文档', icon: 'home_black_24dp.svg' },
        { id: 2, title: '最近编辑', icon: 'history_black_24dp.svg' },
        { id: 3, title: '回收站', icon: 'delete_black_24dp.svg' }
      ]
    }
  },
  methods: {
    isHideNav: function () {
      this.isShow = !this.isShow
      // this.$emit('MoveNav')
    },
    isChoose: function (id) {
      this.currentMenuId = id
      if (id !== 1) {
        this.isHideSub = false
      }
      if (id === 1) {
        this.$router.push({ path: '/Documents' })
      } else if (id === 2) {
        this.$router.push({ path: '/Recent' })
      } else {
        this.$router.push({ path: '/Trash' })
      }
    }
  }
}
</script>

<style scoped>
.ShowMenu {
  z-index: 8;
  position: absolute;
  height: calc(100vh);
  width: 292px;
  background-color: #f7f7f7;
  transform: translate(0px, 0px);
  transition: transform 0.5s;
}

.HideMenu {
  z-index: 8;
  position: absolute;
  height: calc(100vh);
  width: 292px;
  background-color: #f7f7f7;
  transform: translate(-292px, 0px);
  transition: transform 0.5s;
}

.ShowBtn {
  z-index: 10;
  position: absolute;
  width: 25px;
  border-radius: 25px;
  top: 400px;
  left: 39px;
  transform: translate(240px, 0px) rotate(0);
  transition: transform 0.5s;
}

.HideBtn {
  z-index: 10;
  position: absolute;
  width: 25px;
  border-radius: 25px;
  top: 400px;
  transform: translate(0px, 0px) rotate(180deg);
  transition: transform 0.5s;
}

.userContent {
  margin-left: 17px;
  margin-top: 15px;
}

.searchContent {
  margin-left: 17px;
  margin-top: 20px;
}

.menu {
  margin-top: 12px;
}
</style>
