import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import RouteListView from "./RouteListView.vue";
import router from './router';


createApp(App).use(router).mount("#app");
createApp(RouteListView).use(router).mount("#view")