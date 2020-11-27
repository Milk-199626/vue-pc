<template>
  <div>
    <Hearder />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Hearder from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Hearder,
    Footer,
  },
};
</script>

<style lang="less" scoped>
</style>
