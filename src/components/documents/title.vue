<template>
  <div class="titleContent">
    <div class="fileTitleFont fileTitle">{{titleName}}</div>
    <div v-onoutside="handleClose" @click="confirmed">
      <div class="dropMenu" @mouseover="show = true">
        <div class="navFont dropMenuText">自定义排序</div>
        <img src="@/assets/pictures/navigation/svgs/triangle_black_bottom.svg" class="triangleIcon">
      </div>
      <transition name="gradualChange">
        <div v-show="show">
          <div class="List navFont">
            <div class="ListItem" @click="getByName">标题A-Z</div>
            <div class="ListItem" @click="getByLength">文件大小</div>
            <div class="ListItem" @click="getByDate">最近编辑时间</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import '@/assets/css/font.css'
import axios from 'axios'

export default {
  name: 'fileTitle',
  props: {
    titleName: String
  },
  data: function () {
    return {
      show: false,
      fileList: [],
      is_trash: true
    }
  },
  methods: {
    handleClose: function () {
      this.show = false
    },
    confirmed: function () {
      this.show = true
    },
    getByName: function () {
      if (this.titleName === '我的文档') { this.is_trash = false }
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/files',
        params: {
          plusFilePath: '',
          isTrash: this.is_trash
        }
      }).then(res => {
        this.fileList = res.data
        this.$emit('getByName', this.fileList)
      })
    },
    getByLength: function () {
      if (this.titleName === '我的文档') { this.is_trash = false }
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/filesByDate',
        params: {
          plusFilePath: '',
          isTrash: this.is_trash
        }
      }).then(res => {
        this.fileList = res.data
        this.$emit('getByLength', this.fileList)
      })
    },
    getByDate: function () {
      if (this.titleName === '我的文档') { this.is_trash = false }
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/filesByLength',
        params: {
          plusFilePath: '',
          isTrash: this.is_trash
        }
      }).then(res => {
        this.fileList = res.data
        this.$emit('getByDate', this.fileList)
      })
    }
  },
  created: function () {
    this.getByName()
  },
  directives: {
    onoutside: {
      bind: function (el, binding, vnode) {
        // e为监听鼠标的参数
        function documentHandler (e) {
          // 判断区域
          if (el.contains(e.target)) {
            return
          }
          // 判断有无回调  有则执行
          if (binding.expression) {
            binding.value()
          }
        }
        el._vueonOutside_ = documentHandler
        // 绑定该方法到document上
        document.addEventListener('mouseover', documentHandler)
      },
      // 当节点删除时注销掉事件
      unbind: function (el, binding) {
        document.removeEventListener('mouseover', el._vueonOutside_)
        delete el._vueonOutside_
      }
    }
  }
}
</script>

<style scoped>
  .titleContent{
    display: flex;
    margin-top: 48px;
  }

  .fileTitle{
    margin-left: 57px;
    margin-top: 11px;
  }

  .dropMenu{
    z-index: 1;
    display: flex;
    margin-left: 864px;
    height: 35px;
    width: 122px;
    border: 0.5px solid #A9A9A9;
    box-sizing: border-box;
    border-radius: 7px;
    align-items: center;
  }

  .dropMenuText{
    margin-left: 21px;
    user-select: none;
  }

  .triangleIcon{
    width: 12px;
    margin-left: 8px;
  }

  .List{
    position: absolute;
    margin-left: 864px;
    padding-top: 8px;
    width: 122px;
    height: 99px;
    box-shadow: 0px 7px 16px 4px rgba(179, 179, 179, 0.25);
    background-color: white;
  }

  .ListItem{
    display: flex;
    width: 122px;
    margin-left: 21px;
    margin-top: 14px;
    align-items: center;
  }

  .gradualChange-enter-active, .gradualChange-leave-active{
    transition: opacity .5s;
  }

  .gradualChange-enter, .gradualChange-leave-to {
    opacity: 0;
  }

  .moveout {
    animation: mout 2s;
  }
</style>
