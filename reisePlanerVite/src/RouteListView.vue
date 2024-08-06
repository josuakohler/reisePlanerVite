<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";


interface Route {
  from: {
    station: {
      name: string;
    };
    platform: string;
    departure: string;
  };
  to: {
    station: {
      name: string;
    };
    arrival: string;
  };
}

interface RouteList {
  name: string;
  id: number;
  routen: Route[];
  checked: boolean;
}



const selectedRouteList = ref<RouteList | null>(null);

function goBack() {
  window.location.href = "index.html";
}
</script>

<template>
  <body>
    <div class="container">
      <button @click="goBack">Back</button>
      <h1>{{ selectedRouteList?.name }}</h1>
      <div class="container">
        <HelloWorld stationName="Hallo" platForm="12" departure="12:30" arrival="12:40"></HelloWorld>
      </div>
    </div>
  </body>
</template>
