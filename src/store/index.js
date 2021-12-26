import { createStore } from "vuex";
import _ from "lodash";

export default createStore({
  state: {
    userInfo: {
      userId: "",
      userName: "",
      userPwd: "",
      userType: 0,
      userXingming: "",
      certiType: 0,
      certiNumber: "",
      userPhone: "",
      userLevel: 0,
      userIntroduction: "",
      userCity: "",
      userCommunity: 0,
      registerTime: new Date(),
      changeTime: new Date(),
    },
    helpMeInfos: [],
    helpYouInfos: [],
  },
  mutations: {
    setUserInfo(state, tUserInfo) {
      state.userInfo = _.clone(tUserInfo);
      console.log("setUserInfo res: ", state.userInfo);
    },
    setHelpMeInfos(state, tHelpMeInfos) {
      state.helpMeInfos = _.clone(tHelpMeInfos);
      console.log("setHelpMeInfos res: ", state.helpMeInfos);
    },
    setHelpYouInfos(state, tHelpYouInfos) {
      state.helpYouInfos = _.clone(tHelpYouInfos);
      console.log("setHelpYouInfos res: ", state.helpYouInfos);
    },
  },
  actions: {
    async setUserInfo({ commit }, tUserInfo) {
      commit("setUserInfo", tUserInfo);
    },
    async setHelpMeInfos({ commit }, tHelpMeInfos) {
      commit("setHelpMeInfos", tHelpMeInfos);
    },
    async setHelpYouInfos({ commit }, tHelpYouInfos) {
      commit("setHelpYouInfos", tHelpYouInfos);
    },
  },
  modules: {},
});
