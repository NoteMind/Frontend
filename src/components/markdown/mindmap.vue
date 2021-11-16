<template>
  <div class="ytymindmap">
    <svg id="mindmap" />
  </div>
</template>

<script>
import { transform } from 'markmap-lib/dist/transform'
import { markmap } from 'markmap-lib/dist/view'
import debounce from 'lodash/debounce'

export default {
  name: 'mindmap',

  data () {
    return {
      markmap: null,
      editor: null
    }
  },
  props: ['markdown'],
  created () {
    this.initializeDocumentElementClientDimensionalChangeListener(
      document.documentElement,
      window
    )
    this.initializePaneDimensions()
      .then(this.updatePaneHeightOrPaneWidthRatioPerCurrentPaneMode)
  },

  mounted () {
    this.markmap = this.instantiateMarkmap()
  },

  watch: {
    markdown: {
      handler (newMarkdown) {
        this.markmap.setData(transform(newMarkdown))
        this.saveTextToLocalStorage()
      },
      deep: true
    }
  },

  methods: {
    async initializePaneDimensions () {
      while (!document.getElementById('toolbar')?.clientHeight) {
        await new Promise(resolve => { setTimeout(resolve, 100) })
      }
      this.editorPaneElementClientWidth = this.elementClientWidthGetter('editor-pane')
      this.mindmapPaneElementClientWidth = this.elementClientWidthGetter('mindmap-pane')
      this.editorPaneElementClientHeight = this.elementClientHeightGetter('editor-pane')
      this.mindmapPaneElementClientHeight = this.elementClientHeightGetter('mindmap-pane')
    },
    resetPaneDimensionsIfPaneModeChanges () {
      if (this.shouldResetHeightAndWidth) {
        if (this.paneMode === 'left-right') {
          this.editorPaneElementClientHeight = null
          this.mindmapPaneElementClientHeight = null
        } else if (this.paneMode === 'top-bottom') {
          this.editorPaneElementClientWidth = null
          this.mindmapPaneElementClientWidth = null
        }
        this.shouldResetHeightAndWidth = false
      }
    },
    setPaneDimensions () {
      this.$nextTick(
        () => {
          if (this.paneMode === 'left-right') {
            this.editorPaneElementClientWidth = this.paneWidthRatio.editor * this.documentElementClientWidth
            this.mindmapPaneElementClientWidth = this.paneWidthRatio.mindmap * this.documentElementClientWidth
            this.editorPaneElementClientHeight = this.paneClientHeight
            this.mindmapPaneElementClientHeight = this.paneClientHeight
          } else if (this.paneMode === 'top-bottom') {
            this.editorPaneElementClientHeight = this.paneHeightRatio.editor * this.paneClientHeight
            this.mindmapPaneElementClientHeight = this.paneHeightRatio.mindmap * this.paneClientHeight
            this.editorPaneElementClientWidth = this.documentElementClientWidth
            this.mindmapPaneElementClientWidth = this.documentElementClientWidth
          }
        }
      )
    },

    initializePaneResizing (edtiorClass, mindmapClass, resizeHandleClass = '.resize-handle') {
      const edtiorElement = document.querySelector(edtiorClass)
      const mindmapElement = document.querySelector(mindmapClass)
      const resizeHandles = document.querySelectorAll(resizeHandleClass)
      const minimumSize = 0

      const events = {
        touch: {
          start: 'touchstart',
          move: 'touchmove',
          end: 'touchend'
        },
        mouse: {
          start: 'mousedown',
          move: 'mousemove',
          end: 'mouseup'
        }
      }

      const resizeHandler = eventType => {
        const { move, end } = events[eventType]
        return (
          event => {
            event.preventDefault()

            const originalEditorWidth = parseFloat(getComputedStyle(edtiorElement, null).getPropertyValue('width').replace('px', ''))
            const originalEditorHeight = parseFloat(getComputedStyle(edtiorElement, null).getPropertyValue('height').replace('px', ''))
            const originalMindmapWidth = parseFloat(getComputedStyle(mindmapElement, null).getPropertyValue('width').replace('px', ''))
            const originalMindmapHeight = parseFloat(getComputedStyle(mindmapElement, null).getPropertyValue('height').replace('px', ''))
            const originalMouseX = event.pageX
            const originalMouseY = event.pageY

            const resize = event => {
              if (this.paneMode === 'left-right') {
                const editorWidth = originalEditorWidth + (event.pageX - originalMouseX)
                const mindmapWidth = originalMindmapWidth - (event.pageX - originalMouseX)

                if (editorWidth > minimumSize && mindmapWidth > minimumSize) {
                  this.editorPaneElementClientWidth = editorWidth
                  this.editorPaneElementClientHeight = this.paneClientHeight

                  this.mindmapPaneElementClientWidth = mindmapWidth
                  this.mindmapPaneElementClientHeight = this.paneClientHeight
                }
              }
              if (this.paneMode === 'top-bottom') {
                const editorHeight = originalEditorHeight + (event.pageY - originalMouseY)
                const mindmapHeight = originalMindmapHeight - (event.pageY - originalMouseY)

                if (editorHeight > minimumSize && mindmapHeight > minimumSize) {
                  this.editorPaneElementClientWidth = this.documentElementClientWidth
                  this.editorPaneElementClientHeight = editorHeight

                  this.mindmapPaneElementClientWidth = this.documentElementClientWidth
                  this.mindmapPaneElementClientHeight = mindmapHeight
                }
              }

              this.updatePaneHeightOrPaneWidthRatioPerCurrentPaneMode()
              this.fitMindmap()
            }
            const stopResize = () => { window.removeEventListener(move, resize) }

            window.addEventListener(move, resize)
            window.addEventListener(end, stopResize)
          }
        )
      }

      for (const resizeHandle of resizeHandles) {
        resizeHandle.addEventListener(events.mouse.start, resizeHandler('mouse'))
        resizeHandle.addEventListener(events.touch.start, resizeHandler('touch'))
      }
    },
    initializeDocumentElementClientDimensionalChangeListener (documentElement, window) {
      this.documentElementClientWidth = documentElement.clientWidth
      this.documentElementClientHeight = documentElement.clientHeight

      window.addEventListener('resize', () => {
        this.documentElementClientWidth = documentElement.clientWidth
        this.documentElementClientHeight = documentElement.clientHeight
      })
    },
    elementClientWidthGetter (elementId) {
      const element = document.getElementById(elementId)
      return element.clientWidth
    },
    elementClientHeightGetter (elementId) {
      const element = document.getElementById(elementId)
      return element.clientHeight
    },
    getToolbarElementHeight () {
      return document.getElementById('toolbar').clientHeight
    },
    instantiateMarkmap () {
      return markmap('#mindmap', transform(this.markdown), { autoFit: true })
    },
    fitMindmap: debounce(function () {
      this.markmap.fit()
    }, 5)
  }
}
</script>

<style>
  .ytymindmap {
    position: absolute;
    top:0px;
    left:calc(100vw - 400px);
    height: calc(100vh);
    width: 400px;
    background-color: rgb(247, 247, 247);
  }

  #mindmap{
    height: 100%;
    width: 100%;
  }
</style>
