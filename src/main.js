import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
//Axios
import axios from "axios";
import VueAxios from "vue-axios";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
//Styles (tailwind)
import "./assets/tailwind.css";
import "./assets/styles/main.css";

//Images
import "./assets/img/Cloud-background.png";

//Icon usage
library.add(faCrosshairs);
library.add(faMapMarkerAlt);
library.add(faSearch);
library.add(faFrown);
library.add(faChevronRight);
library.add(faTrash);
library.add(faLocationArrow);

createApp(App)
  .use(store)
  .use(VueAxios, axios)
  .component("icon", FontAwesomeIcon)
  .mount("#app");
