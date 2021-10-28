<template>
  <div>
    <navigation v-on:MoveNav="isShowNav=!isShowNav"></navigation>
    <markdown :isShowNav="isShowNav"></markdown>
  </div>
</template>

<script>
import navigation from '@/components/navigation/navigation.vue'
import markdown from '@/components/markdown/markdown.vue'

export default {
  name: 'workspace',
  components: {
    navigation,
    markdown
  },
  data() {
    return {
      isShowNav:true
    }
  }
}
</script>

<style>

</style>
