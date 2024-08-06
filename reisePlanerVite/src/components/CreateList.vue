<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const props = defineProps<{
  initialRouteName?: string;
}>();

const routePlayListName = ref(props.initialRouteName || "");

const routePlayList = reactive<
  Array<{
    name: string;
    id: string;
    routen: any[];
    checked: boolean;
  }>
>([]);

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
      id: Date.now().toString(), // Use timestamp as a unique ID
      routen: [],
      checked: false,
    });
    saveList();
  }

  console.log(routePlayList[routePlayList.length - 1]);
}

function deleteRouteList(index: number) {
  routePlayList.splice(index, 1);
  saveList();
}

function saveList() {
  localStorage.setItem("routePlayList", JSON.stringify(routePlayList));
}

function loadList() {
  const savedList = localStorage.getItem("routePlayList");
  
  if (savedList) {
    const parsedList = JSON.parse(savedList);
    routePlayList.splice(0, routePlayList.length, ...parsedList);
  }
}

onMounted(() => {
  loadList();
});
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
      <button>view</button>
    </div>
  </div>
</template>