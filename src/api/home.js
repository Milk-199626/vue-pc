import request from "@utils/request";
// 封装一个请求三级分类名称数据的功能函数
export const reqGetBaseCategoryList = () => {
  return request({
    method: "GET",//请求方式
    url: "/product/getBaseCategoryList",//请求地址
  });
};
