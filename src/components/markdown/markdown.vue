<template>
    <div>
        <div class="upBar">
            <div class="hierarchy"></div>
            <div class="toolSet"></div>
        </div>
        <mdeditor v-model="markdownText" class="mdEditor"
          height="600"
          initialEditType="markdown"
          previewStyle="vertical"
        />
    </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'

export default {
  name: 'markdown',
  data () {
    return {
      markdownText: ''
    }
  },
  components: {
    mdeditor: Editor
  }
}
</script>

<style>
    .mdEditor {
        position: absolute;
        left: 350px;
        width: 1048px;
        height: 700px;
        background-color: white;
        margin-top: 42px;
    }
</style>
