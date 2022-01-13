import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";

//Moment.js
import "./assets/tailwind.css";
import "./assets/styles/main.css";

library.add(faCrosshairs);

createApp(App).use(store).component("icon", FontAwesomeIcon).mount("#app");
