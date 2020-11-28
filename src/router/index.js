import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@views/Home";
import Login from "@views/Login";
import Register from "@views/Register";
import Search from "@views/Search";

const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
// 目的：为了让编程式导航重复点击时不报错~
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  // console.log(VueRouter);
  //如果客户想处理失败
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  // 如果客户不像处理失败，给默认值：空函数
  return push.call(this, location, onComplete, () => {});
};
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  //如果客户想处理失败
  if (onComplete && onAbort) {
    return replace.call(this, location, onComplete, onAbort);
  }
  //
  return replace.call(this, location, onComplete, () => {});
};

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isHandelShow: true,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isHandelShow: true,
      },
    },
    {
      name: "search",
      path: "/search/:searchText?",
      component: Search,
    },
  ],
});
