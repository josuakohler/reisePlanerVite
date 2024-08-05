<script setup lang="ts">
  defineProps<{
    from: string;
    to: string;

  }>();



// async searchRoutes() {
//           const response = await fetch(`http://transport.opendata.ch/v1/connections?from=${ from }&to=${ to }`);
//           const data = await response.json();
//           this.routeList = data.connections;
//       };


</script>
<template>
  <div class="search">
    <div class="from-to">
      <div class="from">
        <label for="from">Von:</label>
        <input type="text" id="from" placeholder="Sargans" />
      </div>
      <div class="to">
        <label for="to">Nach:</label>
        <input
          type="text"
          id="to"
          placeholder="Chur"
        />
      </div>
    </div>
    <button>Suche nach Routen</button>
    <p>Suche nach Routen Von: {{ from }} Nach: {{ to }}</p>
  </div>
</template>
