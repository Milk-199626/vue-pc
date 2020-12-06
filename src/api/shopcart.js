import request from "@utils/request";

//请求购物车所有的数据
export const reqGetCartList = () => {
  return request({
    method: "GET",
    url: `/cart/cartList`,
  });
};
//添加、删除购物车商品数量
export const reqUpdateCartCount = (skuId, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};
//点击切换商品状态
export const reqUpdateCheckCart = (skuId, isChecked) => {
  return request({
    method: "GET",
    url: `/cart/checkCart/${skuId}/${isChecked}`,
  });
};
//清空购物车
export const reqDelCart = (skuId) => {
  return request({
    method: "DELETE",
    url: `/cart/deleteCart/${skuId}`,
  });
};
