<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2" @click="goSearch">
          <div
            class="item bo"
            v-for="category in categoryList"
            :key="category.categoryId"
          >
            <!-- 一级分类名称 -->
            <h3>
              <!-- 第三种方法（推荐）：使用事件代理把事件定义到父组件，父组件再通过冒泡传到子组件，这样就只绑定一个事件 -->
              <a
                :data-categoryName="category.categoryName"
                :data-categoryId="category.categoryId"
                :data-categorytype="1"
                >{{ category.categoryName }}</a
              >
              <!-- 第二种方法：使用编程式导航，缺点绑定事件太多 -->
              <!--  <a
                @click.prevent="
                  $router.push({
                    name: 'search',
                    query: {
                      categoryName: category.categoryName,
                      category1Id: category.categoryId,
                    },
                  })
                "
                >{{ category.categoryName }}</a
              > -->

              <!-- 第一种方法：使用链接式导航，缺点是组件太多 -->
              <!-- <router-link
                :to="`/search?categoryName=${category.categoryName}&category1Id=${category.categoryId}`"
                >{{ category.categoryName }}</router-link
              > -->
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl
                  class="fore"
                  v-for="childCategory in category.categoryChild"
                  :key="childCategory.categoryId"
                >
                  <!-- 二级分类名称 -->
                  <dt>
                    <a
                      :data-categoryName="childCategory.categoryName"
                      :data-categoryId="childCategory.categoryId"
                      :data-categoryType="2"
                      >{{ childCategory.categoryName }}</a
                    >
                    <!--  <a
                      @click.prevent="
                        $router.push({
                          name: 'search',
                          query: {
                            categoryName: childCategory.categoryName,
                            category2Id: childCategory.categoryId,
                          },
                        })
                      "
                      >{{ childCategory.categoryName }}</a
                    > -->
                    <!-- <router-link
                      :to="`/search?categoryName=${childCategory.categoryName}&category2Id=${childCategory.categoryId}`"
                      >{{ childCategory.categoryName }}</router-link
                    > -->
                  </dt>
                  <dd>
                    <!-- 三级分类名称 -->
                    <em
                      v-for="grandsonCategory in childCategory.categoryChild"
                      :key="grandsonCategory.categoryId"
                    >
                      <a
                        :data-categoryName="grandsonCategory.categoryName"
                        :data-categoryId="grandsonCategory.categoryId"
                        :data-categoryType="3"
                        >{{ grandsonCategory.categoryName }}</a
                      >
                      <!--   <a
                        @click.prevent="
                          $router.push({
                            name: 'search',
                            query: {
                              categoryName: grandsonCategory.categoryName,
                              category3Id: grandsonCategory.categoryId,
                            },
                          })
                        "
                        >{{ grandsonCategory.categoryName }}</a
                      > -->
                      <!-- <router-link
                        :to="`/search?categoryName=${grandsonCategory.categoryName}&category3Id=${grandsonCategory.categoryId}`"
                        >{{ grandsonCategory.categoryName }}</router-link
                      > -->
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TypeNav",
  // data() {
  //   return {
  //     /* 初始化响应数据 */
  //     categoryList: [],
  //   };
  // },
  // // 获取数据
  // async mounted() {
  //   const result = await reqGetBaseCategoryList();
  //   this.categoryList = result.slice(0, 15);
  // },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    ...mapActions(["getCategoryList"]),
    goSearch(e) {
      // e.target.dataset  可以获取自定义属性
      const { categoryname, categoryid, categorytype } = e.target.dataset;
      //判断如果没有自定义属性就return出去
      if (!categoryname) {
        return;
      }
      this.$router.push({
        //命名路由
        name: "search",
        query: {
          categoryname: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      });
    },
  },
  mounted() {
    this.getCategoryList();
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
