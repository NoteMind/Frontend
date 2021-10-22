<template>
  <div class="titleContent">
    <div class="fileTitleFont fileTitle">我的文档</div>
    <div class="dropMenu">
      <div class="navFont dropMenuText">自定义排序</div>
      <img src="@/assets/pictures/navigation/svgs/triangle_black_bottom.svg" class="triangleIcon">
    </div>
  </div>
</template>

<script>
import '@/assets/css/font.css'

export default {
  name: 'fileTitle'
}
</script>

<style scoped>
  .titleContent{
    display: flex;
  }

  .fileTitle{
    margin-left: 57px;
    margin-top: 59px;
  }

  .dropMenu{
    display: flex;
    margin-left: 864px;
    margin-top: 48px;
    height: 35px;
    width: 122px;
    border: 0.5px solid #A9A9A9;
    box-sizing: border-box;
    border-radius: 7px;
    align-items: center;
  }

  .dropMenuText{
    margin-left: 21px;
  }

  .triangleIcon{
    width: 12px;
    margin-left: 8px;
  }
</style>
