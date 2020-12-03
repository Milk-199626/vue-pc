import { reqGetProductList } from "@api/search";

export default {
  state: {
    ProductList: {
      trademarkList: [], //品牌数据
      attrsList: [], //品牌属性数据
      goodsList: [], //商品数据
    },
  },
  getters: {
    //方便使用数据
    trademarkList(state) {
      return state.ProductList.trademarkList;
    },
    attrsList(state) {
      return state.ProductList.attrsList;
    },
    goodsList(state) {
      return state.ProductList.goodsList;
    },
    total(state) {
      // console.log(state.ProductList.total);
      return state.ProductList.total;
    },
  },
  actions: {
    async getProductList({ commit }, data = {}) {
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
