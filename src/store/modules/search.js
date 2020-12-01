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
      return state.ProductList.trademarkLis;
    },
    attrsList(state) {
      return state.ProductList.attrsList;
    },
    goodsList(state) {
      return state.ProductList.goodsList;
    },
  },
  action: {
    getProductList({ commit }, data = {}) {
      const ProductList = reqGetProductList(data);
      commit(GET_PRODUCT_LIST, ProductList);
    },
  },
  mutation: {
    GET_PRODUCT_LIST(state, ProductList) {
      state.ProductList = ProductList;
    },
  },
};
