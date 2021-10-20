<template>
  <div class="subMenu">
    <img :src="require('@/assets/pictures/navigation/svgs/' + icon + '')" class="subMenuIcon">
    <div class="navFont subMenuText">{{submenuName}}</div>
  </div>
</template>

<script>
export default {
  name: 'subnavigation-item',
  props: {
    submenuName: String,
    icon: String
  }
}
</script>

<style>
  .subMenu{
    display: flex;
    margin-left: 45px;
    margin-bottom: 7px;
    height: 25px;
    align-items: center;
    flex-wrap: wrap;
  }

  .subMenuIcon{
    height: 10px;
  }

  .subMenuText{
    margin-left: 9.25px;
  }
</style>
