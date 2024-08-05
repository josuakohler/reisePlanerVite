<script setup lang="ts">
import HelloWorld from "./HelloWorld.vue";
import { ref, computed } from "vue";

interface Station {
  station: {
    name: string;
  };
  platform: string;
  departure: string;
  arrival: string;
}

interface Connection {
  from: Station;
  to: Station;
}

const from = ref("");
const to = ref("");
const routeList = ref<Connection[]>([]);

const searchRoutes = async () => {
  try {
    const response = await fetch(
      `http://transport.opendata.ch/v1/connections?from=${from.value}&to=${to.value}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    routeList.value = data.connections;
    console.log(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

const firstConnection = computed<Connection | null>(() => routeList.value[0] || null);
</script>

<template>
  <div class="from-to">
    <div class="from">
      <label for="from">Von:</label>
      <input type="text" id="from" v-model="from" placeholder="Sargans" />
    </div>
    <div class="to">
      <label for="to">Nach:</label>
      <input type="text" id="to" v-model="to" placeholder="Chur" />
    </div>
  </div>
  <button @click="searchRoutes">Suche nach Routen</button>
  <p>Suche nach Routen Von: {{ from }} Nach: {{ to }}</p>

  <HelloWorld v-for="(firstConnection, index) in routeList" :key="index"
  v-if="firstConnection"
  :stationName="firstConnection.to.station.name"
  :platForm="firstConnection.from.platform"
  :departure="firstConnection.from.departure"
  :arrival="firstConnection.to.arrival"
/>

</template>