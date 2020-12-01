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
      //确保不能再new一次
      if (this.swiper) return;
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      // 使用 this.$refs.swiper 取代 .swiper-container
      //使用 this.$refs.swiper 才能保证轮播图组件使用的自己的swiper
      new Swiper(this.$refs.swiper, {
        loop: true, // 循环模式选项
        //自动轮播
        autoplay: {
          //切换时间
          delay: 3000,
          //当用户点击下一页时，仍会开启自动播放
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
    // 轮播图数据要有 且 轮播图DOM元素要渲染完成 才能 new Swiper
    /* 
      1. ListContainer组件
        一上来没有数据 -- 触发watch
      2. Floor 
        一上来就有数据 -- mounted  
    */
   //判断如果有数据的话，就初始化
    if (!this.carouselList.length) return;
    this.initSwiper();
  },
};
</script>

<style lang='less' scoped>
</style>
