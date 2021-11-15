<template>
  <vue-markdown-editor
    class="mdpane"
    :class="{'Split2Right':isShowNav&!isShowMap,
      'Split2Left':!isShowNav&isShowMap,
      'Split':isShowNav&isShowMap,
      'Full':!isShowNav&!isShowMap}"
    v-on:ShowMap="onMoveMap()"
    height="calc(100vh)"
    :disabled-menus="[]"
    left-toolbar="h quote | ul table | link image code | save"
    right-toolbar="mindmap preview toc sync-scroll"
    :toolbar="toolbar"
    @upload-image="onUploadImage" @save="onSaveText"
    @change="onTextChange"
  />
</template>

<script>
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
import axios from 'axios'

VueMarkdownEditor.use(vuepressTheme, { Prism, extend (md) {} })

export default {
  data () {
    this.toolbar = {
      mindmap: {
        title: '查看思维导图',
        icon: 'v-md-icon-tip',
        // 点击按钮触发动作
        action (editor) {
          editor.$emit('ShowMap')
        },
        active: (editor) => true
      }
    }

    return {
    }
  },
  props: ['isShowNav', 'isShowMap'],
  components: {
    VueMarkdownEditor
  },

  methods: {
    // 上传图片
    onUploadImage (event, insertImage, files) {
      const file = files[0]
      const path = process.env.VUE_APP_BASE_API
      const index = path.lastIndexOf('/')
      const param = new FormData()
      param.append('image', file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(`${path}doc/uploadfile/`, param, config).then(r => {
        if (r.data.code === 200) {
          const last = path.slice(0, index)
          insertImage({
            url: last + r.data.data.url,
            desc: files[0].name
          })
        }
      }).catch(e => {
        this.Toast(2, '图片上传出了点小问题，请稍后重试')
      })
    },

    // 保存文本
    onSaveText (text, html) {

    },
    onMoveMap () {
      this.$emit('ShowMap')
    },
    onTextChange (text, html) {
      this.$emit('change', { text })
    }
  }
}
</script>

<style>
  .vuepress-markdown-body h1{ font-size: 28px; }
  .vuepress-markdown-body h2{ font-size: 26px; }
  .vuepress-markdown-body h3{ font-size: 24px; }
  .vuepress-markdown-body h4{ font-size: 22px; }
  .vuepress-markdown-body h5{ font-size: 20px; }
  .vuepress-markdown-body:not(.custom){padding: 5px 10px!important;}

  .mdpane {
    position: absolute;
  }

  .Full {
    left: 0px;
    width: calc(100vw);
    transition: left .5s, width .5s;
  }

  .Split2Right {
    left: 292px;
    width: calc(100vw - 292px);
    transition: left .5s, width .5s;
  }

  .Split2Left {
    left: 0px;
    width: calc(100vw - 400px);
    transition: left .5s, width .5s;
  }

  .Split {
    left: 292px;
    width: calc(100vw - 692px);
    transition: left .5s, width .5s;
  }
</style>
