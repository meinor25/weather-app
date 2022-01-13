import { createStore } from "vuex";
import moment from "moment";

export default createStore({
  state: {
    actualWeather: "Shower",
    actualTemperature: 15,
    tempMode: "°c",
    actualDate: "",
  },
  mutations: {
    getActualTime(state) {
      state.actualDate = moment().format("ddd, D MMM");
    },
  },
  actions: {},
  modules: {},
});
