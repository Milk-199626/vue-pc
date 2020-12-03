<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" @click="delKeyword" v-show="options.keyword">
              关键词: {{ options.keyword }}<i>×</i>
            </li>
            <li
              class="with-x"
              @click="delCategory"
              v-show="options.categoryName"
            >
              分类名称： {{ options.categoryName }}<i>×</i>
            </li>
            <li class="with-x" v-show="options.trademark" @click="delTrademark">
              品牌名称: {{ options.trademark.split(":")[1] }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in options.props"
              :key="prop"
              @click="delProp(index)"
            >
              <!-- 3468:拖鞋:分类   split删除掉冒号，剩下:[3468,拖鞋，分类]-->
              {{ prop.split(":")[2] }}:{{ prop.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :addTrademark="addTrademark" @add-prop="addProp" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!--   order: "1:desc", // 排序方式：1：综合排序  2：价格排序   asc 升序  desc 降序 -->
                <!-- indexOf检测是不是1并且比-1大如果是返回true -->
                <li
                  :class="{ active: options.order.indexOf('1') > -1 }"
                  @click="setOrder('1')"
                >
                  <a
                    >综合<i
                      :class="{
                        iconfont: true,
                        'icon-falling': isAllDown,
                        'icon-rising': !isAllDown,
                      }"
                    ></i
                  ></a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li
                  :class="{ active: options.order.indexOf('2') > -1 }"
                  @click="setOrder('2')"
                >
                  <a
                    >价格
                    <span
                      ><i
                        :class="{
                          iconfont: true,
                          'icon-icon-test': true,
                          deactive:
                            options.order.indexOf('2') > -1 && isPriceDown,
                        }"
                      ></i
                      ><i
                        :class="{
                          iconfont: true,
                          'icon-icon-test1': true,
                          deactive:
                            options.order.indexOf('2') > -1 && !isPriceDown,
                        }"
                      ></i></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!--total：总数，sizes：每页多少条，prev：上一页, next:下一页，jumper：前往第几页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="options.pageNo"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            background
            layout=" jumper,sizes, prev, pager, next, total"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import TypeNav from "@comps/TypeNav";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      options: {
        category1Id: "", // 一级分类id
        category2Id: "", // 二级分类id
        category3Id: "", // 三级分类id
        categoryName: "", // 分类名称
        keyword: "", // 搜索内容（搜索关键字）
        order: "1:desc", // 排序方式：1：综合排序  2：价格排序   asc 升序  desc 降序
        pageNo: 1, // 分页的页码（第几页）
        pageSize: 5, // 分页的每页商品数量
        props: [], // 商品属性
        trademark: "", // 品牌
      },
      isAllDown: true, //综合排序
      isPriceDown: false, //价格排序
    };
  },
  //监视$route，里面有参数，假如路径发生变化，更新页面
  watch: {
    $route() {
      this.uptateProductList();
    },
  },
  computed: {
    ...mapGetters(["goodsList", "total"]),
  },
  methods: {
    ...mapActions(["getProductList"]),
    //路径跳转参数赋值
    uptateProductList(pageNo = 1) {
      const { searchText: keyword } = this.$route.params;
      const {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;

      const options = {
        ...this.options,
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        pageNo,
        // pageNo,
      };
      this.options = options;
      this.getProductList(options);
    },
    //清除关键字
    delKeyword() {
      this.options.keyword = "";
      this.$bus.$emit("clearKeyword");
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
    },
    //清除分类
    delCategory() {
      (this.options.category1Id = ""), // 一级分类id
        (this.options.category2Id = ""), // 二级分类id
        (this.options.category3Id = ""), // 三级分类id
        (this.options.categoryName = ""); // 分类名称
      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    addTrademark(trademark) {
      this.options.trademark = trademark;
      this.uptateProductList();
    },
    delTrademark() {
      this.options.trademark = "";
      this.uptateProductList();
    },
    //怎么拿数据呢？
    addProp(prop) {
      console.log(prop);
      this.options.props.push(prop);
      // console.log(this.options.props);
      this.uptateProductList();
    },
    delProp(index) {
      this.options.props.splice(index, 1);
      this.uptateProductList();
    },
    //样式切换 order 根据排序方式：1：综合排序  2：价格排序   asc 升序  desc 降序  选择切换
    setOrder(order) {
      // 当你有数组有两个值的时候，有一个你不想写的时候，可以使用逗号隔开
      let [oderNum, orderTwo] = this.options.order.split(":");
      // console.log(oderNum);
      // 不相等点击的就是第一次：不改变图标
      // 相等点击的就是第二次：改变图标
      if (oderNum === order) {
        // 看order是1改综合排序
        // 看order是2改价格排序
        if (order === "1") {
          //如果相等状态就取反
          this.isAllDown = !this.isAllDown;
        } else {
          this.isPriceDown = !this.isPriceDown;
        }
        //如果是升序的话就变成了降序  点击第二次状态
        orderTwo = orderTwo === "desc" ? "asc" : "desc";
      } else {
        //判断是不是综合排序，然后根据箭头状态判断是不是升降序
        if (order === "1") {
          orderTwo = this.isAllDown ? "desc" : "asc";
          // console.log(orderTwo);
        } else {
          //让他默认初始化状态是升序状态
          //样式
          this.isPriceDown = false;
          //数据
          orderTwo = "asc";
          // console.log(orderTwo);
        }
      }
      // `${order}:${orderTwo}`打印出 {1/2}:desc
      this.options.order = `${order}:${orderTwo}`;
      // console.log(`${order}:${orderTwo}`);
      this.uptateProductList();
    },
    // 当每页条数发生变化触发
    handleSizeChange(pageSize) {
      this.options.pageSize = pageSize;
      this.uptateProductList();
    },
    // // 当页码发生变化触发
    handleCurrentChange(pageNo) {
      // console.log("pageNo", pageNo);
      // this.options.pageNo = pageNo;
      this.uptateProductList(pageNo);
    },
  },
  mounted() {
    this.uptateProductList();
  },
  //一上来发送请求就携带参数
  components: {
    SearchSelector,
    TypeNav,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: flex;
                justify-content: space-around;
                align-items: center;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                i {
                  padding-left: 5px;
                }
                span {
                  display: flex;
                  flex-direction: column;
                  line-height: 10px;
                }
                i {
                  &.deactive {
                    color: rgba(255, 255, 255, 0.5);
                  }
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>