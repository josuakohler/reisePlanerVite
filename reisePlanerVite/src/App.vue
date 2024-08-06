<script setup lang="ts">
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
    </div>
  </body>
</template>
