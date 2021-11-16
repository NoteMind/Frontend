<template>
  <div class="barclass"></div>
</template>

<script>
export default {
}
</script>

<style>
.barclass {
  z-index: 7;
  position: absolute;
  top: 0;
  left: calc(100vw - 403px);
  height: calc(100vh);
  width: 6px;
  cursor: e-resize;
  background: transparent;
  border-radius: 3px;
}
</style>
