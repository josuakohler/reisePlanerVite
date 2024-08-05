<script setup lang="ts">
import { ref, reactive } from "vue";

const props = defineProps<{
  initialRouteName?: string;
}>();

const routePlayListName = ref(props.initialRouteName || "");

const routePlayList = reactive<
  Array<{
    name: string;
    id: number;
    routen: any[];
    checked: boolean;
  }>
>([]);

const counter = ref(0);

function setName(event: Event) {
  const target = event.target as HTMLInputElement;
  routePlayListName.value = target.value;
}

function createList() {
  const nameExists = routePlayList.some(
    (playlist) => playlist.name === routePlayListName.value
  );

  if (nameExists) {
    alert("Diese routelist existiert bereits");
  } else {
    routePlayList.push({
      name: routePlayListName.value,
      id: counter.value,
      routen: [],
      checked: false, // Assuming 'checked' should start as false
    });
    counter.value++;
  }

  console.log(routePlayList[counter.value - 1]);
}

function deleteRouteList(index: number) {
  routePlayList.splice(index, 1);
  saveList();
}

function viewRouteList(idxList: number) {
  const selectedRouteList = routePlayList[idxList];
  localStorage.setItem("selectedRouteList", JSON.stringify(selectedRouteList));
  window.location.href = "routePlayListView.html";
}
function saveList() {
  localStorage.setItem("routePlayList", JSON.stringify(routePlayList));
}

// If you have a 'routes' array, define it here
// const routes = ref([]);
</script>

<template>

      <input type="text" @input="setName" v-model="routePlayListName" />
      <button @click="createList">Create List</button>
      <div class="route-list">
        <div
          class="route-list-item"
          v-for="(route, idxList) in routePlayList"
          :key="route.id"
        >
          <p>{{ route.name }}</p>
          <button @click="deleteRouteList(idxList)">delete</button>
          <button @click="viewRouteList(idxList)">view</button>
        </div>
      </div>
  
  
 


</template>
