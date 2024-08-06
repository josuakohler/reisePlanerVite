  <script setup lang="ts">
  import HelloWorld from "./HelloWorld.vue";
  import { ref, computed, watchEffect } from "vue";
  import { debounce } from 'lodash';

  
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

  interface Location {
    name: string;
    score: number;
    coordinate: {
      type: string;
      x: number;
      y: number;
    };
  }

  const from = ref("");
  const to = ref("");
  const routeList = ref<Connection[]>([]);
  const fromLocations = ref<Location[]>([]);
  const toLocations = ref<Location[]>([]);

  const searchLocations = async (query: string, isFrom: boolean) => {
    if (query.length < 2) return;
    try {
      const response = await fetch(
        `http://transport.opendata.ch/v1/locations?query=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (isFrom) {
        fromLocations.value = data.stations;
      } else {
        toLocations.value = data.stations;
      }
    } catch (error) {
      console.error("There was a problem fetching locations:", error);
    }
  };

  const debounceSearchLocations = debounce(searchLocations, 300);

  watchEffect(() => {
    debounceSearchLocations(from.value, true);
  });

  watchEffect(() => {
    debounceSearchLocations(to.value, false);
  });

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

  const firstConnection = computed<Connection | null>(
    () => routeList.value[0] || null
  );
  </script>

  <template>
    <div class="from-to">
      <div class="from">
        <label for="from">Von:</label>
        <input
          type="text"
          id="from"
          v-model="from"
          placeholder="Sargans"
          list="from-locations"
        />
        <datalist id="from-locations">
          <option
            v-for="location in fromLocations"
            :key="location.name"
            :value="location.name"
          />
        </datalist>
      </div>
      <div class="to">
        <label for="to">Nach:</label>
        <input
          type="text"
          id="to"
          v-model="to"
          placeholder="Chur"
          list="to-locations"
        />
        <datalist id="to-locations">
          <option
            v-for="location in toLocations"
            :key="location.name"
            :value="location.name"
          />
        </datalist>
      </div>

      </div>
    <button @click="searchRoutes">Suche nach Routen</button>
    <p>Suche nach Routen Von: {{ from }} Nach: {{ to }}</p>

    <HelloWorld
      v-for="(connection, index) in routeList"
      :key="index"
      v-if="firstConnection"
      :stationName="connection.to.station.name"
      :platForm="connection.from.platform"
      :departure="connection.from.departure"
      :arrival="connection.to.arrival"
    />
  </template>
    
