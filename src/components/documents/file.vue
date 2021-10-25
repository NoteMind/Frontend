<template>
  <div>
    <div class="fileContent" @mouseover="isShow = true"  v-onoutside="handleClose">
      <i :class="currentIconClass"></i>
      <div class="navFont fileName">{{fileName}}</div>
      <div class="cover" v-show="isShow">
        <div class="coverItem" v-show="!isTrash" @click="open"><i class="icon iconfont icon-open coverIcon"></i></div>
        <div class="coverItem" v-show="isTrash" @click="backOrDeleteFile(fileName)"><i class="icon iconfont icon-arrow_backward coverIcon"></i></div>
        <div class="coverItem" @click="backOrDeleteFile(fileName)"><i class="icon iconfont icon-trash coverIcon"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/font.css'
import axios from 'axios'

export default {
  name: 'fileItem',
  props: {
    fileName: String,
    isFolder: Boolean,
    isTrash: Boolean
  },
  data: function () {
    return {
      isShow: false
    }
  },
  computed: {
    currentIconClass: function () {
      return this.isFolder ? 'icon iconfont icon-folder fileIcon' : 'icon iconfont icon-file1 fileIcon'
    }
  },
  methods: {
    handleClose: function () {
      this.isShow = false
    },
    backOrDeleteFile: function (fileName) {
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/backOrDeleteFile',
        params: {
          plusFilePath: fileName
        }
      }).then(res => {
        this.$emit('deleteFlush')
      })
    },
    open: function () {
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8080/api/recordFile',
        params: {
          fileName: this.fileName
        }
      }).then(res => {
        this.$emit('open', res.data)
      })
    }
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
  .fileContent{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 188px;
  }

  i.fileIcon{
    font-size: 45px;
    font-weight: 700;
    background-image: -webkit-linear-gradient(left bottom, #4ed5ff , #ff86c0);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .fileName{
    margin-top: 10px;
  }

  .covered{
    position: absolute;
    z-index: 1;
  }

  .cover{
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: 150px;
    height: 150px;
    background-color: #080821;
    opacity: 0.9;
    border-radius: 10px;
  }

  .coverIcon{
    color: white;
    font-size: 34px;
  }

  .coverItem{
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .coverItem:hover{
    background: linear-gradient(180deg, #4ED5FF 0%, #FF86C0 100%);
  }

</style>>
