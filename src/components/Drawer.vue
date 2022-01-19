<template>
  <div
    class="absolute m-auto w-0 top-0 h-screen bg-dark-blue transition-all ease-in-out"
    :class="{ 'w-full': drawer }"
  >
    <!-- CLOSE BTN -->
    <div class="flex justify-end">
      <button class="text-white p-3 mr-1 text-2xl" @click="drawerFunc">
        x
      </button>
    </div>
    <!-- SEARCH -->
    <div class="pt-5 flex justify-around" :class="{ hidden: !drawer }">
      <div class="p-2 flex border border-gray items-center">
        <icon icon="search" class="text-gray" />
        <input
          type="text"
          placeholder="search location"
          v-model="countrySearch"
          class="pl-5 bg-dark-blue focus:outline-none text-white"
        />
      </div>
      <button class="py-2 px-3 bg-blue text-white" @click="search">
        search
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
export default {
  name: "Drawer",
  props: {
    drawer: Boolean,
  },
  setup() {
    //Store
    const store = useStore();
    //Variables
    let countrySearch = ref("");
    //Functions
    const drawerFunc = () => {
      store.commit("showDrawer");
    };
    const search = () => {
      store.dispatch("getWeather", countrySearch.value);
      store.commit("changeCountry", countrySearch);
      store.commit("showDrawer");
    };
    return {
      drawerFunc,
      countrySearch,
      search,
    };
  },
};
</script>

<style></style>
