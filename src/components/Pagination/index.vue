<template>
  <div class="Pagination">
    <button
      :disabled="myCurrentPage <= 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <button :class="{ active: myCurrentPage === 1 }" @click="setCurrentPage(1)">
      1
    </button>
    <button v-show="startEnd.start > 2">...</button>
    <button
      :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
      v-for="item in mapBtnPage"
      :key="item"
      @click="setCurrentPage(startEnd.start + item - 1)"
    >
      {{ startEnd.start + item - 1 }}
    </button>
    <button v-show="startEnd.end < totalPage - 1">...</button>
    <button
      :class="{ active: myCurrentPage === totalPage }"
      @click="setCurrentPage(totalPage)"
      v-show="totalPage > 1"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="myCurrentPage >= totalPage"
      @click="setCurrentPage(myCurrentPage + 1)"
    >
      下一页
    </button>
    <button>{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    //当前页面
    currentPage: {
      type: Number,
      default: 1,
    },
    //显示按钮的数量
    pagerCount: {
      type: Number,
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
    //每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    //数据总数
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    //由于currentPage后面是可变的，props只能读不能修改，赋值给新变量,后面方便操作
    return {
      myCurrentPage: this.currentPage,
    };
  },
  watch: {
    myCurrentPage(currentPage) {
      this.$emit("current-change", currentPage);
    },
    currentPage(myCurrentPage) {
      this.myCurrentPage = myCurrentPage;
    },
  },

  computed: {
    //总页数
    totalPage() {
      //总页数 = 总数据 / 每页条数 取余向上
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算中间按钮的开始和结束的按钮值
    startEnd() {
      //收集要计算的数据
      //myCurrentPage 当前所在页  pagerCount 按钮数量 totalPage总页数
      const { myCurrentPage, pagerCount, totalPage } = this;
      //得到中间所有按钮值  因为第一个和最后一个是默认的，所以-2
      const middleSum = pagerCount - 2;
      //计算出中间的按钮值一半 7/2 3.5 取余向下
      const middleHalf = Math.floor(middleSum / 2);

      let start, end;

      /*
        start
          1. start = myCurrentPage - halfCount
            1...3 4 [5] 6 7...10
               3   =       5       -    2
            问题：
              1 [2] 3 4 5 6 ...10  
               0    =      2        -    2
            解决：修正start的值，不能小于1

            问题：
              1 ... 5 6 7 8 [9] 10  
              7  =   9  - 2
           
        end 
          2. end = start + count - 1
            1...3 4 [5] 6 7...10
               7   =  3  +  5 - 1
      */

      // 1 [2] 3 4 5 6 ...10
      // 1...3 4 [5] 6 7...10
      // 1 ... 5 6 7 8 [9] 10
      // 1 [2] 3
      // [1] --> 如果start大于总页数，不显示
      // 1 ... 5 6 7 8 [9] 10
      //如果点击的当前的页数大于或等于总页数 - 中间总数一半的页数 2 >=10-2  3-0=3
      if (myCurrentPage >= totalPage - middleHalf) {
        // 1 ... 5 6 7 8 [9] 10
        start = totalPage - middleSum;
      } else {
        // 1 [2] 3 4 5 6 ...10
        // 1...3 4 [5] 6 7...10
        //0 = 2 - 2 1=1-0  5 -2 =3
        start = myCurrentPage - middleHalf;
      }
      if (start <= 2) {
        // 1 [2] 3 4 5 6 ...10
        start = 2;
      }
      //正常情况
      // 6 =  2 + 5 - 1 2+1=3-1=2
      end = start + middleSum - 1;

      if (end >= totalPage) {
        end = totalPage - 1;
      }
      return {
        start,
        end,
      };
    },
    //遍历的数据
    mapBtnPage() {
      const { start, end } = this.startEnd;
      //1 [2] 3 4 3-2 =1 也就是遍历的时候如果不加一，就会少遍历一次，所以需要加1
      const middleSum = end - start + 1;
      //如果大于1页或者等于1
      return middleSum >= 1 ? middleSum : 0;
    },
  },
  methods: {
    setCurrentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
};
</script>

<style lang='less' scoped>
.Pagination {
  display: flex;
  // 不会换行
  white-space: nowrap;
  font-weight: 700;
  button {
    cursor: pointer;
    margin: 0 5px;
    min-width: 30px;
    border-radius: 2px;
    padding: 0 4px;
    font-size: 13px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    vertical-align: top;
    border: none;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
  }
  button.active {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
