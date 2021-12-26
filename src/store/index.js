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
    adminInfo: {
      userInfos: [],
      helpMeInfos: [],
      helpYouInfos: [],
      InterMediaryIncomes: [],
    },
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
    setAdminInfo(state, tAdminInfo) {
      state.adminInfo.userInfos = _.clone(tAdminInfo.userInfos);
      state.adminInfo.helpMeInfos = _.clone(tAdminInfo.helpMeInfos);
      state.adminInfo.helpYouInfos = _.clone(tAdminInfo.helpYouInfos);
      state.adminInfo.InterMediaryIncomes = _.clone(
        tAdminInfo.InterMediaryIncomes
      );
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
    async setAdminInfo({ commit }, tAdminInfo) {
      commit("setAdminInfo", tAdminInfo);
    },
  },
  modules: {},
});
