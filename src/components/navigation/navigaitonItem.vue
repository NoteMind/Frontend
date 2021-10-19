<template>
  <div class="selectedNav">
    <div class="navIcon"><slot name="navIcon"></slot></div>
    <div class="navFont menuName">{{menuName}}</div>
    <img src="@/assets/pictures/navigation/plus-black.png" name="plusIcon" class="plusIcon">
    <img src="@/assets/pictures/navigation/ttriangle.png" class="triangleIcon">
  </div>
</template>

<script>
export default {
  name: 'navigation-item',
  props: ['menuName']
}
</script>

<style>
  .selectedNav{
    display: flex;
    height: 35px;
    width: 258px;
    margin-left: 17px;
    background-image: url(../../assets/pictures/navigation/navSelected.png);
    align-items: center;
  }

  .navIcon{
    width: 15px;
    margin-left: 7px;
  }

  .menuName{
    margin-left: 10.83px;
    flex-grow: 1;
  }

  .plusIcon{
    width: 9.92px;
    height: 9.92px;
    margin-right: 9.54px;
  }

  .triangleIcon{
    width: 12px;
    margin-right: 11px;
  }
</style>
