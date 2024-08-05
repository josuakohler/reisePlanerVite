<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import SearchRoute from "./components/SearchRoute.vue";
import CreateList from "./components/CreateList.vue";




</script>

<template>
  <body>
    <div class="container">
      <div class="routes">
        <CreateList initialRouteName=""></CreateList>
      </div>
      <div class="search">
        <SearchRoute from="Sargans" to="Zürich"></SearchRoute>
      </div>
      <div class="route-list">
        <HelloWorld
          departure="December 17, 1995 03:24:00"
          arrival="December 17, 1995 08:24:00"
          platForm="2"
          stationName="Zürich"
        ></HelloWorld>
      </div>
    </div>
  </body>
</template>
