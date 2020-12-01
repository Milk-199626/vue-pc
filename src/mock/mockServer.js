import Mock from "mockjs";
import banners from "./dbanners.json";
import floors from "./dfloor.json";

Mock.mock("/mock/banners", "get", {
  code: 200,
  data: banners,
});
Mock.mock("/mock/floors", "get", {
  code: 200,
  "data|3-5": floors,
});
