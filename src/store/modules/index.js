//汇总所有vuex模块
import home from "@store/modules/home";
import search from "@store/modules/search";
import detail from "@store/modules/detail";
//统一暴露出去
export default {
  home,
  search,
  detail,
};
