/* 
封装一个axios拦截器
*/
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Message } from "element-ui";

const instance = axios.create({
  //当前的服务器地址
  baseURL: "/api", //公共的基 础路径
  headers: {},
});
// 设置请求拦截器
instance.interceptors.request.use(
  // config请求配置对象
  (config) => {
    NProgress.start();
    return config;
  }
);
// 设置响应拦截器
instance.interceptors.response.use(
  //响应成功，但是不是功能成功可以用
  (response) => {
    NProgress.done();
    //功能响应成功
    if (response.data.code === 200) {
      //响应成功的数据
      return response.data.data;
    }
    //响应失败的原因
    const { message } = response.data;
    Message.error(message);
    return Promise.reject(message);
  },
  (error) => {
    NProgress.done();
    const message = error.message || "网络错误";
    Message.error(message);
    return Promise.reject(message);
  }
);

export default instance;
