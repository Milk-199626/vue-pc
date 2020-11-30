import Mock from "mockjs";
import banners from "./dbanners.json";
import floor from "./dfloor.json";

Mock.mock("/mock/banners", "get", {
  code: 200,
  "data|4": banners,
});
Mock.mock("/mock/floor", "get", {
  code: 200,
  "data|7": floor,
});
