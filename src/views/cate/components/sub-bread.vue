<template>
  <!-- 面包屑 -->
  <l-bread>
    <l-bread-item to="/">首页</l-bread-item>
    <Transition name="fade-right" mode="out-in">
        <l-bread-item v-if="category.top" :key="category.top.id" :to="`/category/${category.top.id}`">{{ category.top.name }}</l-bread-item>
    </Transition>
    <Transition name="fade-right" mode="out-in">
      <l-bread-item v-if="category.sub" :key="category.sub.id">{{ category.sub.name }}</l-bread-item>
    </Transition>
  </l-bread>
</template>

<script>
// vue
import { computed } from "vue";
// vuex
import { useStore } from "vuex";
// router
import { useRoute } from "vue-router";
export default {
  name: "SubBread",
  setup() {
    /* 获取一、二级分类的ID */
    const route = useRoute(); //router
    const store = useStore(); //仓库
    // return
    // 3. 通过计算属性得到，二级类目的名称和ID，一级类目的名称和ID
    const category = computed(() => {
      const obj = {};
      store.state.cate.cate.forEach((top) => {
        if (top.children) {
          top.children.forEach((sub) => {
            if (sub.id === route.params.id) {
                console.log("进入");
              // 设置二级类目
              obj.sub = { id: sub.id, name: sub.name };
              // 设置一级类目
              obj.top = { id: top.id, name: top.name };
            }
          });
        }
      });
      console.log(obj);
      return obj;
    });

    return { category };
  },
};
</script>

<style lang="less" scoped>
</style>