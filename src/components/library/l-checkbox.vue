<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i v-if="checked" class="iconfont icon-checkbox-checked"></i>
    <i v-else class="iconfont icon-checkbox_unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { ref, watch } from "vue";
// 引入@vueuse/core
import { useVModel } from '@vueuse/core'
export default {
  name: "LCheckbox",
  props: {
      // 使用v-model
      modelValue: {
          type: Boolean,
          default: false
      }
  },
  /** 普通写法 */
  // setup(props, context) {
  //   // 初始选中状态 默认不选中
  //   const checked = ref(false);
  //   const changeChecked = () => {
  //     checked.value = !checked.value;
  //     context.emit('update:modelValue', checked.value)
  //   };

  //   // 监听modelValue 
  //   watch(
  //       () => props.modelValue, 
  //       (newValue, oldValue) => {
  //           checked.value = props.modelValue
  //       },
  //       {
  //           immediate: true
  //       }
  //   )
  //   return { 
  //       checked, 
  //       changeChecked 
  //   };
  // },

    /** 使用 @vueuse/core */
    setup(props, { emit }) {
        // 使用useVModel实现双向数据绑定v-model指令
        // 1．使用props接收modelvalue
        // 2．使用useVModel来包装props中的modelvalue属性数据
        // 3．在使用checked.value就是使用父组件数据
        // 4．在使用checked.value = '数据'赋值，触发emit('update:modelvalue', '数据')
        let checked = useVModel(props, 'modelValue', emit)

        // 点击选项
        const changeChecked = () => {
            // 通知父组件
            checked.value = !checked.value

            // change事件
            emit('change', checked.value)
        }
        return {
            checked,
            changeChecked
        }
    }
};
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checkbox-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>