<template>
  <div>
    <navigation></navigation>
    <markdown></markdown>
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
  }
}
</script>

<style>

</style>
