<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

const routePlayListName = ref('');
const routePlayList = ref<RouteList[]>([]);
const counter = ref(0);
const selectedRouteList = ref<RouteList | null>(null);
const showRouteListView = ref(false);

onMounted(() => {
  const storedRoutePlayList = localStorage.getItem('routePlayList');
  if (storedRoutePlayList) {
    routePlayList.value = JSON.parse(storedRoutePlayList);
    counter.value = routePlayList.value.length;
  }
});

function setName(event: Event) {
  const target = event.target as HTMLInputElement;
  routePlayListName.value = target.value;
}

function createList() {
  const nameExists = routePlayList.value.some(
    (playlist) => playlist.name === routePlayListName.value
  );

  if (nameExists) {
    alert("Diese routelist existiert bereits");
  } else {
    routePlayList.value.push({
      name: routePlayListName.value,
      id: counter.value,
      routen: [],
      checked: false,
    });
    counter.value++;
    saveList();
  }
}

function deleteRouteList(index: number) {
  routePlayList.value.splice(index, 1);
  saveList();
}

function viewRouteList(index: number) {
  selectedRouteList.value = routePlayList.value[index];
  showRouteListView.value = true;
}

function saveList() {
  localStorage.setItem("routePlayList", JSON.stringify(routePlayList.value));
}

function goBack() {
  showRouteListView.value = false;
  selectedRouteList.value = null;
}

function formatTime(dateTime: string): string {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function calculateDuration(departure: string, arrival: string): string {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  const diff = Math.round((arr.getTime() - dep.getTime()) / 60000); // difference in minutes
  return `${diff} min`;
}
</script>

<template>
  <div id="app">
    <div v-if="!showRouteListView">
      <input type="text" @input="setName" v-model="routePlayListName" />
      <button @click="createList">Create List</button>
      <div class="route-list">
        <div
          class="route-list-item"
          v-for="(route, index) in routePlayList"
          :key="route.id"
        >
          <p>{{ route.name }}</p>
          <button @click="deleteRouteList(index)">delete</button>
          <button @click="viewRouteList(index)">view</button>
        </div>
      </div>
    </div>

    <div v-else>
      <button @click="goBack">Back</button>
      <h1>{{ selectedRouteList?.name }}</h1>
      <div class="container">
        <div class="route-list">
          <div class="route-list-item" v-for="connection in selectedRouteList?.routen" :key="connection.from.departure">
            <div class="route-header">
              <div class="route-icon">🚆</div>
              <div class="route-info">
                <div class="route-line">Richtung {{ connection.to.station.name }}</div>
                <div class="route-time"></div>
                <div class="route-platform">
                  Gl. {{ connection.from.platform }}
                </div>
                <div class="route-duration">
                  {{ calculateDuration(connection.from.departure, connection.to.arrival) }}
                </div>
              </div>
            </div>
            <div class="route-progress">
              <div class="progress-dot"></div>
              <div class="progress-line"></div>
              <div class="progress-dot"></div>
            </div>
            <div class="route-capacity">
              <span>{{ formatTime(connection.from.departure) }}</span>
              <span>{{ formatTime(connection.to.arrival) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your CSS styles here */
</style>