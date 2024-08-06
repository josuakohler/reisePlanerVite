<script setup lang="ts">
defineProps<{
  stationName: string;
  platForm: string;
  departure: string;
  arrival: string;
}>();

function formatTime(dateTime: string): string {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function calculateDuration(departure: string, arrival: string): string {
  const dep = new Date(departure);

  const arr = new Date(arrival);

  const diff = (arr.getTime() - dep.getTime()) / 60000; // difference in minutes

  return `${diff} min`;
}
</script>

<template>
  <div class="route-list-item">
    <div class="route-header">
      <div class="route-icon">🚆</div>
      <div class="route-info">
        <div class="route-line">Richtung {{ stationName }}</div>
        <div class="route-time"></div>
        <div class="route-platform">Gl. {{ platForm }}</div>
        <div class="route-duration">
          {{ calculateDuration(departure, arrival) }}
        </div>
      </div>
    </div>
    <div class="route-progress">
      <div class="progress-dot"></div>
      <div class="progress-line"></div>
      <div class="progress-dot"></div>
    </div>
    <div class="route-capacity">
      <span>{{ formatTime(departure) }}</span>
      <span>{{ formatTime(arrival) }}</span>
    </div>

    <!-- Add to routelist -->

    <button>Add to Routelist</button>
  </div>
</template>
