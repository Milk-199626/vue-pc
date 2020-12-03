import Vue from "vue";
import Vuex from "vuex";

import modules from "@store/modules";

Vue.use(Vuex);
//储存状态数据
const state = {};
//储存只读计算属性
const getters = {};
//包含n个用来间接修改state的函数对象
const actions = {};
//包含n个用来直接修改state的函数对象
const mutations = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
});
