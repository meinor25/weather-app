import { createStore } from "vuex";
//Other libraries
import moment from "moment";
import axios from "axios";

//Variables
const API_key = "251d84f0e76ae17f8f43b56c19bdd945";

export default createStore({
  state: {
    recentSearch: [],
    actualWeather: "",
    actualTemperature: "",
    tempMode: "°c",
    actualDate: "",
    userCountry: "",
    drawer: false,
    badRequest: false,
  },
  mutations: {
    //Gets actual date
    getActualTime(state) {
      state.actualDate = moment().format("ddd, D MMM");
    },
    //Gets actual user country
    userCountry(state, payload) {
      state.userCountry = payload;
    },
    //Shows navigation drawer
    showDrawer(state) {
      state.drawer = !state.drawer;
    },
    //Call to weather API
    getWeather(state, payload) {
      if (payload != 404) {
        state.actualTemperature = Math.round(payload.main.temp);
        state.actualWeather = payload.weather[0].main;
        state.badRequest = false;
      } else if (payload === 400) {
        window.location.reload();
      } else {
        state.badRequest = true;
      }
      console.log(payload);
    },
    //Updates user actual country
    changeCountry(state, payload) {
      state.userCountry = payload;
    },
    //Add recent search
    updateRecentSearch(state, payload) {
      state.recentSearch.push(payload);
    },
    deleteSearchs(state) {
      state.recentSearch = [];
    },
  },
  actions: {
    getUserCountry({ commit }) {
      axios
        .get("https://ipinfo.io?token=42fcd4186ae323")
        .then(({ data }) => commit("userCountry", data.city));
    },
    getWeather({ commit }, country) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_key}&units=metric`
        )
        .then(({ data }) => commit("getWeather", data))
        .catch((err) => commit("getWeather", err.response.status));
    },
  },
  modules: {},
});
