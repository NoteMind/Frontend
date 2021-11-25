<template>
  <div class="content_work">
    <markdown
      id="mdid"
      @change="onTextChange"
      :isShowNav="isShowNav"
      :isShowMap="isShowMap"
      v-on:ShowMap="onMoveMap"
      :markdown="markdown"
    />

    <splitbar id="barid" v-if="isShowMap" @mousedown.native="drag" />

    <mindmap ref="mapref" id="mapid" v-if="isShowMap" :markdown="markdown" />
  </div>
</template>

<script>
import markdown from '@/components/markdown/markdown.vue'
import mindmap from '@/components/markdown/mindmap.vue'
import splitbar from '@/components/splitbar.vue'

export default {
  name: 'workspace',
  props:['isShowNav'],
  components: {
    markdown,
    mindmap,
    splitbar
  },

  data () {
    return {
      isShowMap: false,
      mdContent: '',
      mdWidth: 0,
      markdown: ''
    }
  },

  mounted () {
    this.stopMove()
    this.markdown = this.$route.query.markdown
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // console.log(val)
        this.markdown = val.query.markdown
      }
    },
    isShowNav: function (newStatus, oldStatus) {
      const left = document.getElementById('mdid')
      const bar = document.getElementById('barid')
      const right = document.getElementById('mapid')
      const diffVal = bar.left
      
      if (this.isShowNav) {
        left.style.width = diffVal - 292 + 'px'
      } else {
        left.style.width = ''
        left.style.width = diffVal + 'px'
      }
      left.style.right = diffVal + 'px'
      left.style.transition = 0 + 's'
      right.style.width = document.body.clientWidth - diffVal + 'px'
      right.style.left = diffVal + 'px'

      left.style.transition = 0.5 + 's'
      this.mdWidth = parseInt(left.style.width)
      const map = this.$refs.mapref
      map.fitMindmap()
    }
  },

  methods: {
    stopMove () {
      const m = function (e) { e.preventDefault() }
      console.log(m)
      document.body.style.overflow = 'hidden'
    },
    onTextChange (text) {
      this.markdown = text.text
    },
    drag (e) {
      const left = document.getElementById('mdid')
      const bar = document.getElementById('barid')
      const right = document.getElementById('mapid')

      const barLeft = e.clientX
      bar.left = bar.offsetLeft
      const outer = this
      document.onmousemove = function (e) {
        const diffVal = bar.left + (e.clientX - barLeft)
        bar.style.left = diffVal + 'px'
        
        if (outer.isShowNav) {
          left.style.width = diffVal - 292 + 'px'
        } else {
          left.style.width = ''
          left.style.width = diffVal + 'px'
        }
        left.style.right = diffVal + 'px'
        left.style.transition = 0 + 's'

        right.style.width = document.body.clientWidth - diffVal + 'px'
        right.style.left = diffVal + 'px'
      }
      document.onmouseup = function () {
        left.style.transition = 0.5 + 's'
        document.onmousemove = null
        document.onmouseup = null
        outer.mdWidth = parseInt(left.style.width)
        const map = outer.$refs.mapref
        map.fitMindmap()
      }
    },
    onMoveMap (e) {
      this.isShowMap = !this.isShowMap
      const left = document.getElementById('mdid')
      left.style.width = ''
    }
  }
}

</script>

<style scoped>
.content_work {
  height: 100%;
  width: 100%;
  display: flex;
}
.content_work .topNav {
  position: absolute;
}
</style>
