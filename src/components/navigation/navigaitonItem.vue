<template>
  <div class="selectedNav">
    <img :src="require('@/assets/pictures/navigation/svgs/' + iconSrc + '')" class="navIcon">
    <div class="navFont menuName">{{menuName}}</div>
    <img src="@/assets/pictures/navigation/svgs/add_black_24dp.svg" name="plusIcon" class="plusIcon">
    <img src="@/assets/pictures/navigation/svgs/triangle_black.svg" class="triangleIcon">
  </div>
</template>

<script>
export default {
  name: 'navigation-item',
  props: ['menuName', 'icon-src']
}
</script>

<style>
  .selectedNav{
    display: flex;
    height: 42px;
    width: 258px;
    margin-left: 17px;
<<<<<<< HEAD:NoteMind/notemind/src/components/navigation/navigaitonItem.vue
=======
    margin-bottom: 23.5px;
    background-image: url(../../assets/pictures/navigation/navSelected.png);
>>>>>>> 54226d186a057a03f38ae2ee51054f860a7ad16d:src/components/navigation/navigaitonItem.vue
    align-items: center;
  }

   .selectedNav:hover{
    display: flex;
    height: 42px;
    width: 258px;
    margin-left: 17px;
    align-items: center;
    background: linear-gradient(265.28deg, rgba(248, 138, 195, 0.42) 32.03%, rgba(91, 207, 251, 0.42) 70.15%);
    border-radius: 10px;
  }

  .navIcon{
    margin-left: 7px;
    height: 14px;
    width: 14px;
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
