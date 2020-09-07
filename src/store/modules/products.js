import ProductsService from "@/services/ProductsService";

const state = {
  products: [],
  basket: [],
  productsToOrder: [],
  sumOfProductsInBasket: 0.0
};

const getters = {
  allProducts: state => state.products,
  allProductsInBasket: state => state.basket,
  showSumOfProductsInBasket: state => state.sumOfProductsInBasket,
  allProductsToOrder: state => state.productsToOrder
};

const actions = {
  async fetchAllProducts({ commit }) {
    const response = await ProductsService.allProducts();
    commit("setProducts", response.data);
  },
  async addProduct({ commit }, product) {
    const response = await ProductsService.addProduct(product);
    commit("newProduct", response.data);
  },
  sortByIdSector({ commit }, value) {
    commit("sortByIdSector", value);
  },
  sortByBrandName({ commit }, value) {
    commit("sortByBrandName", value);
  },
  async updateProduct({ commit }, product) {
    const response = await ProductsService.updateProduct(product);
    commit("setProducts", response.data);
  },
  addNewProductToBasket({ commit }, product) {
    commit("addNewProductToBasket", product);
  },
  deleteAllProdcutsFromBasket({ commit }) {
    commit("deleteAllProdcutsFromBasket");
  },
  setSumOfProductsInBasket({ commit }) {
    commit("setSumOfProductsInBasket");
  },
  setPiecesOfProductsInBasket({ commit }, id) {
    commit("setPiecesOfProductsInBasket", id);
  },

  addPieces({ commit }, product) {
    commit("addPieces", product);
  },

  deleteProductFromBasket({ commit }, product) {
    commit("deleteProductFromBasket", product);
  },

  async deleteProduct({ commit }, product) {
    const response = await ProductsService.deleteProduct(product);
    commit("setProducts", response.data);
    commit("deleteAllProdcutsFromBasket");
  },

  async fetchCheckIsEnoughProducts({ commit }) {
    const response = await ProductsService.checkIsEnoughProducts();
    commit("setProductsToOrder", response.data);
  },

  async changeProductSector({ commit }, body) {
    const response = await ProductsService.changeProductSector(body);
    commit("setProducts", response.data);
  }
};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  sortByIdSector(state, value) {
    if (value) {
      state.products.sort((a, b) => (a.sectorId < b.sectorId ? 1 : -1));
    }
    if (!value) {
      state.products.sort((a, b) => (a.sectorId > b.sectorId ? 1 : -1));
    }
  },
  sortByBrandName(state, value) {
    if (value) {
      state.products.sort((a, b) => (a.brand_name < b.brand_name ? 1 : -1));
    }
    if (!value) {
      state.products.sort((a, b) => (a.brand_name > b.brand_name ? 1 : -1));
    }
  },
  newProduct: (state, product) => state.products.unshift(product),
  addNewProductToBasket: (state, product) => {
    for (var i = 0, len = state.products.length; i < len; i++) {
      if (state.products[i].id === product.id) {
        if (state.products[i].pieces >= 1) {
          state.products[i].pieces -= 1;
          state.basket.push(product);
        } else {
          alert("Za mało produktów");
        }
      }
    }
  },
  deleteAllProdcutsFromBasket: state => {
    state.basket = [];
    state.sumOfProductsInBasket = 0.0;
  },
  setSumOfProductsInBasket: state => {
    state.sumOfProductsInBasket = 0.0;
    let sum = 0.0;
    for (var i = 0; i < state.basket.length; i++) {
      sum +=
        parseFloat(state.basket[i].price) *
        parseFloat(state.basket[i].inBasket);
      state.sumOfProductsInBasket = sum.toFixed(2);
    }
  },
  setPiecesOfProductsInBasket: (state, id) => {
    for (var i = 0, len = state.basket.length; i < len; i++) {
      if (state.basket[i].id === id) {
        const findProductById = state.products.find(x => x.id === id);
        if (findProductById.pieces >= 1) {
          findProductById.pieces -= 1;
          state.basket[i].inBasket += 1;
        }
      }
    }
  },

  addPieces: (state, product) => {
    const findProductById = state.products.find(x => x.id === product.id);
    findProductById.pieces += parseInt(product.howManyToAdd);
  },

  deleteProductFromBasket: (state, product) => {
    state.basket = state.basket.filter(item => item !== product);
  },

  setProductsToOrder: (state, productsToOrderFetch) =>
    (state.productsToOrder = productsToOrderFetch)
};

export default {
  state,
  getters,
  actions,
  mutations
};
