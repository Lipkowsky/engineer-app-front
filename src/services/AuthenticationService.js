import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post("register", credentials);
  },
  login(credentials) {
    return Api().post("login", credentials);
  },
  getUserDuty(credentials) {
    return Api().post("getUserDuty", credentials);
  },
  getUserSector(credentials) {
    return Api().post("getUserSector", credentials);
  },

  allUsers() {
    return Api().get("/admin/allUsers");
  },

  allSectors() {
    return Api().get("/admin/allSectors");
  },

  allDuties() {
    return Api().get("/admin/allDuties");
  },

  updateSectorId(credentials){
    return Api().put('/admin/updateSectorId', credentials)
  },

  updateDutyId(credentials){
    return Api().put('/admin/updateDutyId', credentials)
  }
  
};
