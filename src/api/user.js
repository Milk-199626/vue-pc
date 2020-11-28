import request from "@utils/request";
//封装一个发送登录请求数据功能的函数
export const reqLogin = (phone, password) => {
  return request({
    method: "POST",//请求方式
    url: "/user/passport/login",//请求地址
    /* 请求参数 */
    data: {
      phone,
      password,
    },
  });
};