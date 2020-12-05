<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="regisert">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!-- 头部第二行搜索区域 -->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm" @submit.prevent="search">
          <input type="text" class="header-bottom-input" v-model="searchText" />
          <button class="header-bottom-button">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    //搜索功能函数
    search() {
      /*    //获取搜索数据
      const { searchText } = this;
      //判断是否要添加params参数
      const params = searchText ? `/${searchText}` : "";
      //生成跳转路径
      const localhost = "/search" + params;
      //编程时导航:原因将来要做搜索功能
      this.$router.push(localhost); */

      //获取搜索数据
      const { searchText } = this;
      //使用命名路由
      const localtion = {
        name: "search",
      };
      // 如果有输入
      if (searchText) {
        // 把输入值赋值给params参数
        localtion.params = {
          searchText,
        };
      }
      // 添加query参数
      //因为是读取并没有修改，可以直接接收地址
      // const queryName = this.$route.query;
      // // 判断当前有没有query参数，有的话就加上
      // if (queryName) {
      //   localhost.query = {
      //     queryName,
      //   };
      // }
      // 添加query参数
      const { categoryName } = this.$route.query;

      if (categoryName) {
        localtion.query = this.$route.query;
      }
      //判断是不是命名路由是不是search组件
      if (this.$route.name === "search") {
        this.$router.replace(localtion);
      } else {
        this.$router.push(localtion);
      }
      /* const { categoryName } = this.$route.query;

      if (categoryName) {
        location.query = this.$route.query;
      } */
    },
  },
  mounted() {
    this.$bus.$on("clearKeyword", () => {
      this.searchText = "";
    });
  },
};
</script>

<style lang="less" scoped>
.top {
  background: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.loginList {
  display: flex;
}
.loginList p:nth-child(2) {
  margin-left: 10px;
}
.regisert {
  padding: 0 5px;
  margin-left: 5px;
  border-left: 1px solid #b3aeae;
}
.typeList a {
  margin: 0 5px;
  padding-left: 10px;
  border-left: 1px solid #b3aeae;
}
.typeList a:first-child {
  border-left: none;
}
.bottom {
  width: 1200px;
  height: 106px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.header-bottom-input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  border: 2px solid #ea4a36;
  outline: none;
}
.header-bottom-button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  color: white;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
