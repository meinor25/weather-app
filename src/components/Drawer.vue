<template>
  <div
    class="absolute m-auto w-full transform top-0 h-screen bg-dark-blue transition-all duration-300 ease-in-out"
    :class="{ '-translate-x-full': !drawer }"
  >
    <div class="container">
      <!-- CLOSE BTN -->
      <div class="flex justify-end">
        <button class="text-white p-3 mr-1 text-2xl" @click="drawerFunc">
          x
        </button>
      </div>
      <!-- SEARCH -->
      <form @submit.prevent="search()" class="pt-3 flex justify-around">
        <div class="p-2 border flex border-gray items-center">
          <icon icon="search" class="text-gray" />
          <input
            type="text"
            placeholder="search a city..."
            v-model="countrySearch"
            class="bg-dark-blue focus:outline-none text-white"
            maxlength="20"
          />
        </div>
        <button class="py-2 px-3 bg-blue text-white" type="submit">
          search
        </button>
      </form>
      <!-- RECENT SEARCHES -->
      <div
        class="flex flex-col mt-5 h-96 items-start overflow-y-scroll recent-search"
      >
        <button
          v-for="(search, i) of recentSearch"
          :key="i"
          class="flex justify-between items-center mx-10 mt-10 p-3 text-left w-4/6 transition-all duration-100 text-white text-1xl"
        >
          {{ search }}
          <icon icon="chevron-right" />
        </button>
      </div>
      <!-- DELETE ALL SEARCHES -->
      <div
        class="flex flex-col justify-center items-center pt-10"
        v-if="recentSearch.length > 0"
      >
        <button @click="deleteSearchs" class="">
          <icon
            icon="trash"
            class="text-blue text-2xl transform hover:rotate-45 transition-all duration-75 ease-in"
          />
        </button>
        <p class="text-white">Delete recent searches</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
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
    const recentSearch = computed(() => store.state.recentSearch);

    //Functions
    const drawerFunc = () => {
      store.commit("showDrawer");
    };
    const addRecentSearch = () => {
      store.commit("updateRecentSearch", countrySearch.value);
    };
    const search = () => {
      if (countrySearch.value != "") {
        let filtered = recentSearch.value.filter(
          (item) => item === countrySearch.value
        );
        console.log(filtered.length);
        store.dispatch("getWeather", countrySearch.value);
        store.commit("changeCountry", countrySearch.value);
        store.commit("showDrawer");
        //Add the recent user search to recentSearch array
        if (filtered.length <= 0) {
          addRecentSearch();
        } else {
          if (countrySearch.value.toLowerCase() != filtered[0].toLowerCase()) {
            addRecentSearch();
          }
        }
      }
      //reset search input
      countrySearch.value = "";
    };
    const deleteSearchs = () => {
      store.commit("deleteSearchs");
    };

    return {
      drawerFunc,
      countrySearch,
      search,
      recentSearch,
      deleteSearchs,
    };
  },
};
</script>

<style></style>
