<template>
  <div class="flex flex-col lg:flex-row">
    <!-- MAIN WEATHER AND SEARCH -->
    <div class="bg-dark-blue h-screen lg:w-2/6">
      <header class="flex justify-between">
        <button
          class="py-2 px-3 mt-3 ml-3 bg-gray text-white font-medium shadow-md shadow-gray-100"
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
      <div class="flex flex-col items-center">
        <img
          :src="require(`./assets/img/${actualWeather}.png`)"
          :alt="actualWeather"
          class="mr-4 w-2/4 max-w-xs pt-10"
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
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "App",
  components: {},
  setup() {
    //Store
    const store = useStore();

    //Data
    const actualWeather = computed(() => store.state.actualWeather);
    const tempMode = computed(() => store.state.tempMode);
    const actualTemperature = computed(() => store.state.actualTemperature);
    const actualDate = computed(() => store.state.actualDate);
    const userCountry = computed(() => store.state.userCountry);

    //Methods
    const currentTime = () => {
      store.commit("getActualTime");
    };
    const getWeatherInfo = () => {
      console.log("weather info");
      console.log("test");
    };
    const getUserCountry = () => {
      store.dispatch("getUserCountry");
    };

    //Created
    currentTime();
    if (navigator.geolocation) {
      getWeatherInfo();
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
    };
  },
};
</script>

<style></style>
