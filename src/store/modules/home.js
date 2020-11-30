import { reqGetBaseCategoryList, reqGetBanners, reqGetFloor } from "@api/home";

export default {
  state: {
    categoryList: [], //首页三级分类数据
    banners: [],
    floor: [],
  },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      const categoryList = await reqGetBaseCategoryList();
      commit("GET_CATEGORY_LIST", categoryList);
    },
    async getBanners({ commit }) {
      const banners = await reqGetBanners();
      commit("GET_BANNERS", banners);
    },
    async getFloor({ commit }) {
      const floor = await reqGetFloor();
      commit("GET_FLOOR", floor);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    GET_BANNERS(state, banners) {
      state.banners = banners;
    },
    GET_FLOOR(state, floor) {
      state.floor = floor;
    },
  },
};
