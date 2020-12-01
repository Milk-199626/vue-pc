<template>
  <div class="swiper-container" id="mySwiper" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in carouselList"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 默认情况下，Swiper仅导出核心版本，而没有其他模块（如导航，分页等）。因此，您也需要导入和配置它们：
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carousel",
  //传递数据
  props: {
    carouselList: {
      type: Array,
      require: true,
    },
  },
  //需求： // [] --> 最终的数据 数据发生变化才会触发
  // 轮播图DOM元素要渲染完成 --> 轮播图数据
  // watch为了确保有轮播图数据
  // this.$nextTick为了确保轮播图数据已经渲染成DOM元素
  watch: {
    carouselList() {
      if (this.swiper) return;
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      new Swiper(this.$refs.swiper, {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
  },
  mounted() {
    if (!this.carouselList.length) return;
    this.initSwiper();
  },
};
</script>

<style lang='less' scoped>
</style>
