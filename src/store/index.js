import { createStore } from "vuex";
//Other libraries
import moment from "moment";
import axios from "axios";

export default createStore({
  state: {
    actualWeather: "Shower",
    actualTemperature: 15,
    tempMode: "°c",
    actualDate: "",
    userCountry: "",
  },
  mutations: {
    getActualTime(state) {
      state.actualDate = moment().format("ddd, D MMM");
    },
    userCountry(state, payload) {
      state.userCountry = payload;
      console.log(payload);
    },
  },
  actions: {
    getUserCountry({ commit }) {
      axios
        .get("https://ipinfo.io?token=42fcd4186ae323")
        .then(({ data }) => commit("userCountry", data.city));
    },
  },
  modules: {},
});
