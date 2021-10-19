<template>
  <div class="searchContent">
    <div class="searchBar">
      <img src="@/assets/pictures/navigation/search.png" class="searchPic">
      <input placeholder="全局搜索" class="searchInput">
    </div>
    <div class="addButton">
      <img src="@/assets/pictures/navigation/svgs/add_white_24dp.svg" class="addIcon">
    </div>
  </div>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style>
  .searchContent{
    display: flex;
  }

  .searchBar{
    display: flex;
    align-items: center;
    height: 35px;
    width: 212px;
    border-radius: 7px;
    background-color: #E5E5E5;
  }

  .searchPic{
    height: 15px;
    margin-left: 10.38px;
  }

  .searchInput{
    outline: none;
    border: 0;
    padding-left: 7.78px;
    background-color: #E5E5E5;
  }

  input::-webkit-input-placeholder{
    color: #B3B3B3;
    font-size: 13px;
  }

  .addButton{
    display: flex;
    height: 35px;
    width: 35px;
    margin-left: 11px;
    border-radius: 35px;
    background-color: black;
    align-items: center;
    justify-content: center;
  }

  .addIcon{
    width: 21px;
    height: 21px;
  }
</style>
