import request from "@utils/request";

export const reqGetProductList = (data) => {
  return request({
    method: "GET",
    url: "/list",
    data,
  });
};
