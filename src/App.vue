<template>
  <div class="flex flex-col lg:flex-row">
    <!-- MAIN WEATHER AND SEARCH -->
    <div class="bg-dark-blue md:w2/4 lg:w-2/5 h-screen relative pb-12">
      <header class="flex justify-between">
        <button
          class="py-2 px-3 mt-3 ml-3 bg-gray text-white font-medium shadow-md shadow-gray-100"
          @click="showDrawer"
        >
          Search for places
        </button>
        <button
          class="px-3 mt-3 mr-3 rounded-full bg-gray text-white font-medium shadow-md shadow-gray-100"
          @click="changeCountry()"
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
      <!-- ERROR MESSAGE -->
      <div
        class="container flex flex-col items-center justify-center h-3/6"
        v-else
      >
        <h1 class="text-white text-center mx-5 mb-5 text-2xl">
          <span class="text-red-100">"{{ userCountry }}"</span> couldn´t be
          found
        </h1>
        <icon icon="frown" class="text-3xl text-white error-icon" />
      </div>
      <!-- NAVIGATION DRAWER -->
      <Drawer :drawer="drawer" />
    </div>
    <!-- WEATHER HIGHLIGHTS AND MORE -->
    <div class="w-full pt-10 bg-deep-blue">
      <!-- TODAY HIGHLIGHTS -->
      <h2 class="pt-5 pl-5 text-white text-center text-2xl font-bold">
        Today's Highlights
      </h2>
      <div
        class="w-10/12 mx-auto py-5 grid grid-cols-1 gap-4 text-white text-center md:grid-cols-2"
      >
        <card v-for="(data, index) in weatherInfo" :key="index">
          <!-- WIND DATA -->
          <div v-if="index === 'wind'">
            <h3 class="text-center">{{ index }} status</h3>
            <p class="text-4xl text-white font-bold">{{ data.speed }}</p>
            <div class="flex justify-center">
              <icon
                icon="location-arrow"
                class="mt-2 text-white"
                :style="{ transform: `rotate(-${data.deg - 50}deg)` }"
              />
              <span class="pl-2">{{ data.deg }}°</span>
            </div>
          </div>
          <!-- HUMIDITY DATA -->
          <div v-else-if="index == 'humidity'">
            <h3 class="text-center">{{ index }}</h3>
            <p class="text-4xl text-white font-bold">{{ data }}</p>
            <div class="flex w-8/12 mx-auto justify-between text-gray">
              <h4>0</h4>
              <h4>50</h4>
              <h4>100</h4>
            </div>
            <!-- PROGRESS BAR -->
            <div class="bar w-8/12 mx-auto h-2 bg-white rounded relative">
              <!-- INSIDE BAR -->
              <div
                class="h-full absolute bg-yellow rounded"
                :style="{ width: `${data}` }"
              ></div>
            </div>
          </div>
          <div v-else>
            <h3>{{ index }}</h3>
            <p class="text-4xl text-white font-bold">{{ data }}</p>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import Drawer from "./components/Drawer.vue";
import Card from "./components/Card.vue";
import axios from "axios";

export default {
  name: "App",
  components: { Drawer, Card },
  setup() {
    //Store
    const store = useStore();

    //Data
    const background = require("./assets/img/Cloud-background.png");
    const actualWeather = computed(() => store.state.actualWeather);
    const tempMode = computed(() => store.state.tempMode);
    const actualTemperature = computed(() => store.state.actualTemperature);
    const actualDate = computed(() => store.state.actualDate);
    const userCountry = computed(() => store.state.userCountry);
    const weatherInfo = computed(() => store.state.weatherInfo);
    const drawer = computed(() => store.state.drawer);
    const error = computed(() => store.state.badRequest);

    //Methods
    const changeCountry = () => {
      axios.get("https://ipinfo.io?token=42fcd4186ae323").then(({ data }) => {
        store.dispatch("getWeather", data.city);
        store.commit("changeCountry", data.city);
      });
    };

    const showDrawer = () => {
      store.commit("showDrawer");
    };

    /* LIFECYCLES */
    //Created
    changeCountry();
    store.commit("getActualTime");
    console.log(weatherInfo.value);

    return {
      //Variables
      actualWeather,
      actualTemperature,
      tempMode,
      actualDate,
      weatherInfo,
      userCountry,
      background,
      error,
      //Methods
      drawer,
      showDrawer,
      changeCountry,
    };
  },
};
</script>

<style></style>
