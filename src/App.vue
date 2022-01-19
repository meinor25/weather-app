<template>
  <div class="flex flex-col lg:flex-row">
    <!-- MAIN WEATHER AND SEARCH -->
    <div class="bg-dark-blue lg:w-1/4 relative h-screen">
      <header class="flex justify-between">
        <button
          class="py-2 px-3 mt-3 ml-3 bg-gray text-white font-medium shadow-md shadow-gray-100"
          @click="showDrawer"
        >
          Search for places
        </button>
        <button
          class="px-3 mt-3 mr-3 rounded-full bg-gray text-white font-medium shadow-md shadow-gray-100"
          @click="getUserCountry"
        >
          <!-- Location Icon -->
          <icon icon="crosshairs"></icon>
        </button>
      </header>
      <div class="main-section flex flex-col items-center" v-if="!error">
        <div
          class="background w-full"
          :style="
            'background-image: url( ' +
            require('./assets/img/Cloud-background.png') +
            ')'
          "
        ></div>
        <img
          :src="require(`./assets/img/${actualWeather}.png`)"
          :alt="actualWeather"
          class="mr-4 w-2/4 max-w-xs pt-10 md:w-2/5"
        />
        <h1 class="text-white text-center">
          <span class="text-10xl">{{ actualTemperature }}</span>
          <span class="text-5xl text-gray">{{ tempMode }}</span>
        </h1>

        <p class="text-3xl text-gray">{{ actualWeather }}</p>
        <div class="pt-5 ml-3 text-xl text-gray">
          <p>
            Today <span class="px-2">.</span> <span>{{ actualDate }}</span>
          </p>
          <p class="pt-5 text-center">
            <icon icon="map-marker-alt" class="mr-1" />
            {{ userCountry }}
          </p>
        </div>
      </div>
      <div
        class="container flex flex-col items-center justify-center h-3/6"
        v-else
      >
        <h1 class="text-white text-center mx-5 mb-5 text-2xl">
          La locacion ingresada no existe
        </h1>
        <icon icon="frown" class="text-3xl text-white error-icon" />
      </div>
      <!-- NAVIGATION DRAWER -->
      <Drawer :drawer="drawer" />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import axios from "axios";
import Drawer from "./components/Drawer.vue";
export default {
  name: "App",
  components: { Drawer },
  setup() {
    //Store
    const store = useStore();

    //Data
    const actualWeather = computed(() => store.state.actualWeather);
    const tempMode = computed(() => store.state.tempMode);
    const actualTemperature = computed(() => store.state.actualTemperature);
    const actualDate = computed(() => store.state.actualDate);
    const userCountry = computed(() => store.state.userCountry);
    const background = require("./assets/img/Cloud-background.png");
    const drawer = computed(() => store.state.drawer);
    const error = computed(() => store.state.badRequest);

    //Methods
    const currentTime = () => {
      store.commit("getActualTime");
    };
    const getWeatherInfo = () => {
      store.dispatch("getWeather", userCountry.value);
    };
    const getUserCountry = () => {
      store.dispatch("getUserCountry");
      store.dispatch("getWeather", userCountry.value);
    };
    const showDrawer = () => {
      store.commit("showDrawer");
    };

    //Created
    currentTime();
    if (navigator.geolocation) {
      setTimeout(() => {
        getWeatherInfo();
      }, 500);
      getUserCountry();
    }
    return {
      actualWeather,
      actualTemperature,
      tempMode,
      actualDate,
      userCountry,
      getWeatherInfo,
      getUserCountry,
      background,
      drawer,
      showDrawer,
      error,
    };
  },
};
</script>

<style></style>
