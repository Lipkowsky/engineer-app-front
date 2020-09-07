import Api from "@/services/Api";

export default {
  allProducts() {
    return Api().get("allProducts");
  },
  addProduct(product) {
    return Api().post("createProduct", product);
  },
  updateProduct(product) {
    return Api().put("update", product);
  },
  deleteProduct(product) {
    return Api().put("deleteProduct", product);
  },
  checkIsEnoughProducts() {
    return Api().get("checkIsEnoughProducts");
  },
  sendEmail(body) {
    return Api().post("sendEmail", body);
  },
  addPieces(product) {
    return Api().post("addPieces", product);
  },

  changeProductSector(credentials) {
    return Api().put("changeProductSector", credentials);
  }
};
