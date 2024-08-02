<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
    data() {
        return {
           
            routeList: [] as String[],
            from: '' as string,
            to: '' as string,
        };
    },
    methods: {
        async searchRoutes() {
            const response = await fetch(`http://transport.opendata.ch/v1/connections?from=${this.from}&to=${this.to}`);
            const data = await response.json();
            this.routeList = data.connections;
        },


    }


    
})
</script>
