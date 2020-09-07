import AuthenticationService from "@/services/AuthenticationService";

const state = {
  dutiesList: null,
  sectorsList: null,
  usersList: null,
  token: null,
  user: null,
  isUserLoggedIn: false,
  isAdmin: false,
  isSellerLoggedIn: false,
  isManagerLoggedIn: false
};

const getters = {
  allUsers: state => state.usersList,
  allSectors: state => state.sectorsList,
  allDuties: state => state.dutiesList
};

const actions = {
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  setUser({ commit }, user) {
    commit("setUser", user);
  },

  async getUserProfileInfo({ commit }, userId) {
    const response = await AuthenticationService.getUserDuty(userId);
    const response2 = await AuthenticationService.getUserSector(userId);
    commit("getUserSector", response2.data.sector.name);
    commit("getUserDuty", response.data.duty.name);
  },

  async fetchAllUsers({ commit }) {
    const response = await AuthenticationService.allUsers();
    commit("setUsersList", response.data);
  },

  async fetchAllSectors({ commit }) {
    const response = await AuthenticationService.allSectors();
    commit("setSectorsList", response.data);
  },

  async fetchAllDuties({ commit }) {
    const response = await AuthenticationService.allDuties();
    commit("setDutiesList", response.data);
  },

  async updateSectorId({commit}, body){
    const response = await AuthenticationService.updateSectorId(body)
    commit("setUsersList", response.data)
  },

  async updateDutyId({commit}, body){
    const response = await AuthenticationService.updateDutyId(body)
    commit("setUsersList", response.data)
  },


};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
    if (token) {
      state.isUserLoggedIn = true;
    } else {
      state.isUserLoggedIn = false;
    }
  },
  setUser: (state, user) => {
    if (user == null) {
      state.isUserLoggedIn = false;
      state.isAdmin = false;
      state.isSellerLoggedIn = false;
      state.isManagerLoggedIn = false;
    }
    state.user = user;
    if (user) {
      if (state.user.dutyId == 1) {
        state.isSellerLoggedIn = true;
      }
      if(state.user.dutyId == 2){
        state.isManagerLoggedIn = true;
      }
      if (state.user.role == "admin") {
        state.isAdmin = true;
      }
    }
  },
  getUserDuty: (state, dutyName) => {
    state.user.dutyName = dutyName;
  },

  getUserSector: (state, sectorName) => {
    state.user.sectorName = sectorName;
  },

  setUsersList: (state, users) => (state.usersList = users),
  setSectorsList: (state, sectors) => (state.sectorsList = sectors),
  setDutiesList: (state, duties) => (state.dutiesList = duties)
};

export default {
  state,
  mutations,
  actions,
  getters
};
