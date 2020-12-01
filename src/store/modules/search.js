import { reqGetProductList } from "@api/search";

export default {
  state: {
    ProductList: {
      trademarkList: [],
      attrsList: [],
      goodsList: [],
    },
  },
  getters: {
    trademarkList(state) {
      return state.ProductList.trademarkList;
    },
    attrsList(state) {
      return state.ProductList.attrsList;
    },
    goodsList(state) {
      return state.ProductList.goodsList;
    },
  },
  actions: {
    async getProductList({ commit }, data = {}) {
      console.log(ProductList);
      const ProductList = await reqGetProductList(data);
      commit("GET_PRODUCT_LIST", ProductList);
    },
  },
  mutations: {
    GET_PRODUCT_LIST(state, ProductList) {
      state.ProductList = ProductList;
    },
  },
};
