import { createStore } from "vuex";
//Other libraries
import moment from "moment";
import axios from "axios";

//Variables
const API_key = "613c01e4db007d5007e0c76e4ad720b4";

export default createStore({
  state: {
    recentSearch: [],
    weatherInfo: {},
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
    },
    //Add items to weather info array
    addWeatherInfo(state, payload) {
      state.weatherInfo = payload;
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
    getWeather({ commit }, payload) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${API_key}&units=metric`
        )
        .then(({ data }) => {
          commit("getWeather", data);
          commit("addWeatherInfo", {
            wind: {
              speed: `${data.wind.speed} mph`,
              deg: data.wind.deg,
            },
            humidity: `${data.main.humidity} %`,
            pressure: `${data.main.pressure} mb`,
            visibility: `${data.visibility} miles`,
          });
          console.log(data);
        })
        .catch((err) => commit("getWeather", err.response.status));
    },
  },
  modules: {},
});
