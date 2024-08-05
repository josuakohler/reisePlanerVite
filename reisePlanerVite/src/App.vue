<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import SearchRoute from './components/SearchRoute.vue';
</script>

<template>

  <SearchRoute from="Sargans" to="Zürich"></SearchRoute>
  <HelloWorld departure="December 17, 1995 03:24:00" arrival="December 17, 1995 08:24:00" platForm="2" stationName="Zürich"></HelloWorld>
  <RoutePlayList></RoutePlayList>
</template>